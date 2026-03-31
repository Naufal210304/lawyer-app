import React from 'react';

const Button = ({ children, onClick, className = "", type = "button", variant = "primary" }) => {
  const baseStyles = "px-6 py-2 rounded-md font-semibold transition-all duration-300 active:scale-95";
  const variants = {
    primary: "bg-black text-[#C5A02E] border border-black hover:bg-[#C5A02E] hover:text-black shadow-md",
    outline: "border-2 border-[#C5A02E] text-[#C5A02E] hover:bg-[#C5A02E] hover:text-black",
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;