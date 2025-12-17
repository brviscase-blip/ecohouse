import React from 'react';
import { Users, Target, Eye, Home, Star, Zap, Building2, HardHat, Cpu, Award, Globe, Shield } from 'lucide-react';

interface AboutUsPageProps {
  onNavigate?: (view: 'home' | 'certifications' | 'about' | 'contact' | 'blog') => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  const ecoHouseClients = [
    { name: "MILTON SPÓSITO", detail: "RESIDENCIAL PREMIUM", icon: <Home className="h-4 w-4" /> },
    { name: "ADRIANO E ESTELA IBRAHIM", detail: "EFICIÊNCIA ENERGÉTICA", icon: <Zap className="h-4 w-4" /> },
    { name: "MÁRCIA E CHRISTINA (MCA)", detail: "DESIGN SUSTENTÁVEL", icon: <Star className="h-4 w-4" /> }
  ];

  const ecoProClientsData = [
    { name: "LG ELECTRONICS", detail: "TECNOLOGIA DE PONTA", icon: <Cpu className="h-4 w-4" /> },
    { name: "HYSSA ABRAHIM", detail: "DESENVOLVIMENTO URBANO", icon: <Building2 className="h-4 w-4" /> },
    { name: "DINÂMICA ENG", detail: "INFRAESTRUTURA PESADA", icon: <HardHat className="h-4 w-4" /> }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
      
      {/* Hero Reduzido */}
      <section className="relative py-20 md:py-28 bg-[#0a0f12] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f12] via-[#0a0f12]/60 to-[#0a0f12] z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-100"
            alt="Main Architecture"
          />
        </div>
        
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 backdrop-blur-md rounded-full border border-emerald-500/20 mb-2">
            <Users className="h-8 w-8 text-emerald-500" />
          </div>
          <div className="space-y-3 animate-fade-in-up">
            <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.95]">
              Engenharia <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-200">De Valor.</span>
            </h1>
            <p className="text-emerald-400 font-bold uppercase tracking-[0.4em] text-[7px] md:text-[9px]">
              Liderança em Sustentabilidade e Gestão
            </p>
          </div>
        </div>
      </section>

      {/* ECOHOUSE SECTION - MAIS COMPACTO */}
      <section className="py-12 md:py-20 bg-white dark:bg-slate-950 relative">
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

            <div className="space-y-6 order-1 lg:order-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                   <div className="w-6 h-0.5 bg-emerald-500"></div>
                   <h2 className="text-emerald-600 text-[8px] font-black uppercase tracking-[0.4em]">Residencial</h2>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.95]">
                  ECOHOUSE <span className="text-emerald-500">10 ANOS.</span>
                </h3>
              </div>

              <div className="space-y-2">
                {ecoHouseClients.map((client, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-emerald-500/20 transition-all">
                    <div className="w-8 h-8 flex-shrink-0 bg-emerald-500 text-white rounded-lg flex items-center justify-center">
                      {client.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] md:text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">{client.name}</h4>
                      <p className="text-[6px] md:text-[7px] font-bold text-slate-400 uppercase tracking-widest">{client.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECOPRO SECTION - MAIS COMPACTO */}
      <section className="py-12 md:py-20 bg-slate-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                   <div className="w-6 h-0.5 bg-sky-500"></div>
                   <h2 className="text-sky-600 text-[8px] font-black uppercase tracking-[0.4em]">Industrial</h2>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.95]">
                  ECOPRO <span className="text-sky-500">15 ANOS.</span>
                </h3>
              </div>

              <div className="space-y-2">
                {ecoProClientsData.map((client, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-white dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-xl hover:border-sky-500/20 transition-all">
                    <div className="w-8 h-8 flex-shrink-0 bg-sky-500 text-white rounded-lg flex items-center justify-center">
                      {client.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] md:text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">{client.name}</h4>
                      <p className="text-[6px] md:text-[7px] font-bold text-slate-400 uppercase tracking-widest">{client.detail}</p>
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

      {/* MANIFESTO - MINIMALISTA */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-emerald-500 text-[7px] font-black uppercase tracking-[0.5em]">Cultura</h2>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Manifesto <span className="text-emerald-500">Corporativo.</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Missão", icon: <Target className="h-6 w-6" />, desc: "Qualidade, segurança e sustentabilidade em cada etapa executiva." },
              { title: "Visão", icon: <Eye className="h-6 w-6" />, desc: "Referência em excelência e liderança tecnológica no setor." },
              { title: "Valores", icon: <Award className="h-6 w-6" />, desc: "Ética, inovação e preservação ambiental como base de tudo." }
            ].map((box, i) => (
              <div key={i} className="group bg-white dark:bg-slate-900 p-8 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                  {box.icon}
                </div>
                <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-3">{box.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-light">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA COMPACTO */}
      <section className="py-20 md:py-28 bg-emerald-950 text-white relative overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity scale-100"
            alt="Leaf Texture"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/90 to-emerald-950/60"></div>
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.85]">
            PRONTO PARA <br/>O FUTURO?
          </h2>
          <button 
            onClick={() => onNavigate?.('contact')}
            className="inline-block px-10 py-4 bg-white text-emerald-900 font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] rounded-full hover:bg-emerald-500 hover:text-white transition-all shadow-xl active:scale-95"
          >
            Entrar em contato
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;