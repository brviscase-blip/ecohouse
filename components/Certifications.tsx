import React from 'react';
import { ShieldCheck, Award, ThermometerSnowflake } from 'lucide-react';

const Certifications: React.FC = () => {
  const certifications = [
    {
      title: "LEED Platinum/Gold",
      description: "Excelência global em design ambiental e performance energética.",
      icon: <Award className="h-7 w-7" />
    },
    {
      title: "Selo WELL",
      description: "Foco total na saúde e bem-estar dos ocupantes.",
      icon: <ThermometerSnowflake className="h-7 w-7" />
    },
    {
      title: "AQUA-HQE",
      description: "Alta qualidade ambiental adaptada à realidade brasileira.",
      icon: <ShieldCheck className="h-7 w-7" />
    }
  ];

  return (
    <section id="certifications" className="py-40 bg-white dark:bg-slate-950 border-y border-gray-100 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold tracking-[0.4em] uppercase mb-6">Padrões Globais</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-[1.1] tracking-tighter mb-10">
              Rigores Técnicos <br/>
              <span className="text-emerald-500">Internacionais.</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-lg font-light leading-relaxed mb-12 max-w-md">
              Nossa engenharia é validada pelos maiores órgãos de certificação ambiental do mundo, garantindo ativos imobiliários de valor perpétuo.
            </p>
            <div className="flex gap-12">
              <div className="space-y-1">
                <p className="text-4xl font-bold text-slate-900 dark:text-white">45+</p>
                <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest">Obras LEED</p>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-bold text-slate-900 dark:text-white">100%</p>
                <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-widest">Compliance</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-slate-900 p-10 rounded-2xl border border-gray-200/50 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all group flex items-start gap-8">
                <div className="p-4 bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                  {cert.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{cert.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;