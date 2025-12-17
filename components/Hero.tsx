import React from 'react';
import { ArrowRight, Linkedin, Instagram, MessageCircle } from 'lucide-react';

interface HeroProps {
  onNavigate?: (view: 'home' | 'certifications' | 'about' | 'contact' | 'blog') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0f12]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Engineering Architecture"
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity scale-110 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f12]/80 via-transparent to-[#0a0f12]"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 flex flex-col justify-center">
        <div className="max-w-6xl space-y-6 md:space-y-8 animate-fade-in-up">
          
          {/* Label de Identificação */}
          <div className="flex items-center gap-4">
            <span className="h-px w-8 md:w-12 bg-[#1BA19A]"></span>
            <span className="text-[#1BA19A] text-[7px] md:text-[9px] font-black uppercase tracking-[0.5em]">Casas Sustentáveis</span>
          </div>
          
          {/* Título Principal Compactado */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase transition-all">
            CONSTRUÍMOS O <br className="hidden md:block"/>
            <span className="text-[#1BA19A]">FUTURO AGORA.</span>
          </h1>
          
          {/* Parágrafo de Apoio - Manifesto Atualizado conforme solicitação */}
          <p className="text-sm md:text-lg text-gray-400 font-light max-w-xl leading-relaxed transition-colors">
            Somos uma empresa do ramo de <br className="hidden md:block"/>
            engenharia civil que acredita na <br className="hidden md:block"/>
            sustentabilidade como meio de garantir <br className="hidden md:block"/>
            a perpetuação e a evolução das empresas.
          </p>
          
          {/* Ações Compactas */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={() => onNavigate?.('contact')}
              className="group flex items-center justify-center gap-6 px-8 py-4 bg-[#1BA19A] hover:bg-[#15827d] text-white text-[9px] font-black uppercase tracking-[0.3em] transition-all rounded-sm shadow-xl"
            >
              Iniciar Projeto
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </button>
            <button 
              onClick={() => onNavigate?.('about')}
              className="px-8 py-4 border border-white/10 hover:border-[#1BA19A]/50 text-white text-[9px] font-bold uppercase tracking-[0.3em] backdrop-blur-md transition-all rounded-sm text-center"
            >
              Nossa Visão
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative Technical Detail */}
      <div className="absolute top-1/2 right-16 -translate-y-1/2 hidden xl:flex flex-col gap-8 opacity-10">
        <div className="flex flex-col items-end gap-2">
          <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white">Grid System</span>
          <div className="w-32 h-px bg-white"></div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white">Eco Tech 01</span>
          <div className="w-24 h-px bg-[#1BA19A]"></div>
        </div>
      </div>

      {/* Integrated Compact Footer (Absolute Bottom) */}
      <div className="absolute bottom-8 left-0 w-full px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6 z-20">
        <div className="flex items-center gap-6 text-white/30">
          <p className="text-[8px] font-black uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} — ECOHOUSE Construções
          </p>
          <div className="hidden md:block h-3 w-px bg-white/10"></div>
          <p className="hidden md:block text-[8px] font-medium uppercase tracking-[0.2em]">
            Engenharia de Alto Padrão
          </p>
        </div>
        
        <div className="flex items-center gap-8">
          <a href="#" className="text-white/30 hover:text-[#1BA19A] transition-colors">
            <Linkedin className="h-3.5 w-3.5" />
          </a>
          <a href="#" className="text-white/30 hover:text-[#1BA19A] transition-colors">
            <Instagram className="h-3.5 w-3.5" />
          </a>
          <a href="#" className="text-white/30 hover:text-[#1BA19A] transition-colors">
            <MessageCircle className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

    </section>
  );
};

export default Hero;