import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const apiBase = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, '') : 'http://localhost:3001';

const getLogoUrl = (logoUrl) => {
  if (!logoUrl) return 'https://via.placeholder.com/200x100?text=No+Logo';
  if (logoUrl.startsWith('http')) return logoUrl;
  if (logoUrl.startsWith('/')) return `${apiBase}${logoUrl}`;
  return `${apiBase}/${logoUrl}`;
};

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPartners = async () => {
      try {
        const response = await axios.get('/partners');
        setPartners(response.data.data || []);
      } catch (err) {
        console.error('Failed to load partners:', err);
        setError('Gagal memuat mitra. Coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black py-24 md:py-32 px-4 md:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter">
            Our <span className="text-[#C5A02E]">Partners</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light">
            Membangun jaringan yang kuat dengan para profesional terkemuka untuk memastikan kesuksesan setiap langkah legal Anda.
          </p>
        </div>
      </section>

      {/* Partners List Section */}
      <section className="py-24 px-4 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Mitra Kami</h2>
            <div className="w-20 h-1 bg-[#C5A02E] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Tampilan ini menampilkan mitra yang telah diinput melalui dashboard admin.</p>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-500">Memuat mitra...</div>
          ) : error ? (
            <div className="py-20 text-center text-red-600">{error}</div>
          ) : partners.length === 0 ? (
            <div className="py-20 text-center text-slate-500">Belum ada mitra terdaftar saat ini.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center opacity-90">
              {partners.map((partner) => (
                <div key={partner.id} className="group transition-all duration-500 text-center">
                  <img
                    src={getLogoUrl(partner.logo_url)}
                    alt={partner.name}
                    className="max-h-16 md:max-h-20 w-auto object-contain mx-auto"
                  />
                  <p className="mt-4 text-xs font-bold text-slate-500 group-hover:text-[#C5A02E] uppercase tracking-widest">{partner.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-black mb-6 italic">
            "Bersama mitra kami, kami memberikan layanan hukum tanpa batas."
          </h3>
          <p className="text-gray-600 mb-8">
            Apakah perusahaan Anda tertarik untuk berkolaborasi atau membutuhkan bantuan hukum secara berkelanjutan?
          </p>
          <button className="px-10 py-3 bg-black text-white hover:bg-[#C5A02E] transition-colors duration-300 font-bold uppercase text-sm tracking-widest">
            Hubungi Kerjasama
          </button>
        </div>
      </section>
    </div>
  );
};

export default Partners;