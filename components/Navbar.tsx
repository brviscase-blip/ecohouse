import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

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
  
  // Link direto de imagem do Google Drive (formato lh3 é o mais estável para web)
  const logoUrl = "https://lh3.googleusercontent.com/d/1t0-E0cTd8WBK50K-xxz6e-oXOCQBMaka";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldBeTransparent = isTransparent && !isScrolled && !isMobileMenuOpen;
  
  const navLinks = [
    { label: 'Home', view: 'home' as const },
    { label: 'Sobre Nós', view: 'about' as const },
    { label: 'Certificações', view: 'certifications' as const },
    { label: 'Artigos', view: 'blog' as const },
    { label: 'Contatos', view: 'contact' as const },
  ];

  const handleMobileNavigate = (view: any) => {
    onNavigate?.(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${shouldBeTransparent ? 'bg-transparent py-6 md:py-8' : 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg py-4 border-b border-gray-100 dark:border-slate-900 shadow-sm'}`}>
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
              className={`lg:hidden p-2 transition-all ${shouldBeTransparent ? 'text-white' : 'text-slate-900 dark:text-white'}`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <button 
              onClick={() => handleMobileNavigate('contact')}
              className="hidden sm:block px-6 md:px-8 py-3 bg-[#1BA19A] hover:bg-[#15827d] text-white text-[9px] font-bold uppercase tracking-[0.4em] rounded transition-all shadow-xl shadow-[#1BA19A]/20 active:scale-95"
            >
              Contato
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-white dark:bg-slate-950 pt-32 px-8 flex flex-col gap-8">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => handleMobileNavigate(link.view)}
              className={`text-2xl font-black uppercase tracking-tighter text-left border-b border-gray-100 dark:border-slate-900 pb-4 ${
                activeView === link.view ? 'text-[#1BA19A]' : 'text-slate-900 dark:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => handleMobileNavigate('contact')}
            className="mt-4 w-full py-5 bg-[#1BA19A] text-white font-black uppercase tracking-[0.4em] text-xs shadow-2xl"
          >
            Solicitar Orçamento
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;