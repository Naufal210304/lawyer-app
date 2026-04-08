import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUser } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
  // Mengambil data awal dari localStorage (fallback ke default jika kosong)
  const [username, setUsername] = useState(localStorage.getItem('username') || 'Admin');
  const [email, setEmail] = useState(localStorage.getItem('email') || 'admin@lawyer.com');
  const [preview, setPreview] = useState(localStorage.getItem('profile_pic') || null);
  
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Menangani perubahan foto profil
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Menyimpan perubahan profil ke localStorage agar tersinkronisasi dengan Dashboard
  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    if (preview) localStorage.setItem('profile_pic', preview);

    alert('Profil berhasil diperbarui!');
    // Me-refresh halaman agar komponen Header yang membaca localStorage ikut terupdate
    window.location.reload();
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      return alert('Konfirmasi password baru tidak cocok!');
    }
    alert('Password berhasil diubah!');
    setPasswordData({ current: '', new: '', confirm: '' });
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
                    {username.charAt(0)}
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Alamat Email</label>
                <input 
                  type="email" required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Password Saat Ini</label>
                <input 
                  type="password"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  value={passwordData.current}
                  onChange={(e) => setPasswordData({...passwordData, current: e.target.value})}
                />
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