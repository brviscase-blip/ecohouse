import React, { useState } from 'react';
import { Upload, Save, Edit3 } from 'lucide-react';

interface AboutTexts {
  title: string;
  description: string;
  stats: { label: string; value: string }[];
}

interface AboutProps {
  isAdmin?: boolean;
}

const DEFAULT_TEXTS: AboutTexts = {
  title: 'Construir é um ato de responsabilidade.',
  description: 'Nascemos da convicção de que o progresso técnico e a preservação ambiental são indissociáveis. Nossa engenharia foca na otimização de recursos e na longevidade das estruturas, garantindo valor real para clientes e sociedade.',
  stats: [
    { label: 'Energia Limpa', value: '100%' },
    { label: 'Obras Entregues', value: '250+' },
    { label: 'Certificações', value: 'Global' },
    { label: 'Economia', value: '30%' }
  ]
};

const About: React.FC<AboutProps> = ({ isAdmin }) => {
  const [imageUrl, setImageUrl] = useState<string>(() => {
    return localStorage.getItem('cs_about_image') || "https://images.unsplash.com/photo-1449156001437-3a1621dfbe69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
  });

  const [texts, setTexts] = useState<AboutTexts>(() => {
    const saved = localStorage.getItem('cs_about_texts');
    return saved ? JSON.parse(saved) : DEFAULT_TEXTS;
  });

  const [isEditingTexts, setIsEditingTexts] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImageUrl(base64);
        localStorage.setItem('cs_about_image', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveTexts = () => {
    localStorage.setItem('cs_about_texts', JSON.stringify(texts));
    setIsEditingTexts(false);
  };

  return (
    <section id="about" className="py-40 bg-[#0a0f12] text-white relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-24">
        <div className="lg:w-1/2 relative group">
          <div className="absolute -top-10 -left-10 w-40 h-40 border-l border-t border-emerald-500/20 pointer-events-none"></div>
          
          <div className="relative aspect-[4/5] overflow-hidden bg-slate-900 shadow-2xl">
            <img 
              src={imageUrl} 
              alt="Engenharia de Valor" 
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            
            {isAdmin && (
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                <label className="flex items-center gap-3 px-6 py-3 bg-white text-slate-900 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-emerald-50 transition-all shadow-xl">
                  <Upload className="h-4 w-4" />
                  Trocar Imagem
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            )}
          </div>
          
          <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r border-b border-emerald-500/20 pointer-events-none"></div>
        </div>

        <div className="lg:w-1/2 space-y-12">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h2 className="text-[10px] text-emerald-400 font-bold uppercase tracking-[0.4em]">Nosso Manifesto</h2>
              {isAdmin && !isEditingTexts && (
                <button 
                  onClick={() => setIsEditingTexts(true)}
                  className="p-2 text-emerald-400 bg-emerald-400/10 rounded-full hover:bg-emerald-400/20 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {isEditingTexts ? (
              <textarea 
                value={texts.title}
                onChange={(e) => setTexts({ ...texts, title: e.target.value })}
                className="w-full text-5xl font-bold bg-transparent border-b-2 border-emerald-500 outline-none text-white leading-[1.1] tracking-tighter"
                rows={2}
              />
            ) : (
              <h3 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tighter transition-colors">
                {texts.title.split(' ').map((word, i) => (
                  <span key={i} className={word.toLowerCase() === 'responsabilidade.' ? 'text-emerald-400' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h3>
            )}
          </div>
          
          {isEditingTexts ? (
            <textarea 
              value={texts.description}
              onChange={(e) => setTexts({ ...texts, description: e.target.value })}
              className="w-full text-lg font-light leading-loose bg-transparent border border-emerald-500/30 p-4 rounded-xl text-white outline-none"
              rows={5}
            />
          ) : (
            <p className="text-slate-400 text-lg font-light leading-loose transition-colors">
              {texts.description}
            </p>
          )}
          
          <div className="grid grid-cols-2 gap-y-10 pt-8 border-t border-white/10 transition-colors">
            {texts.stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <p className="text-3xl font-bold text-white transition-colors">{stat.value}</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {isEditingTexts && (
            <div className="flex gap-4">
              <button 
                onClick={handleSaveTexts}
                className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl"
              >
                <Save className="h-4 w-4" /> Salvar Textos
              </button>
              <button 
                onClick={() => setIsEditingTexts(false)}
                className="px-8 py-3 bg-slate-800 text-slate-400 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-700 transition-all"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;