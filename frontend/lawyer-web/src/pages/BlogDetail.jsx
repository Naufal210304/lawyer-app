import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Simulasi Data Blog (Nantinya data ini akan diambil dari API Backend)
  const blogs = [
    { 
      id: 1, 
      title: "Pentingnya Legalitas Bisnis di Era Digital", 
      date: "15 Oct 2023", 
      category: "Corporate",
      content: "Di era transformasi digital yang begitu cepat, legalitas bisnis bukan lagi sekadar kewajiban administratif, melainkan fondasi utama kepercayaan konsumen. Banyak UMKM terjebak dalam masalah hukum karena mengabaikan pendaftaran merek atau izin usaha elektronik (PSE). Artikel ini akan membahas langkah demi langkah bagaimana mengamankan bisnis Anda di ranah digital agar terhindar dari sengketa di masa depan..."
    },
    { 
      id: 2, 
      title: "Cara Menghadapi Sengketa Tanah Tanpa Panik", 
      date: "12 Oct 2023", 
      category: "Property",
      content: "Sengketa tanah seringkali menjadi momok yang menakutkan bagi pemilik properti. Hal pertama yang harus dilakukan adalah melakukan pengecekan keabsahan sertifikat di BPN. Jika terjadi tumpang tindih lahan, langkah mediasi adalah jalan terbaik sebelum menempuh jalur litigasi. Kami merangkum tips praktis untuk melindungi aset properti Anda dari mafia tanah..."
    },
    { 
      id: 3, 
      title: "Hak-Hak Pekerja yang Sering Terabaikan", 
      date: "10 Oct 2023", 
      category: "Employment",
      content: "Banyak pekerja di Indonesia belum sepenuhnya memahami hak-hak mereka terkait lembur, cuti tahunan, dan pesangon pasca implementasi UU Cipta Kerja. Pengetahuan mengenai perjanjian kerja (PKWT/PKWTT) sangat krusial agar pekerja memiliki posisi tawar yang adil di hadapan perusahaan. Berikut adalah poin-poin penting yang harus Anda ketahui dalam kontrak kerja Anda..."
    },
  ];

  // Cari blog berdasarkan ID dari URL
  const post = blogs.find(b => b.id === parseInt(id));

  if (!post) {
    return (
      <div className="py-40 text-center">
        <h2 className="text-2xl font-bold">Artikel tidak ditemukan.</h2>
        <Link to="/blog" className="text-[#C5A02E] mt-4 inline-block">Kembali ke Blog</Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      {/* Hero Section Detail */}
      <section className="bg-black py-20 px-4 md:px-10">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/blog')}
            className="text-[#C5A02E] flex items-center gap-2 mb-8 hover:translate-x-[-5px] transition-transform font-bold uppercase text-xs tracking-widest"
          >
            <span>&larr;</span> Kembali ke Blog
          </button>
          <div className="inline-block bg-[#C5A02E] text-black text-[10px] font-bold px-3 py-1 uppercase mb-6">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 italic">
            {post.title}
          </h1>
          <p className="text-gray-400">{post.date} • Ditulis oleh Tim Hukum Saminan & Partners</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-3xl mx-auto">
          {/* Placeholder Gambar Utama */}
          <div className="aspect-video bg-neutral-100 mb-12 flex items-center justify-center text-gray-300 italic border border-gray-100">
            [Gambar Artikel: {post.title}]
          </div>

          {/* Isi Artikel */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p className="text-xl font-medium text-black">
              Ringkasan: {post.content.substring(0, 150)}...
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <h3 className="text-2xl font-bold text-black pt-4">Tinjauan Hukum Secara Mendalam</h3>
            <p>
              {post.content}
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
            </p>
          </div>

          {/* Footer Artikel */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              <span className="font-bold text-sm uppercase">Share:</span>
              <a href="#" className="text-gray-400 hover:text-[#C5A02E]">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-[#C5A02E]">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-[#C5A02E]">LinkedIn</a>
            </div>
            <button 
              onClick={() => navigate('/blog')}
              className="px-8 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C5A02E] transition-colors"
            >
              Tutup Artikel
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;