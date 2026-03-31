import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import AboutBg from '../assets/About-bg.jpg';

const About = () => {
  const { hash } = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    serviceArea: '',
    problemDetails: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini kamu bisa menambahkan sanitasi data sebelum dikirim ke API
    console.log("Data dikirim:", formData);
    alert("Permintaan konsultasi telah dikirim!");
    // Logika pengiriman ke backend menggunakan axios/fetch akan diletakkan di sini
  };

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

  return (
    <div className="w-full">
      {/* Hero-like Section for About Page */}
      <section className="relative w-full py-24 md:py-40 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={AboutBg} alt="Tentang Firma Kami" className="w-full h-full object-cover" />
          {/* Overlay untuk keterbacaan teks */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 md:px-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight uppercase">
            Tentang <span className="text-[#C5A02E]">Kami</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Dedikasi, Integritas, dan Keunggulan dalam Setiap Layanan Hukum.
          </p>
        </div>
      </section>

      {/* Section: Sejarah Perusahaan */}
      <section className="py-24 px-4 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[#C5A02E] font-semibold tracking-widest uppercase mb-4 text-sm text-center">
            Perjalanan Kami
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-black mb-12 leading-tight text-center">
            Sejarah Firma Hukum Saminan & Partners
          </h3>
          <div className="text-gray-700 text-lg leading-relaxed space-y-6 max-w-4xl mx-auto">
            <p>
              Didirikan pada tahun 2008 oleh Bapak Saminan, S.H., firma hukum kami bermula dari sebuah visi sederhana: menyediakan layanan hukum yang tidak hanya kompeten, tetapi juga berlandaskan pada integritas dan empati. Dalam dekade terakhir, kami telah tumbuh menjadi salah satu firma hukum terkemuka di Indonesia, dikenal karena pendekatan inovatif dan komitmen tak tergoyahkan terhadap klien.
            </p>
            <p>
              Dari kasus-kasus korporasi yang kompleks hingga litigasi keluarga yang sensitif, setiap tantangan telah membentuk keahlian dan reputasi kami. Kami bangga dengan tim pengacara kami yang berdedikasi, yang tidak hanya ahli dalam bidangnya masing-masing, tetapi juga memahami nuansa hukum yang terus berkembang. Kami percaya bahwa setiap kasus adalah unik dan membutuhkan strategi yang disesuaikan, itulah sebabnya kami selalu mengedepankan solusi yang efektif dan berkelanjutan.
            </p>
            <p>
              Perjalanan kami adalah cerminan dari kepercayaan yang diberikan klien kepada kami. Kami terus berinovasi, beradaptasi dengan perubahan zaman, dan memperluas jangkauan layanan kami untuk memenuhi kebutuhan hukum yang semakin beragam.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Visi & Misi */}
      <section className="py-24 px-4 md:px-10 bg-gray-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-[#C5A02E] font-semibold tracking-widest uppercase mb-4 text-sm">
              Tujuan Kami
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
              Visi Kami
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Menjadi firma hukum terdepan yang diakui secara nasional dan internasional atas keunggulan layanan, integritas, dan kontribusinya terhadap penegakan keadilan di masyarakat.
            </p>
          </div>
          <div>
            <h2 className="text-[#C5A02E] font-semibold tracking-widest uppercase mb-4 text-sm">
              Cara Kami Mencapai
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-black mb-8 leading-tight">
              Misi Kami
            </h3>
            <ul className="text-gray-700 text-lg leading-relaxed space-y-4 list-disc list-inside">
              <li>Memberikan representasi hukum yang berkualitas tinggi dan berorientasi pada hasil.</li>
              <li>Membangun hubungan jangka panjang dengan klien berdasarkan kepercayaan dan transparansi.</li>
              <li>Mendorong inovasi dalam praktik hukum untuk solusi yang lebih efektif.</li>
              <li>Berkomitmen pada pengembangan profesional berkelanjutan bagi seluruh tim.</li>
              <li>Berperan aktif dalam edukasi hukum dan advokasi untuk kebaikan masyarakat.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section: Formulir Konsultasi */}
      <section id="form" className="py-24 px-4 md:px-10 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[#C5A02E] font-semibold tracking-widest uppercase mb-4 text-sm text-center">
            Hubungi Kami
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-12 leading-tight text-center">
            Dapatkan Konsultasi <span className="text-[#C5A02E]">Gratis</span>
          </h3>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Kolom Kiri: Data Diri */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-gray-300 text-sm font-bold mb-2">Nama Lengkap</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    value={formData.fullName}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-neutral-800 border-neutral-700 text-white" 
                    placeholder="Nama Lengkap Anda" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-gray-300 text-sm font-bold mb-2">Nomor Handphone</label>
                  <input 
                    type="tel" 
                    id="phoneNumber" 
                    name="phoneNumber" 
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-neutral-800 border-neutral-700 text-white" 
                    placeholder="Contoh: +6281234567890" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-neutral-800 border-neutral-700 text-white" 
                    placeholder="email@example.com" 
                    required 
                  />
                </div>
              </div>

              {/* Kolom Kanan: Detail Masalah */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="serviceArea" className="block text-gray-300 text-sm font-bold mb-2">Bidang Layanan</label>
                  <select 
                    id="serviceArea" 
                    name="serviceArea" 
                    value={formData.serviceArea}
                    onChange={handleChange}
                    className="shadow border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-neutral-800 border-neutral-700 text-white" 
                    required>
                    <option value="">Pilih Bidang Layanan</option>
                    <option value="Hukum Korporasi">Hukum Korporasi</option>
                    <option value="Hukum Pidana">Hukum Pidana</option>
                    <option value="Hukum Keluarga">Hukum Keluarga</option>
                    <option value="Properti & Real Estate">Properti & Real Estate</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="problemDetails" className="block text-gray-300 text-sm font-bold mb-2">Deskripsi / Detail Masalah</label>
                  <textarea 
                    id="problemDetails" 
                    name="problemDetails" 
                    value={formData.problemDetails}
                    onChange={handleChange}
                    rows="6" 
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-neutral-800 border-neutral-700 text-white" 
                    placeholder="Jelaskan secara singkat masalah hukum Anda" required></textarea>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                variant="outline" 
                className="text-lg px-10 py-3 border-[#C5A02E] text-[#C5A02E] hover:bg-[#C5A02E] hover:text-black transition-all duration-300"
              >
                Kirim Permintaan Konsultasi
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default About