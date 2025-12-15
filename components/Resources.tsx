import React from 'react';
import { Download, FileText, Zap, Layout, PlayCircle } from 'lucide-react';
import { Resource } from '../types';

const resources: Resource[] = [
  {
    id: 1,
    title: 'Calculadora de Pegada de Carbono',
    type: 'Ferramenta Interativa',
    description: 'Estime o impacto ambiental dos materiais da sua obra em poucos passos.',
    icon: <Zap className="h-8 w-8" />
  },
  {
    id: 2,
    title: 'E-book: Fachadas Verdes',
    type: 'PDF Gratuito',
    description: 'Manual técnico para especificação de sistemas de jardins verticais em edifícios.',
    icon: <FileText className="h-8 w-8" />
  },
  {
    id: 3,
    title: 'Checklist de Certificação LEED',
    type: 'Planilha Técnica',
    description: 'Ferramenta de gestão para acompanhamento de requisitos obrigatórios e créditos.',
    icon: <Layout className="h-8 w-8" />
  },
  {
    id: 4,
    title: 'Curso: Introdução à Construção Sustentável',
    type: 'Vídeo Aula',
    description: 'Aprenda os pilares fundamentais da arquitetura de baixo impacto com nossos especialistas.',
    icon: <PlayCircle className="h-8 w-8" />
  }
];

const Resources: React.FC = () => {
  return (
    <section id="resources" className="py-32 bg-emerald-950 text-white relative overflow-hidden">
      {/* Background patterns similar to architectural drawings */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-emerald-400 font-bold tracking-[0.2em] uppercase text-xs mb-4">Educação e Ferramentas</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tighter">
              Guias Interativos & <span className="text-emerald-500">Recursos Técnicos</span>
            </h3>
            <p className="text-emerald-100/60 font-light leading-relaxed mb-10">
              Disponibilizamos ferramentas dinâmicas para ajudar profissionais e proprietários na tomada de decisão consciente.
            </p>
            <button className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest transition-all">
              Acessar Hub Completo
            </button>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {resources.map((res) => (
              <div 
                key={res.id} 
                className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:bg-white/10 cursor-pointer"
              >
                <div className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                  {res.icon}
                </div>
                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">
                  {res.type}
                </div>
                <h4 className="text-xl font-bold mb-4 tracking-tight">
                  {res.title}
                </h4>
                <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                  {res.description}
                </p>
                <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-emerald-400 transition-colors">
                  Acessar agora <Download className="ml-2 h-3 w-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;