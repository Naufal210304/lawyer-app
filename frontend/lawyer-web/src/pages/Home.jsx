import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import heroBg from '../assets/main-bg.jpg'; 
import aboutImg from '../assets/Attributes.jpg';

const Home = () => {
  // --- Logic & Data ---
  const stats = [
    { label: "Tahun Pengalaman", value: "15+" },
    { label: "Kasus Selesai", value: "500+" },
    { label: "Partner Hukum", value: "25+" },
    { label: "Penghargaan", value: "12" },
  ];

  const practiceAreas = [
    { id: "korporasi", title: "Hukum Korporasi", desc: "Solusi legal menyeluruh untuk kebutuhan bisnis dan regulasi perusahaan Anda." },
    { id: "pidana", title: "Hukum Pidana", desc: "Pembelaan hukum yang tangguh dan strategis untuk melindungi hak-hak Anda." },
    { id: "keluarga", title: "Hukum Keluarga", desc: "Pendampingan profesional untuk urusan perceraian, hak asuh, dan waris." },
    { id: "properti", title: "Properti & Real Estate", desc: "Keamanan transaksi dan penyelesaian sengketa aset properti secara legal." },
  ];

  const blogs = [
    { id: 1, title: "Pentingnya Legalitas Bisnis di Era Digital", date: "15 Oct 2023", category: "Corporate" },
    { id: 2, title: "Cara Menghadapi Sengketa Tanah Tanpa Panik", date: "12 Oct 2023", category: "Property" },
    { id: 3, title: "Hak-Hak Pekerja yang Sering Terabaikan", date: "10 Oct 2023", category: "Employment" },
  ];

  // --- UI Structure ---
  return (
    <div className="w-full">
      
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/75"></div>
        </div>

        <div className="relative z-10 w-full px-4 md:px-10 flex flex-col md:flex-row justify-center md:justify-between items-center h-full text-center md:text-left pt-16 md:pt-0">
          <div className="max-w-4xl mb-10 md:mb-0">
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight uppercase tracking-tighter">
              Keadilan & <span className="text-[#C5A02E]">Integritas</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light">
              Kami memberikan solusi hukum yang transparan dan terpercaya untuk melindungi setiap langkah Anda.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                className="text-lg px-8 py-3"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Now
              </Button>
              <Button 
                variant="outline" 
                className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-black"
                onClick={() => document.getElementById('Layanan')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Our Service
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative Gold Accent removed from Hero as stats are now a separate section */}
      </section>

      {/* NEW SECTION: STATS */}
      <section className="py-16 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="p-8 border-2 border-[#C5A02E] min-w-[250px] h-[180px] rounded-lg flex flex-col justify-center items-center text-center bg-black">
                <p className="text-[#C5A02E] text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-[#C5A02E] text-xs uppercase tracking-widest font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-40 h-2 bg-[#C5A02E] z-10"></div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section id="about" className="py-24 px-4 md:px-10 bg-white"> {/* The 'about' ID remains for general navigation */}
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className="relative">
            <div className="aspect-[3/4] bg-gray-200 overflow-hidden border-l-8 border-[#C5A02E]">
              <img src={aboutImg} alt="Tentang Firma Kami" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#C5A02E]/10 -z-10"></div>
          </div>
          
          <div>
            <h2 className="text-[#C5A02E] font-semibold tracking-widest uppercase mb-4 text-sm">Tentang Firma Kami</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">Berdedikasi untuk Melindungi Hak-Hak Anda</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Sejak didirikan, firma hukum kami telah menjadi mercusuar harapan bagi mereka yang mencari keadilan. Kami menggabungkan keahlian mendalam dengan pendekatan personal.
            </p>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Kami percaya bahwa setiap klien layak mendapatkan representasi terbaik tanpa kompromi. Fokus kami bukan hanya pada hasil, tetapi pada integritas proses hukum itu sendiri.
            </p>
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 3: PRACTICE AREA */}
      <section id='Layanan' className="py-24 px-4 md:px-10 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#C5A02E] font-semibold tracking-widest uppercase mb-4 text-sm">Bidang Keahlian</h2>
            <h3 className="text-4xl md:text-5xl font-bold leading-tight">Layanan Hukum Profesional</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceAreas.map((area, i) => (
              <div key={i} className="group p-10 border border-white/10 hover:border-[#C5A02E] transition-all duration-500 bg-neutral-900/50">
                <div className="w-12 h-1 bg-[#C5A02E] mb-8 group-hover:w-full transition-all duration-500"></div>
                <h4 className="text-xl font-bold mb-4 group-hover:text-[#C5A02E] transition-colors">{area.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{area.desc}</p>
                <Link to={`/practice#${area.id}`} className="text-[#C5A02E] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  Detail <span>&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: BLOG */}
      <section className="py-24 px-4 md:px-10 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[#C5A02E] font-semibold tracking-widest uppercase mb-4 text-sm">Update Hukum</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-black leading-tight">Wawasan Terbaru & Berita</h3>
            </div>
            <Button variant="outline" className="border-black text-black">Lihat Semua Blog</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((post, i) => (
              <div key={i} className="bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 group">
                <div className="aspect-video bg-neutral-200 overflow-hidden relative">
                   <div className="absolute top-4 left-4 bg-[#C5A02E] text-black text-[10px] font-bold px-3 py-1 uppercase">
                    {post.category}
                   </div>
                   <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-white/20 italic">
                    [Blog Image]
                   </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-400 text-xs mb-3">{post.date}</p>
                  <h4 className="text-xl font-bold text-black mb-4 group-hover:text-[#C5A02E] transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    Pelajari lebih dalam mengenai dinamika hukum terbaru yang dapat mempengaruhi bisnis dan kehidupan pribadi Anda...
                  </p>
                  <Link to={`/blog/${post.id}`} className="font-bold text-sm border-b-2 border-[#C5A02E] pb-1 hover:text-[#C5A02E] transition-colors">
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;