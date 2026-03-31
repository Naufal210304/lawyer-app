import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PracticeArea = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const practiceAreas = [
    { 
      id: "korporasi",
      title: "Hukum Korporasi", 
      desc: "Solusi legal menyeluruh untuk kebutuhan bisnis dan regulasi perusahaan Anda.",
      detail: "Layanan ini mencakup pendampingan hukum dalam pendirian badan usaha, penyusunan kontrak komersial, merger dan akuisisi, hingga kepatuhan regulasi industri.",
      cases: "Contoh Kasus: Sengketa antar pemegang saham, peninjauan kontrak vendor skala besar, dan restrukturisasi perusahaan."
    },
    { 
      id: "pidana",
      title: "Hukum Pidana", 
      desc: "Pembelaan hukum yang tangguh dan strategis untuk melindungi hak-hak Anda.",
      detail: "Kami memberikan pendampingan hukum mulai dari tingkat penyelidikan di Kepolisian, penyidikan di Kejaksaan, hingga proses persidangan di Pengadilan.",
      cases: "Contoh Kasus: Pembelaan dalam kasus dugaan penipuan/penggelapan, tindak pidana korupsi, dan pencemaran nama baik di media digital."
    },
    { 
      id: "keluarga",
      title: "Hukum Keluarga", 
      desc: "Pendampingan profesional untuk urusan perceraian, hak asuh, dan waris.",
      detail: "Fokus pada penyelesaian masalah keluarga secara humanis dan sesuai hukum yang berlaku, baik secara litigasi maupun mediasi.",
      cases: "Contoh Kasus: Gugatan perceraian, penetapan hak asuh anak, pembagian harta bersama (gono-gini), dan sengketa waris."
    },
    { 
      id: "properti",
      title: "Properti & Real Estate", 
      desc: "Keamanan transaksi dan penyelesaian sengketa aset properti secara legal.",
      detail: "Memastikan setiap transaksi properti aman secara hukum dan membantu penyelesaian jika terjadi tumpang tindih kepemilikan aset.",
      cases: "Contoh Kasus: Sengketa lahan/tanah, pemeriksaan keabsahan sertifikat (due diligence), dan sengketa sewa-menyewa bangunan komersial."
    },
  ];

  const faqs = [
    {
      question: "Bagaimana cara mengatur jadwal konsultasi?",
      answer: "Anda dapat mengisi formulir di halaman 'About' atau menghubungi kami langsung melalui tombol WhatsApp yang tersedia. Tim kami akan merespons dalam waktu maksimal 24 jam."
    },
    {
      question: "Apakah ada biaya untuk konsultasi awal?",
      answer: "Kami memberikan layanan konsultasi awal secara gratis selama 30 menit untuk membedah garis besar permasalahan hukum Anda dan menentukan langkah strategis awal."
    },
    {
      question: "Apakah firma hukum ini menangani kasus di luar Jakarta?",
      answer: "Ya, Saminan & Partners melayani klien di seluruh wilayah Indonesia. Kami memiliki jaringan koresponden hukum yang luas untuk mendukung kebutuhan legal Anda di berbagai daerah."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black py-24 md:py-32 px-4 md:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter">
            Bidang <span className="text-[#C5A02E]">Layanan</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light">
            Keahlian hukum mendalam untuk berbagai kebutuhan legalitas dan perlindungan hak Anda.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-24 px-4 md:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceAreas.map((area, i) => (
              <div key={i} className="group p-10 border border-gray-200 hover:border-[#C5A02E] transition-all duration-500 bg-white shadow-sm">
                <div className="w-12 h-1 bg-[#C5A02E] mb-8 group-hover:w-full transition-all duration-500"></div>
                <h4 className="text-xl font-bold mb-4 text-black group-hover:text-[#C5A02E] transition-colors">{area.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Description Section */}
      <section className="py-24 px-4 md:px-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-16 text-center">Detail & Cakupan Layanan</h2>
          <div className="space-y-16">
            {practiceAreas.map((area) => (
              <div key={area.id} id={area.id} className="border-l-4 border-[#C5A02E] pl-6 md:pl-10 scroll-mt-24">
                <h3 className="text-2xl font-bold text-black mb-4">{area.title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {area.detail}
                </p>
                <div className="bg-gray-50 p-6 rounded-r-lg italic text-gray-600 border-l border-gray-200">
                  {area.cases}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 md:px-10 bg-black text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#C5A02E] font-semibold tracking-widest uppercase mb-4 text-sm">FAQ</h2>
            <h3 className="text-4xl font-bold leading-tight">Pertanyaan Sering Diajukan</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-neutral-800 rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center bg-neutral-900 hover:bg-neutral-800 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <span className={`text-[#C5A02E] transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaq === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-5 text-gray-400 border-t border-neutral-800 bg-neutral-900/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PracticeArea;