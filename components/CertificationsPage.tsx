import React from 'react';
import { Award, ShieldCheck, Trees, Leaf, Zap, Globe, ShoppingBag, Users, Medal, Building2 } from 'lucide-react';

interface CertificationsPageProps {
  onNavigate?: (view: 'home' | 'certifications' | 'about' | 'contact' | 'blog') => void;
}

const CertificationsPage: React.FC<CertificationsPageProps> = ({ onNavigate }) => {
  const productCerts = [
    { 
      title: "FSC (Forest Stewardship Council)", 
      desc: "Garante a gestão responsável de florestas e a procedência sustentável de produtos de madeira e papel.", 
      icon: <Trees className="h-5 w-5" /> 
    },
    { 
      title: "Rótulo Ecológico ABNT", 
      desc: "Atesta produtos com menor impacto ambiental comparado a alternativas similares.", 
      icon: <Leaf className="h-5 w-5" /> 
    },
    { 
      title: "LEED, AQUA e BREEAM", 
      desc: "Certificações específicas para a construção civil, atestando a sustentabilidade de edifícios e empreendimentos.", 
      icon: <Building2 className="h-5 w-5" /> 
    },
    { 
      title: "Selo Procel", 
      desc: "Reconhece produtos e serviços com alta eficiência energética no mercado brasileiro.", 
      icon: <Zap className="h-5 w-5" /> 
    },
    { 
      title: "Bonsucro & RTRS", 
      desc: "Certificações para cadeias de produção agrícola sustentáveis (cana, soja e outras).", 
      icon: <Award className="h-5 w-5" /> 
    }
  ];

  const managementCerts = [
    { 
      title: "ISO 14001", 
      desc: "Norma internacional para sistemas de gestão ambiental e melhoria de desempenho ambiental.", 
      icon: <Globe className="h-5 w-5" /> 
    },
    { 
      title: "ISO 20400", 
      desc: "Diretrizes para compras sustentáveis integradas ao processo de aquisição corporativa.", 
      icon: <ShoppingBag className="h-5 w-5" /> 
    },
    { 
      title: "SA 8000", 
      desc: "Norma focada na responsabilidade social e condições de trabalho justas.", 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      title: "ISO 9001 e ISO 45001", 
      desc: "Sistemas de gestão da qualidade, saúde e segurança ocupacional de alta performance.", 
      icon: <Medal className="h-5 w-5" /> 
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Padronizado - 45% Ocupação */}
      <section className="relative h-[45vh] min-h-[400px] bg-[#0a0f12] overflow-hidden flex flex-col justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f12] via-[#0a0f12]/40 to-[#0a0f12] z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
            alt="Sustainable Architecture Detail"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 backdrop-blur-md rounded-full border border-emerald-500/20 mb-2">
            <ShieldCheck className="h-10 w-10 text-emerald-500" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
              Certificações <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-200">De Excelência</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Seção 1: Produto e Setor - Minimalismo Refinado */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20 space-y-6">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-emerald-500"></span>
              <h2 className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold tracking-[0.4em] uppercase">Setor Específico</h2>
              <span className="h-px w-8 bg-emerald-500"></span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white transition-colors tracking-tight">
              Certificações de Produto
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed text-sm">
              Foco em produtos, serviços e materiais, atestando características sustentáveis e baixo impacto ambiental em toda a cadeia de suprimentos.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {productCerts.map((cert, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-slate-950 p-7 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-emerald-500/30 transition-all group relative overflow-hidden w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.25rem)] max-w-[400px]"
              >
                <div className="absolute top-0 right-0 p-5 opacity-5 text-emerald-500 group-hover:opacity-10 transition-opacity">
                   {cert.icon}
                </div>
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center rounded-xl mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner">
                  <div className="group-hover:scale-[1.03] origin-center transition-transform duration-500">
                    {cert.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{cert.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 2: Sistemas de Gestão - Minimalismo Refinado */}
      <section className="py-20 bg-white dark:bg-slate-950 transition-colors border-t border-gray-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-14 md:gap-16">
            <div className="lg:w-1/3 space-y-6">
              <div className="space-y-4">
                <h2 className="text-[10px] text-emerald-600 font-bold tracking-[0.4em] uppercase">Sistemas de Gestão</h2>
                <h3 className="text-4xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
                  Governança e Sustentabilidade <span className="text-emerald-600">Contínua.</span>
                </h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed text-base">
                Processos internos que atestam a gestão responsável da empresa, desde a qualidade técnica até a segurança ocupacional e responsabilidade social.
              </p>
              <div className="pt-2">
                <div className="h-1 w-12 bg-emerald-500"></div>
              </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {managementCerts.map((cert, idx) => (
                <div key={idx} className="p-6 border border-gray-200 dark:border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-gray-50 dark:hover:bg-slate-900 transition-all duration-500 flex flex-col gap-4 group">
                  <div className="w-fit text-emerald-500 group-hover:scale-[1.03] origin-center transition-transform duration-500">{cert.icon}</div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">{cert.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL - PADRONIZADO COM SOBRE NÓS */}
      <section className="py-20 md:py-28 bg-emerald-950 text-white relative overflow-hidden group">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover opacity-75 mix-blend-luminosity scale-105 transition-all duration-700 group-hover:scale-110"
            alt="Leaf Texture Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.85]">
            PRONTO PARA <br/> ELEVAR O PADRÃO?
          </h2>
          <div className="flex justify-center">
            <button 
              onClick={() => onNavigate?.('contact')}
              className="inline-block px-10 py-4 bg-white text-emerald-900 font-black text-[11px] md:text-[12px] uppercase tracking-[0.4em] rounded-full hover:bg-emerald-500 hover:text-white transition-all shadow-xl active:scale-95"
            >
              Contato
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CertificationsPage;