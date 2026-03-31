import React, { useEffect } from 'react';

const Team = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "Saminan, S.H.",
      position: "Founder & Managing Partner",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Andi Wijaya, S.H., M.H.",
      position: "Senior Associate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Siti Aminah, S.H.",
      position: "Associate",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    },
    {
      name: "Budi Santoso, S.H.",
      position: "Junior Associate",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="bg-black py-24 md:py-32 px-4 md:px-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter">
            Our <span className="text-[#C5A02E]">Team</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light">
            Sinergi para profesional hukum berdedikasi untuk memberikan hasil terbaik bagi setiap klien.
          </p>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="py-24 px-4 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 mb-6 border-b-4 border-transparent group-hover:border-[#C5A02E] transition-all duration-500 shadow-lg">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  />
                </div>
                <h3 className="text-2xl font-bold text-black mb-1">{member.name}</h3>
                <p className="text-[#C5A02E] font-medium text-sm uppercase tracking-widest">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Experience Description Section */}
      <section className="py-24 px-4 md:px-10 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#C5A02E] font-semibold tracking-widest uppercase mb-4 text-sm">Kualitas & Pengalaman</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-black leading-tight">Mengapa Memilih Tim Kami?</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 shadow-sm border-t-4 border-[#C5A02E]">
              <div className="text-4xl font-bold text-black mb-4">3+ <span className="text-[#C5A02E] text-xl uppercase">Tahun</span></div>
              <h4 className="text-xl font-bold mb-4">Pengalaman Rata-rata</h4>
              <p className="text-gray-600 leading-relaxed">
                Setiap anggota tim kami dipilih melalui seleksi ketat. Rata-rata lawyer di Saminan & Partners memiliki pengalaman praktik hukum di atas 3 tahun, memastikan kematangan dalam menganalisis risiko dan menyusun strategi legal yang presisi.
              </p>
            </div>

            <div className="bg-white p-10 shadow-sm border-t-4 border-[#C5A02E]">
              <div className="text-4xl font-bold text-black mb-4">20+ <span className="text-[#C5A02E] text-xl uppercase">Kasus</span></div>
              <h4 className="text-xl font-bold mb-4">Penanganan Kasus per Lawyer</h4>
              <p className="text-gray-600 leading-relaxed">
                Bukan sekadar teori, tim kami kaya akan pengalaman lapangan. Secara rata-rata, setiap lawyer kami telah sukses menangani lebih dari 20 kasus hukum, memberikan mereka jam terbang yang tinggi dalam menghadapi berbagai dinamika di meja perundingan maupun persidangan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;