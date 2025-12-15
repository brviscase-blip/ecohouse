import React from 'react';
import { Building2, Home, Hammer, Leaf, ShieldCheck, Ruler } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: 1,
    title: 'Edificações Corporativas',
    icon: <Building2 className="h-6 w-6" />,
    description: 'Soluções integradas para complexos comerciais com foco em eficiência e automação.'
  },
  {
    id: 2,
    title: 'Residências Sustentáveis',
    icon: <Home className="h-6 w-6" />,
    description: 'Arquitetura premium que respeita o ecossistema e maximiza o conforto térmico.'
  },
  {
    id: 3,
    title: 'Retrofit Estrutural',
    icon: <Hammer className="h-6 w-6" />,
    description: 'Modernização de ativos imobiliários com tecnologias de baixo impacto ambiental.'
  },
  {
    id: 4,
    title: 'Consultoria LEED & WELL',
    icon: <Leaf className="h-6 w-6" />,
    description: 'Acompanhamento técnico para certificações globais de sustentabilidade e bem-estar.'
  },
  {
    id: 5,
    title: 'Gestão de Ativos BIM',
    icon: <ShieldCheck className="h-6 w-6" />,
    description: 'Controle total do ciclo de vida da obra através de modelagem inteligente de dados.'
  },
  {
    id: 6,
    title: 'Infraestrutura Urbana',
    icon: <Ruler className="h-6 w-6" />,
    description: 'Projetos de engenharia civil que integram o meio urbano à natureza de forma funcional.'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[10px] text-emerald-600 font-bold tracking-[0.4em] uppercase mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-emerald-600"></span> Nossas Soluções
            </h2>
            <p className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight transition-colors">
              Engenharia de precisão para um mundo em transformação.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-100 dark:border-slate-800">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group p-12 border-r border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 transition-all duration-500"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed text-sm mb-10 transition-colors">
                {service.description}
              </p>
              
              <div className="flex items-center text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                Detalhes <span className="ml-3">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;