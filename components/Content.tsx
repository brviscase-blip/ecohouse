
import React, { useState } from 'react';
import { Home, Building2, ArrowRight, Lightbulb, Zap, Leaf, Award, Truck } from 'lucide-react';

const Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'house' | 'pro'>('house');

  const ecoHouseContent = [
    { title: "Casas Autossuficientes", description: "Energia limpa para sua residência com sistemas off-grid de alta performance.", icon: <Zap className="h-5 w-5" /> },
    { title: "Design Biofílico", description: "Natureza integrada ao lar para bem-estar cognitivo e conforto térmico superior.", icon: <Leaf className="h-5 w-5" /> },
    { title: "Automação Smart", description: "Gestão inteligente de recursos via sensores IoT de última geração.", icon: <Lightbulb className="h-5 w-5" /> }
  ];

  const ecoProContent = [
    { title: "Eficiência 4.0", description: "BIM aplicado à redução drástica de resíduos e otimização de cronogramas.", icon: <Building2 className="h-5 w-5" /> },
    { title: "Consultoria LEED", description: "Engenharia de pontuação máxima em selos globais de sustentabilidade.", icon: <Award className="h-5 w-5" /> },
    { title: "Logística Zero", description: "Descarbonização completa da cadeia de suprimentos e materiais certificados.", icon: <Truck className="h-5 w-5" /> }
  ];

  return (
    <section id="content" className="py-40 bg-[#1BA19A] text-white relative overflow-hidden transition-colors">
      {/* Elemento Decorativo Técnico de Fundo */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-black/10 -skew-x-12 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-full bg-white/5 skew-x-12 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-10">
          <div className="max-w-xl">
            <h2 className="text-[10px] text-emerald-100 font-bold tracking-[0.5em] uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-emerald-100" /> Hub de Engenharia
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-white drop-shadow-sm">Inovação Técnica</h3>
          </div>

          <div className="inline-flex bg-[#0a0f12]/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/20">
            <button 
              onClick={() => setActiveTab('house')}
              className={`flex items-center gap-3 px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${activeTab === 'house' ? 'bg-white text-[#0a0f12] shadow-xl scale-[1.02]' : 'text-white/70 hover:text-white'}`}
            >
              <Home className="h-3.5 w-3.5" /> EcoHouse
            </button>
            <button 
              onClick={() => setActiveTab('pro')}
              className={`flex items-center gap-3 px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all duration-300 ${activeTab === 'pro' ? 'bg-white text-[#0a0f12] shadow-xl scale-[1.02]' : 'text-white/70 hover:text-white'}`}
            >
              <Building2 className="h-3.5 w-3.5" /> EcoPro
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {(activeTab === 'house' ? ecoHouseContent : ecoProContent).map((item, idx) => (
            <div 
              key={idx} 
              className="group p-12 bg-[#0a0f12] rounded-[2.5rem] border border-white/5 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-start"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mb-10 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-inner">
                {item.icon}
              </div>
              
              <h4 className="text-2xl font-bold mb-4 tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h4>
              
              <p className="text-sm text-slate-400 font-light leading-relaxed mb-10 min-h-[4rem]">
                {item.description}
              </p>
              
              <button className="mt-auto flex items-center text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-500 group-hover:text-white border-b border-transparent hover:border-white transition-all py-1">
                Ver Ficha Técnica <ArrowRight className="ml-3 h-3 w-3 transition-transform group-hover:translate-x-2" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-[10px] font-bold text-emerald-100/40 uppercase tracking-[0.6em]">Padrão de Qualidade Certificado</p>
        </div>
      </div>
    </section>
  );
};

export default Content;
