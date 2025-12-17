import React from 'react';
import { Users, Target, Eye, Home, Star, Zap, Building2, HardHat, Cpu, Award, Globe, Shield } from 'lucide-react';

interface AboutUsPageProps {
  onNavigate?: (view: 'home' | 'certifications' | 'about' | 'contact' | 'blog') => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  const ecoHouseClients = [
    { name: "MILTON SPÓSITO", detail: "RESIDENCIAL PREMIUM", icon: <Home className="h-5 w-5" /> },
    { name: "ADRIANO E ESTELA IBRAHIM", detail: "EFICIÊNCIA ENERGÉTICA", icon: <Zap className="h-5 w-5" /> },
    { name: "MÁRCIA E CHRISTINA (MCA)", detail: "DESIGN SUSTENTÁVEL", icon: <Star className="h-5 w-5" /> }
  ];

  const ecoProClientsData = [
    { name: "LG ELECTRONICS", detail: "TECNOLOGIA DE PONTA", icon: <Cpu className="h-5 w-5" /> },
    { name: "HYSSA ABRAHIM", detail: "DESENVOLVIMENTO URBANO", icon: <Building2 className="h-5 w-5" /> },
    { name: "DINÂMICA ENG", detail: "INFRAESTRUTURA PESADA", icon: <HardHat className="h-5 w-5" /> }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      
      {/* Hero Padronizado - 45% Ocupação */}
      <section className="relative h-[45vh] min-h-[400px] bg-[#0a0f12] overflow-hidden flex flex-col justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f12] via-[#0a0f12]/60 to-[#0a0f12] z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            alt="Main Architecture"
          />
        </div>
        
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 backdrop-blur-md rounded-full border border-emerald-500/20 mb-2">
            <Users className="h-8 w-8 text-emerald-500" />
          </div>
          <div className="space-y-3 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
              Engenharia <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-200">De Valor.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ECOHOUSE SECTION */}
      <section className="py-12 md:py-24 bg-white dark:bg-slate-950 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            
            <div className="relative h-[200px] md:h-[380px] order-2 lg:order-1">
              <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl md:rounded-3xl translate-x-2 translate-y-2"></div>
              <div className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-900">
                <img 
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  alt="Luxury House Design"
                />
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-0.5 bg-emerald-500"></div>
                   <h2 className="text-emerald-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em]">Residencial</h2>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.95]">
                  ECOHOUSE <span className="text-emerald-500">10 ANOS.</span>
                </h3>
              </div>

              <div className="space-y-3">
                {ecoHouseClients.map((client, idx) => (
                  <div key={idx} className="flex items-center gap-5 p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-emerald-500/30 transition-all shadow-sm">
                    <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                      {client.icon}
                    </div>
                    <div>
                      <h4 className="text-[12px] md:text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">{client.name}</h4>
                      <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{client.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECOPRO SECTION */}
      <section className="py-12 md:py-24 bg-slate-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-0.5 bg-sky-500"></div>
                   <h2 className="text-sky-600 text-[9px] md:text-[10px] font-black uppercase tracking-[0.5em]">Industrial</h2>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.95]">
                  ECOPRO <span className="text-sky-500">15 ANOS.</span>
                </h3>
              </div>

              <div className="space-y-3">
                {ecoProClientsData.map((client, idx) => (
                  <div key={idx} className="flex items-center gap-5 p-4 bg-white dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-sky-500/30 transition-all shadow-sm">
                    <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-sky-500 text-white rounded-xl flex items-center justify-center">
                      {client.icon}
                    </div>
                    <div>
                      <h4 className="text-[12px] md:text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">{client.name}</h4>
                      <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{client.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[200px] md:h-[380px]">
              <div className="absolute inset-0 bg-sky-500/5 rounded-2xl md:rounded-3xl -translate-x-2 translate-y-2"></div>
              <div className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-950">
                <img 
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  alt="Industrial High Tech"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA COMPACTO - NITIDEZ MÁXIMA (OPACIDADE 75%) */}
      <section className="py-20 md:py-28 bg-emerald-950 text-white relative overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover opacity-75 mix-blend-luminosity scale-105 transition-all duration-700 group-hover:scale-110"
            alt="Leaf Texture"
          />
          {/* Gradiente minimizado ao máximo para revelar os detalhes da folhagem */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.85]">
            PRONTO PARA <br/>O FUTURO?
          </h2>
          <button 
            onClick={() => onNavigate?.('contact')}
            className="inline-block px-10 py-4 bg-white text-emerald-900 font-black text-[11px] md:text-[12px] uppercase tracking-[0.4em] rounded-full hover:bg-emerald-500 hover:text-white transition-all shadow-xl active:scale-95"
          >
            Contato
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;