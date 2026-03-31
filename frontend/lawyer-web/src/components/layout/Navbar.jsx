import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleConsultationClick = () => {
    setIsMenuOpen(false);
    if (location.pathname === '/about') {
      const element = document.getElementById('form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/about#form');
    }
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      // Jika scroll ke bawah dan sudah melewati tinggi navbar (80px), sembunyikan
      setIsVisible(false);
    } else {
      // Jika scroll ke atas, munculkan navbar
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Logic: Data navigasi dipisahkan dari struktur UI (JSX)
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Practice Area", href: "/practice" },
    { name: "Our Team", href: "/team" },
    { name: "Our Partners", href: "/partners" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="w-full px-4 md:px-10 h-20 flex items-center justify-between">
        
        {/* Pojok Kiri: Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-44 w-auto" />
          </Link>
        </div>

        {/* Tengah: Menu Navigasi */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link key={item.name} to={item.href} className="text-black hover:text-[#C5A02E] font-medium transition-colors">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Pojok Kanan: CTA & Toggle Mobile */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Button onClick={handleConsultationClick}>
              Free Consultation
            </Button>
          </div>

          {/* Hamburger Button */}
          <button 
            className="md:hidden text-black focus:outline-none p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-6 space-y-6">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.href} 
              className="text-xl font-bold text-black hover:text-[#C5A02E]"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Button onClick={handleConsultationClick}>
            Free Consultation
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;