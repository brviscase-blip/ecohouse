import React from 'react';

const Footer: React.FC = () => {
  const logoUrl = "https://lh3.googleusercontent.com/d/1t0-E0cTd8WBK50K-xxz6e-oXOCQBMaka";

  return (
    <footer className="bg-[#0a0f12] py-20 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
          <img 
            src={logoUrl} 
            alt="EcoHouse Logo" 
            className="h-12 w-auto brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
          />
          <p className="text-gray-500 text-[10px] font-light tracking-widest uppercase">
            © {new Date().getFullYear()} — ECOHOUSE Construções Sustentáveis
          </p>
        </div>
        
        <div className="flex gap-12">
          {['LinkedIn', 'Instagram', 'WhatsApp'].map((social) => (
            <a 
              key={social} 
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-gray-400 hover:text-[#1BA19A] uppercase tracking-widest transition-colors"
            >
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;