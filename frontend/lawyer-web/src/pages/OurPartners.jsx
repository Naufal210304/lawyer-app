import React, { useEffect } from 'react';

const Partners = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const partnerCategories = [
    {
      title: "Strategic Alliances",
      description: "Kami bekerja sama dengan pakar industri dan firma global untuk memberikan solusi hukum yang komprehensif.",
      logos: [
        { name: "Global Legal Network", logo: "https://via.placeholder.com/200x100?text=Global+Legal" },
        { name: "Tax & Finance Experts", logo: "https://via.placeholder.com/200x100?text=Tax+Experts" },
        { name: "Maritime Advisors", logo: "https://via.placeholder.com/200x100?text=Maritime" },
        { name: "Tech Compliance Co", logo: "https://via.placeholder.com/200x100?text=Tech+Comp" },
      ]
    },
    {
      title: "Corporate Clients",
      description: "Telah dipercaya oleh berbagai sektor perusahaan dalam melindungi kepentingan bisnis mereka.",
      logos: [
        { name: "Bank Nasional", logo: "https://via.placeholder.com/200x100?text=Bank+Logo" },
        { name: "Energy Corp", logo: "https://via.placeholder.com/200x100?text=Energy+Corp" },
        { name: "Real Estate Group", logo: "https://via.placeholder.com/200x100?text=Real+Estate" },
        { name: "Logistics Hub", logo: "https://via.placeholder.com/200x100?text=Logistics" },
        { name: "Consumer Goods", logo: "https://via.placeholder.com/200x100?text=Consumer" },
      ]
    }
  ];

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
        <div className="max-w-7xl mx-auto space-y-32">
          {partnerCategories.map((category, idx) => (
            <div key={idx} className="text-center">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{category.title}</h2>
                <div className="w-20 h-1 bg-[#C5A02E] mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center opacity-70">
                {category.logos.map((p, i) => (
                  <div key={i} className="group grayscale hover:grayscale-0 transition-all duration-500">
                    <img 
                      src={p.logo} 
                      alt={p.name} 
                      className="max-h-16 md:max-h-20 w-auto object-contain"
                    />
                    <p className="mt-4 text-xs font-bold text-gray-400 group-hover:text-[#C5A02E] uppercase tracking-widest">{p.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
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