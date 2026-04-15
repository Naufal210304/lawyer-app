import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from '../../services/axios';

const Settings = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone_number: '',
    profile_pic: null
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      // Decode token to get user ID (simple decode, not secure but for demo)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      const response = await axios.get(`/users/${userId}`);
      const user = response.data.data;
      
      setUserData({
        username: user.username || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        profile_pic: user.profile_pic || null
      });
      setPreview(user.profile_pic);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  // Menangani perubahan foto profil
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  // Menyimpan perubahan profil ke database
  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!userData.username.trim() || !userData.email.trim()) {
      return alert('Nama pengguna dan email wajib diisi.');
    }

    try {
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      const formData = new FormData();
      formData.append('username', userData.username.trim());
      formData.append('email', userData.email.trim());
      formData.append('phone_number', userData.phone_number.trim());
      if (file) {
        formData.append('profile_pic', file);
      } else if (userData.profile_pic) {
        formData.append('profile_pic', userData.profile_pic);
      }

      await axios.put(`/users/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Update localStorage
      localStorage.setItem('username', userData.username);
      localStorage.setItem('email', userData.email);
      if (preview && preview !== userData.profile_pic) {
        localStorage.setItem('profile_pic', preview);
      }

      alert('Profil berhasil diperbarui!');
      // Refresh navbar
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      return alert('Semua field password wajib diisi.');
    }

    if (passwordData.new !== passwordData.confirm) {
      return alert('Konfirmasi password baru tidak cocok!');
    }

    if (passwordData.new.length < 6) {
      return alert('Password baru minimal 6 karakter!');
    }

    try {
      const token = localStorage.getItem('token');
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      await axios.put(`/users/${userId}/password`, {
        old_password: passwordData.current,
        new_password: passwordData.new
      });

      alert('Password berhasil diubah!');
      setPasswordData({ current: '', new: '', confirm: '' });
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message === 'Current password is incorrect') {
        setPasswordError('Password lama yang Anda masukkan salah.');
      } else {
        alert(err.response?.data?.message || 'Failed to update password');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Halaman */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 mt-1">Kelola informasi profil dan keamanan akun Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri: Foto Profil */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Foto Profil</h3>
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full border-4 border-slate-50 overflow-hidden bg-slate-100 shadow-inner mx-auto">
                {preview ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-slate-300 font-bold uppercase">
                    {userData.username.charAt(0)}
                  </div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-all border-2 border-white">
                <FontAwesomeIcon icon={faCamera} className="w-4 h-4" />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
            <p className="mt-4 text-xs text-slate-400">Klik ikon kamera untuk mengganti foto.</p>
          </div>
        </div>

        {/* Kolom Kanan: Form Detail */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form Informasi Profil */}
          <form onSubmit={handleSaveProfile} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} className="text-blue-600" />
              Informasi Profil
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nama Pengguna</label>
                <input 
                  type="text" required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={userData.username}
                  onChange={(e) => setUserData({...userData, username: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Alamat Email</label>
                <input 
                  type="email" required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={userData.email}
                  onChange={(e) => setUserData({...userData, email: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nomor Telepon</label>
                <input 
                  type="tel"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={userData.phone_number}
                  onChange={(e) => setUserData({...userData, phone_number: e.target.value})}
                  placeholder="Contoh: 08123456789"
                />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                Simpan Perubahan
              </button>
            </div>
          </form>

          {/* Form Keamanan */}
          <form onSubmit={handleUpdatePassword} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-slate-400 rounded-full"></span>
              Keamanan Akun
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Password Lama</label>
                <input 
                  type="password"
                  className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    passwordError ? 'border-red-300 focus:ring-red-500' : 'border-slate-200'
                  }`}
                  value={passwordData.current}
                  onChange={(e) => {
                    setPasswordData({...passwordData, current: e.target.value});
                    setPasswordError(''); // Clear error when user types
                  }}
                />
                {passwordError && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{passwordError}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Password Baru</label>
                  <input 
                    type="password"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Konfirmasi Password</label>
                  <input 
                    type="password"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 transition-all">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;