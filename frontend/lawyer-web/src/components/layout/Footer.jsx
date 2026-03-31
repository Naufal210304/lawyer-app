import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";

const Footer = () => {
  // Logic: Data navigasi dan sosial media dipisahkan dari JSX
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Practice Area", href: "/practice" },
    { name: "Our Team", href: "/team" },
    { name: "Our Partners", href: "/partners" },
    { name: "Blog", href: "/blog" },
  ];

  const socialMedia = [
    { 
      name: "Facebook", 
      href: "#", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> 
    },
    { 
      name: "Twitter", 
      href: "#", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg> 
    },
    { 
      name: "LinkedIn", 
      href: "#", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> 
    },
    { 
      name: "Instagram", 
      href: "#", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> 
    },
  ];

  return (
    <footer className="bg-black text-[#C5A02E] py-16 px-4 md:px-10 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Kolom 1: Logo & Deskripsi */}
        <div className="flex flex-col space-y-6">
          <img src={logo} alt="S&P Law Firm" className="h-48 w-auto self-start brightness-0 invert" />
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Berkomitmen untuk memberikan layanan hukum terbaik dengan integritas tinggi dan pendekatan yang berorientasi pada hasil bagi setiap klien kami.
          </p>
        </div>

        {/* Kolom 2: Menu Navigasi */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Navigation</h4>
          <ul className="grid grid-cols-2 gap-4 text-sm">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link to={item.href} className="transition-colors duration-300 hover:text-white">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Sosial Media */}
        <div className="flex flex-col space-y-10">
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Social Media</h4>
            <div className="flex gap-4">
              {socialMedia.map((social) => (
                <a key={social.name} href={social.href} className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center transition-all duration-300 hover:bg-[#C5A02E] hover:border-[#C5A02E] hover:text-black text-[#C5A02E]" title={social.name}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Kantor Kami</h4>
            <div className="flex items-start gap-3 text-gray-400 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#C5A02E] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="leading-relaxed">
                Sudirman Central Business District (SCBD), <br />
                Mandiri Tower Lt. 25, <br />
                Jl. Jend. Sudirman Kav. 52-53, <br />
                Jakarta Selatan, 12190
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="mt-16 pt-8 border-t border-neutral-900 text-center">
        <p className="text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Saminan & Partners Law Firm. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;