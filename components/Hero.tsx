import React from 'react';
import { ArrowRight, Linkedin, Instagram, MessageCircle } from 'lucide-react';

interface HeroProps {
  onNavigate?: (view: 'home' | 'certifications' | 'about' | 'contact' | 'blog') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#0a0f12]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Engineering Architecture"
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity scale-110 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f12]/80 via-transparent to-[#0a0f12]"></div>
      </div>

      {/* Main Content Container - Flex Grow to take available space */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 flex flex-col justify-center flex-grow pt-28 pb-10">
        <div className="max-w-6xl space-y-8 md:space-y-10">
          
          {/* Label */}
          <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="h-0.5 w-8 md:w-12 bg-[#1BA19A]"></div>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-[#1BA19A] uppercase">
              Engenharia Sustentável
            </span>
          </div>

          {/* Title - Aumentado significativamente no mobile */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[0.95] md:leading-[0.9] tracking-tighter uppercase animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Futuro <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1BA19A] to-[#1BA19A]/50">
              Construímos Agora!
            </span>
          </h1>

          {/* Description - Aumentado e com melhor espaçamento */}
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Somos uma empresa do ramo de engenharia civil que acredita na
            sustentabilidade como meio de garantir a perpetuação e a evolução das
            empresas.
          </p>

          {/* Buttons - Full width no mobile, melhor área de toque */}
          <div className="flex flex-col sm:flex-row gap-5 pt-8 md:pt-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={() => onNavigate?.('contact')}
              className="w-full sm:w-auto px-8 py-5 bg-[#1BA19A] hover:bg-[#15827d] text-white text-xs font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 group rounded-sm shadow-[0_20px_40px_-15px_rgba(27,161,154,0.3)]"
            >
              Iniciar Projeto <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button 
              onClick={() => onNavigate?.('about')}
              className="w-full sm:w-auto px-8 py-5 border border-white/10 hover:border-white/30 hover:bg-white/5 text-white text-xs font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center rounded-sm"
            >
              Nossa Visão
            </button>
          </div>
        </div>
      </div>

      {/* Footer / Socials - Distributed to bottom */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 pb-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-8 animate-fade-in-up border-t border-white/5 md:border-none" style={{ animationDelay: '0.5s' }}>
        <p className="hidden md:block text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} — ECOHOUSE Construções
        </p>
        
        <div className="flex gap-10 md:gap-12 w-full md:w-auto justify-center">
             <a href="#" className="text-gray-500 hover:text-[#1BA19A] transition-colors"><Linkedin className="h-5 w-5" /></a>
             <a href="#" className="text-gray-500 hover:text-[#1BA19A] transition-colors"><Instagram className="h-5 w-5" /></a>
             <a href="#" className="text-gray-500 hover:text-[#1BA19A] transition-colors"><MessageCircle className="h-5 w-5" /></a>
        </div>

        <p className="md:hidden text-[8px] font-bold text-gray-500 uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} — ECOHOUSE Construções
        </p>
      </div>
    </section>
  );
};

export default Hero;