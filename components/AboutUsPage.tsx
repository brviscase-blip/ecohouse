
import React from 'react';
import { Users, Target, Eye, Home, Star, Zap, ChevronRight, Building2, HardHat, Cpu, Award, Globe, Shield } from 'lucide-react';

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
      
      <section className="relative py-24 md:py-32 bg-[#0a0f12] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f12] via-[#0a0f12]/40 to-[#0a0f12] z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105"
            alt="Main Architecture"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 backdrop-blur-md rounded-full border border-emerald-500/20 mb-2 animate-fade-in">
            <Users className="h-10 w-10 md:h-12 md:w-12 text-emerald-500" />
          </div>
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.95]">
              Engenharia <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-200">De Valor.</span>
            </h1>
            <p className="text-emerald-400 font-bold uppercase tracking-[0.4em] text-[8px] md:text-xs">
              Liderança em Sustentabilidade e Gestão
            </p>
          </div>
        </div>
      </section>

      {/* ECOHOUSE SECTION */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            
            <div className="lg:col-span-7 relative h-[250px] md:h-[500px] order-2 lg:order-1 mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-emerald-500/5 rounded-[2rem] md:rounded-[3rem] -rotate-1 translate-x-3 md:translate-x-6"></div>
              <div className="relative h-full w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-2 md:border-4 border-white dark:border-slate-900 group">
                <img 
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  alt="Luxury House Design"
                />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8 relative z-10 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-0.5 bg-emerald-500"></div>
                   <h2 className="text-emerald-600 text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em]">Divisão Residencial</h2>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.95]">
                  ECOHOUSE <br/>
                  <span className="text-emerald-500">10 ANOS.</span>
                </h3>
              </div>

              <div className="space-y-3">
                {ecoHouseClients.map((client, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:border-emerald-500/30 transition-all">
                    <div className="w-10 h-10 flex-shrink-0 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                      {client.icon}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm md:text-base font-black text-slate-900 dark:text-white uppercase tracking-tighter">{client.name}</h4>
                      <p className="text-[7px] md:text-[8px] font-bold text-slate-400 uppercase tracking-widest">{client.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECOPRO SECTION */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-8 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <div className="w-8 h-0.5 bg-sky-500"></div>
                   <h2 className="text-sky-600 text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em]">Divisão Industrial</h2>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.95]">
                  ECOPRO <br/>
                  <span className="text-sky-500">15 ANOS.</span>
                </h3>
              </div>

              <div className="space-y-3">
                {ecoProClientsData.map((client, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:border-sky-500/30 transition-all">
                    <div className="w-10 h-10 flex-shrink-0 bg-sky-500 text-white rounded-xl flex items-center justify-center">
                      {client.icon}
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm md:text-base font-black text-slate-900 dark:text-white uppercase tracking-tighter">{client.name}</h4>
                      <p className="text-[7px] md:text-[8px] font-bold text-slate-400 uppercase tracking-widest">{client.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[250px] md:h-[500px] mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-sky-500/5 rounded-[2rem] md:rounded-[3rem] rotate-1 -translate-x-3 md:-translate-x-6"></div>
              <div className="relative h-full w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-2 md:border-4 border-white dark:border-slate-950 group">
                <img 
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  alt="Industrial High Tech"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-emerald-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.5em]">Cultura Organizacional</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Manifesto <span className="text-emerald-500">Corporativo.</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Missão", icon: <Target className="h-8 w-8" />, desc: "Executar obras com qualidade e segurança, buscando a satisfação do cliente e agregando sustentabilidade.", color: "bg-emerald-500", border: "border-emerald-500" },
              { title: "Visão", icon: <Eye className="h-8 w-8" />, desc: "Tornar-se uma empresa referência no setor, reconhecida pela excelência e liderança de mercado.", color: "bg-slate-900 dark:bg-white", border: "border-slate-900 dark:border-white" },
              { title: "Valores", icon: <Award className="h-8 w-8" />, desc: "Sustentabilidade integral, inovação tecnológica e transparência ética em cada processo.", color: "bg-emerald-500", border: "border-emerald-500" }
            ].map((box, i) => (
              <div key={i} className={`group bg-slate-50 dark:bg-slate-900 p-8 md:p-10 border-t-4 ${box.border} shadow-lg transition-all flex flex-col items-start`}>
                <div className={`w-14 h-14 ${box.color} ${i === 1 ? 'text-white dark:text-slate-900' : 'text-white'} rounded-2xl flex items-center justify-center mb-6 shadow-md`}>
                  {box.icon}
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">{box.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-32 bg-emerald-950 text-white relative overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-110 animate-slow-zoom"
            alt="Leaf Texture"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-emerald-950/40"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8 md:space-y-10">
          <div className="space-y-4">
             <div className="w-12 h-px bg-emerald-500 mx-auto"></div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85]">
               PRONTO PARA <br/>O FUTURO?
             </h2>
          </div>
          <button 
            onClick={() => onNavigate?.('contact')}
            className="w-full sm:w-auto px-8 md:px-16 py-4 md:py-5 bg-white text-emerald-900 font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-full hover:bg-emerald-500 hover:text-white transition-all shadow-2xl active:scale-95 leading-tight"
          >
            Entrar em contato
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
