import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  isTransparent?: boolean;
  activeView?: 'home' | 'certifications' | 'about' | 'contact' | 'blog';
  onNavigate?: (view: 'home' | 'certifications' | 'about' | 'contact' | 'blog') => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  theme, 
  onToggleTheme, 
  isTransparent = true, 
  activeView = 'home',
  onNavigate 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const logoUrl = "https://lh3.googleusercontent.com/d/1t0-E0cTd8WBK50K-xxz6e-oXOCQBMaka";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (isMobileMenuOpen) {
      body.style.overflow = 'hidden';
      body.style.paddingRight = '0px'; 
    } else {
      body.style.overflow = '';
      body.style.paddingRight = '';
    }
    
    return () => {
      body.style.overflow = '';
      body.style.paddingRight = '';
    };
  }, [isMobileMenuOpen]);

  const shouldBeTransparent = isTransparent && !isScrolled && !isMobileMenuOpen;
  
  const navLinks = [
    { label: 'Home', view: 'home' as const, num: '01' },
    { label: 'Sobre Nós', view: 'about' as const, num: '02' },
    { label: 'Certificações', view: 'certifications' as const, num: '03' },
    { label: 'Artigos', view: 'blog' as const, num: '04' },
    { label: 'Contatos', view: 'contact' as const, num: '05' },
  ];

  const handleMobileNavigate = (view: any) => {
    onNavigate?.(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${shouldBeTransparent ? 'bg-transparent py-6 md:py-8' : 'bg-white dark:bg-slate-950 py-4 border-b border-gray-100 dark:border-slate-900 shadow-sm'}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 flex justify-between items-center">
          <div 
            onClick={() => handleMobileNavigate('home')}
            className="flex items-center cursor-pointer group"
          >
            <img 
              src={logoUrl} 
              alt="EcoHouse" 
              className={`h-10 md:h-14 w-auto object-contain transition-all duration-500 group-hover:scale-105 ${shouldBeTransparent ? 'brightness-0 invert' : 'dark:brightness-0 dark:invert'}`}
            />
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => onNavigate?.(link.view)}
                className={`text-[9px] font-bold uppercase tracking-[0.3em] transition-all relative py-2 group ${
                  activeView === link.view 
                    ? 'text-[#1BA19A]' 
                    : (shouldBeTransparent ? 'text-white/70 hover:text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white')
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-px bg-[#1BA19A] transition-all duration-300 ${activeView === link.view ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={onToggleTheme}
              className={`p-2 rounded-full transition-all hover:bg-[#1BA19A]/10 ${shouldBeTransparent ? 'text-white' : 'text-slate-900 dark:text-white'}`}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden z-[110] p-2 transition-all ${isMobileMenuOpen ? 'text-white' : (shouldBeTransparent ? 'text-white' : 'text-slate-900 dark:text-white')}`}
            >
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>

            <button 
              onClick={() => handleMobileNavigate('contact')}
              className="hidden sm:block px-6 md:px-8 py-3 bg-[#1BA19A] hover:bg-[#15827d] text-white text-[9px] font-bold uppercase tracking-[0.4em] rounded transition-all active:scale-95"
            >
              Contato
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU - FORCED DARK ALWAYS */}
      <div className={`fixed inset-0 z-[105] lg:hidden transition-all duration-700 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Fundo Totalmente Escuro (Independente do tema) */}
        <div className="absolute inset-0 bg-[#0a0f12] backdrop-blur-3xl"></div>
        
        {/* Tech Grid Pattern (Sutil) */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-blueprint"></div>

        <div className="relative h-full flex flex-col px-10 pt-24 pb-10 overflow-y-auto overflow-x-hidden">
          
          {/* LOGO - Topo do Menu */}
          <div className="mb-10 relative">
            <div className="absolute -inset-8 bg-emerald-500/10 blur-[40px] rounded-full opacity-50 animate-pulse pointer-events-none"></div>
            <img 
              src={logoUrl} 
              alt="EcoHouse" 
              className="h-14 w-auto object-contain brightness-0 invert drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
          </div>

          {/* NAV LINKS */}
          <div className="flex-grow flex flex-col justify-start gap-1">
            {navLinks.map((link, index) => (
              <button
                key={link.view}
                onClick={() => handleMobileNavigate(link.view)}
                className={`group flex items-center justify-between py-6 border-b border-white/5 transition-all duration-300`}
              >
                <div className="flex items-center gap-6">
                  <span className={`text-[10px] font-bold tracking-widest ${activeView === link.view ? 'text-[#1BA19A]' : 'text-white/20'}`}>
                    {link.num}
                  </span>
                  <span className={`text-3xl font-black uppercase tracking-tighter transition-all ${activeView === link.view ? 'text-[#1BA19A]' : 'text-white group-hover:text-[#1BA19A]'}`}>
                    {link.label}
                  </span>
                </div>
                {activeView === link.view && (
                  <ArrowUpRight className="h-6 w-6 text-[#1BA19A] animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* FOOTER DO MENU - Refined Layout */}
          <div className="mt-8 flex flex-col w-full">
             <div className="mb-16">
               <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em] mb-4">Inicie uma Conversa</p>
               <button 
                onClick={() => handleMobileNavigate('contact')}
                className="w-full py-5 bg-[#1BA19A] text-white font-black uppercase tracking-[0.4em] text-[10px] rounded flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-[0_10px_30px_-10px_rgba(27,161,154,0.4)]"
              >
                Solicitar Orçamento <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col items-center">
              {/* Logo Footer - Espaçamento ajustado (mb-8) */}
              <img 
                src={logoUrl} 
                alt="EcoHouse" 
                className="h-7 w-auto object-contain brightness-0 invert opacity-60 mb-8" 
              />
              
              {/* Copyright - Mais afastado da logo */}
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-10 text-center">
                © 2025 — Ecohouse Construções Sustentáveis
              </p>
              
              {/* Text Links */}
              <div className="flex items-center gap-8 md:gap-12">
                <a href="#" className="text-[8px] font-black text-white/30 hover:text-[#1BA19A] uppercase tracking-[0.25em] transition-colors">Linkedin</a>
                <a href="#" className="text-[8px] font-black text-white/30 hover:text-[#1BA19A] uppercase tracking-[0.25em] transition-colors">Instagram</a>
                <a href="#" className="text-[8px] font-black text-white/30 hover:text-[#1BA19A] uppercase tracking-[0.25em] transition-colors">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;