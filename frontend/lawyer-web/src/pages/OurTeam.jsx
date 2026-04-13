import React, { useEffect, useState } from 'react';
import axios from '../services/axios';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('/team');
      setTeamMembers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      // Fallback to default data if API fails
      setTeamMembers([
        {
          id: 1,
          name: "Saminan, S.H.",
          position: "Founder & Managing Partner",
          image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
        },
        {
          id: 2,
          name: "Andi Wijaya, S.H., M.H.",
          position: "Senior Associate",
          image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        },
        {
          id: 3,
          name: "Siti Aminah, S.H.",
          position: "Associate",
          image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        },
        {
          id: 4,
          name: "Budi Santoso, S.H.",
          position: "Junior Associate",
          image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

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
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C5A02E] mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {teamMembers.map((member, index) => (
                <div key={member.id || index} className="group">
                  <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 mb-6 border-b-4 border-transparent group-hover:border-[#C5A02E] transition-all duration-500 shadow-lg">
                    <img
                      src={member.image_url.startsWith('/uploads/') ? `http://localhost:3001${member.image_url}` : member.image_url} 
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-1">{member.name}</h3>
                  <p className="text-[#C5A02E] font-medium text-sm uppercase tracking-widest">{member.position}</p>
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-[#C5A02E] hover:text-black transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
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