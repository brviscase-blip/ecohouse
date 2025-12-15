import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-48 bg-[#0a0f12] text-white relative transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-[10px] text-emerald-500 font-bold tracking-[0.5em] uppercase flex items-center gap-4">
                <span className="h-px w-8 bg-emerald-500"></span> Contato
              </h2>
              <h3 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tighter">
                Solicite um <br/>
                <span className="text-emerald-500">orçamento técnico.</span>
              </h3>
            </div>

            <div className="space-y-4 text-slate-400 font-light text-lg">
              <p>financeiroehc.construcoes@gmail.com</p>
              <p>(92) 98182 1090</p>
            </div>
          </div>

          <div className="relative">
            {formStatus === 'success' ? (
              <div className="py-20 flex flex-col items-center text-center animate-fade-in">
                <CheckCircle className="h-16 w-16 text-emerald-500 mb-6" />
                <h4 className="text-2xl font-bold mb-2">Mensagem Enviada</h4>
                <p className="text-slate-400 font-light">Retornaremos em breve.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 text-[10px] font-bold uppercase tracking-widest text-emerald-500 border-b border-emerald-500/20 pb-1"
                >
                  Novo envio
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="space-y-10">
                  <div className="relative">
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest block mb-2">Nome / Empresa</label>
                    <input
                      type="text"
                      required
                      placeholder="Como podemos lhe chamar?"
                      className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-emerald-500 transition-colors text-white placeholder:text-white/10"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="relative">
                      <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest block mb-2">WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="(00) 00000-0000"
                        className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-emerald-500 transition-colors text-white placeholder:text-white/10"
                      />
                    </div>
                    <div className="relative">
                      <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest block mb-2">E-mail</label>
                      <input
                        type="email"
                        required
                        placeholder="exemplo@email.com"
                        className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-emerald-500 transition-colors text-white placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-widest block mb-2">Descrição breve do seu projeto...</label>
                    <textarea
                      rows={1}
                      required
                      className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-emerald-500 transition-colors text-white resize-none placeholder:text-white/10"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6 text-[11px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? 'Enviando...' : (
                    <>Solicitar Orçamento <Send className="h-3 w-3" /></>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;