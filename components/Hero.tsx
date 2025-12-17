
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate?: (view: 'home' | 'certifications' | 'about' | 'contact') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#0a0f12]">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Engineering Architecture"
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-110 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f12]/50 via-transparent to-[#0a0f12]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16">
        <div className="max-w-7xl space-y-8 md:space-y-10 animate-fade-in-up">
          <div className="flex items-center gap-4 md:gap-6">
            <span className="h-px w-8 md:w-16 bg-[#1BA19A]"></span>
            <span className="text-[#1BA19A] text-[8px] md:text-[10px] font-bold uppercase tracking-[0.6em]">EcoHouse — Engenharia de Precisão</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-[4.5rem] lg:text-[5.5rem] font-bold text-white leading-[0.95] tracking-tighter transition-colors uppercase">
            CONSTRUÍMOS O <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1BA19A] to-emerald-200">FUTURO AGORA.</span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed transition-colors">
            Integração total entre tecnologias ecológicas e gestão de alta performance. Racionalização e respeito ao meio ambiente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4 md:pt-6">
            <button 
              onClick={() => onNavigate?.('contact')}
              className="group flex items-center justify-center gap-6 px-10 md:px-12 py-4 md:py-5 bg-[#1BA19A] hover:bg-[#15827d] text-white text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.4em] transition-all rounded-sm shadow-2xl"
            >
              Iniciar Projeto
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </button>
            <button 
              onClick={() => onNavigate?.('about')}
              className="px-10 md:px-12 py-4 md:py-5 border border-white/10 hover:border-[#1BA19A]/50 text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] backdrop-blur-md transition-all rounded-sm text-center"
            >
              Nossa Visão
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10 opacity-30">
        <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/40 rotate-90 mb-4">Scroll</span>
        <div className="w-px h-10 md:h-16 bg-gradient-to-b from-[#1BA19A] to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
