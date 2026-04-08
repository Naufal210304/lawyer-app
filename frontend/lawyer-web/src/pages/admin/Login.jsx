import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  // Login states
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
  const { login, token, loading, role } = useAuth(); // ambil role juga

  // Redirect ke dashboard jika sudah login dan role valid
  useEffect(() => {
    if (!loading && token && role && ["admin", "superadmin"].includes(role)) {
      navigate('/admin/dashboard');
    }
  }, [token, loading, role, navigate]);

  // ===================== HANDLE LOGIN =====================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(identifier, password); // update global state token & user
      // Jangan navigate di sini lagi, biar useEffect yang handle
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal. Periksa kembali akun Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  // ===================== HANDLE REGISTER =====================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await axios.post('/auth/register', {
        username: regUsername,
        email: regEmail,
        password: regPassword,
        phone_number: regPhone
      });

      setSuccess('Registrasi admin berhasil! Menunggu persetujuan dari superadmin.');
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

  // ===================== RENDER =====================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {isRegister ? 'Admin Register' : 'Admin Login'}
          </h1>
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