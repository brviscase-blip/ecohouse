import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "Residencial Green Valley",
    category: "Sustentabilidade",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Referência em arquitetura passiva e reuso de águas pluviais."
  },
  {
    id: 2,
    title: "Sede Corporativa Nexus",
    category: "Certificado LEED",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Eficiência energética de ponta em um design minimalista."
  },
  {
    id: 3,
    title: "EcoHub Industrial",
    category: "Baixo Carbono",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Infraestrutura logística resiliente com matriz energética solar."
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="projects" className="py-32 bg-gray-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold tracking-[0.4em] uppercase mb-4">Portfolio Selecionado</h2>
            <p className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
              Marcos da Nova Engenharia.
            </p>
          </div>
          <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/30 pb-2 hover:border-emerald-500 transition-all">
            Ver Todos Projetos
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {projects.map((project) => (
            <div key={project.id} className="group relative aspect-[4/5] overflow-hidden bg-slate-200 cursor-pointer">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-300 font-light leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;