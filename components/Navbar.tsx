import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Linkedin, Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';

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

  // Correção: Garante que o scroll é restaurado limpando o estilo inline ('')
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup function para garantir que o scroll volte caso o componente desmonte
    return () => {
      document.body.style.overflow = '';
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

      {/* Modern Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[105] lg:hidden transition-all duration-700 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Backdrop Glass */}
        <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl"></div>
        
        {/* Tech Grid Pattern (Subtle) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-blueprint"></div>

        <div className="relative h-full flex flex-col pt-32 px-10 pb-12 overflow-y-auto">
          
          {/* Logo no Topo do Menu Mobile - MAXIMIZADA */}
          <div className={`absolute top-10 left-10 transition-all duration-700 delay-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            {/* Spotlight Glow behind logo */}
            <div className="absolute -inset-10 bg-emerald-500/20 blur-[60px] rounded-full opacity-40 animate-pulse pointer-events-none"></div>
            
            <img 
              src={logoUrl} 
              alt="EcoHouse" 
              className="h-14 md:h-16 w-auto object-contain brightness-0 invert opacity-100 contrast-[1.2] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] relative z-10"
            />
          </div>

          {/* Menu Items Container */}
          <div className="flex-grow flex flex-col justify-center gap-2">
            {navLinks.map((link, index) => (
              <button
                key={link.view}
                onClick={() => handleMobileNavigate(link.view)}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`group flex items-center justify-between py-5 border-b border-white/5 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="flex items-baseline gap-4">
                  <span className={`text-[10px] font-black tracking-widest ${activeView === link.view ? 'text-[#1BA19A]' : 'text-white/20'}`}>
                    {link.num}
                  </span>
                  <span className={`text-3xl md:text-4xl font-black uppercase tracking-tighter transition-all ${activeView === link.view ? 'text-[#1BA19A] pl-2' : 'text-white group-hover:pl-2'}`}>
                    {link.label}
                  </span>
                </div>
                <ArrowUpRight className={`h-6 w-6 transition-all duration-300 ${activeView === link.view ? 'text-[#1BA19A] opacity-100' : 'text-white/0 group-hover:opacity-40 group-hover:text-white'}`} />
              </button>
            ))}
          </div>

          {/* Mobile Menu Footer */}
          <div className={`mt-12 pt-8 border-t border-white/10 flex flex-col gap-8 transition-all duration-700 delay-300 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col gap-4">
              <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">Inicie uma Conversa</p>
              <button 
                onClick={() => handleMobileNavigate('contact')}
                className="w-full py-5 bg-[#1BA19A] text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-sm active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                Solicitar Orçamento <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-6">
                <a href="#" className="text-white/40 hover:text-[#1BA19A] transition-colors"><Linkedin className="h-5 w-5" /></a>
                <a href="#" className="text-white/40 hover:text-[#1BA19A] transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="text-white/40 hover:text-[#1BA19A] transition-colors"><MessageCircle className="h-5 w-5" /></a>
              </div>
              <p className="text-[7px] font-bold text-white/20 uppercase tracking-widest">ECOHOUSE © 2024</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;