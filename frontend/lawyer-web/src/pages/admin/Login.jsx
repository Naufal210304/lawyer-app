import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Pastikan sudah install: npm install axios

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  
  // Menggunakan 'identifier' karena di DB ada username & email yang unik
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState('');

  // Register states
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Jika sudah login (ada token), langsung lempar ke dashboard
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/admin/dashboard');
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Endpoint disesuaikan dengan struktur backend Express kamu nantinya
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        // Mengirimkan identifier. Pastikan backend mengecek field ini di kolom 'username' ATAU 'email'
        identifier: identifier, 
        username: identifier, // Beberapa backend template mengharuskan key bernama 'username'
        password: password
      });

      const { token, role, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role); // Menyimpan nama role (admin/superadmin)
      localStorage.setItem('userId', user.id); // Simpan ID agar bisa dipakai saat buat Blog
      navigate('/admin/dashboard');
    } catch (err) {
      console.error("Detail Error Login:", err.response); // Cek console untuk melihat pesan dari server
      setError(err.response?.data?.message || 'Login gagal. Periksa kembali akun Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // API endpoint untuk registrasi admin biasa (role_id: 2)
      await axios.post('http://localhost:3001/api/auth/register', {
        username: regUsername,
        email: regEmail,
        password: regPassword,
        phone_number: regPhone, // Pastikan kolom ini ditambahkan di tabel users database Anda
        role_id: 2 // Sesuai tabel roles: 1=superadmin, 2=admin
      });

      setSuccess('Registrasi admin berhasil! Silakan login.');
      setIsRegister(false);
      // Reset fields
      setRegUsername('');
      setRegEmail('');
      setRegPassword('');
      setRegPhone('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal. Coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{isRegister ? 'Admin Register' : 'Admin Login'}</h1>
          <p className="text-gray-600">Lawyer App CMS</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          {!isRegister ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identifier">
                  Username / Email
                </label>
                <input
                  type="text"
                  id="identifier"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan username atau email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="regUsername">
                  Username
                </label>
                <input
                  type="text"
                  id="regUsername"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Username baru"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="regEmail">
                  Email
                </label>
                <input
                  type="email"
                  id="regEmail"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email aktif"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="regPhone">
                  Nomor Handphone
                </label>
                <input
                  type="tel"
                  id="regPhone"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: 08123456789"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="regPassword">
                  Password
                </label>
                <input
                  type="password"
                  id="regPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password minimal 6 karakter"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (isRegister ? 'Sedang Mendaftar...' : 'Sedang Masuk...') : (isRegister ? 'Daftar Sekarang' : 'Login')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
              setSuccess('');
            }}
            className="text-sm text-blue-600 hover:underline focus:outline-none font-semibold"
          >
            {isRegister ? 'Sudah punya akun? Login di sini' : 'Belum punya akun? Daftar Admin baru'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;