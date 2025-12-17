import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Headset, User, MessageSquare } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  const contactItems = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Canais Digitais",
      detail: "financeiroehc.construcoes@gmail.com",
      sub: "Retorno em até 24h"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Interface Direta",
      detail: "(92) 98182 1090",
      sub: "WhatsApp disponível"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Base Operacional",
      detail: "Manaus, Amazonas",
      sub: "Atendimento regional"
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500">
      
      {/* Hero Padronizado - 45% Ocupação */}
      <section className="relative h-[45vh] min-h-[400px] bg-[#0a0f12] overflow-hidden flex flex-col justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f12] via-[#0a0f12]/80 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
            alt="Technical Office"
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-16 flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <div className="flex items-center gap-3 md:gap-4 text-[#1BA19A]">
            <Headset className="h-6 w-6 md:h-8 md:w-8" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em]">Solicite um Orçamento</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
            Vamos Iniciar <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1BA19A] to-[#1BA19A]/50">Seu Projeto.</span>
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20">
          
          <div className="lg:col-span-5 space-y-12 md:space-y-16 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 md:w-12 h-1 bg-[#1BA19A]"></div>
                <h2 className="text-[#1BA19A] text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">Protocolo de Atendimento</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.9]">
                SOLICITE UM <br/>
                <span className="text-[#1BA19A]">ORÇAMENTO.</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed max-w-sm">
                Nossa equipe técnica analisará sua requisição em conformidade com as normas ambientais para fornecer uma proposta de valor.
              </p>
            </div>

            <div className="space-y-6 md:space-y-8">
              {contactItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-5 md:gap-6 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 dark:bg-slate-900 text-[#1BA19A] border border-slate-200 dark:border-slate-800 flex items-center justify-center rounded-xl transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</h4>
                    <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-tight break-all md:break-normal">{item.detail}</p>
                    <p className="text-[9px] font-medium text-[#1BA19A]/60 uppercase tracking-widest mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            {formStatus === 'success' ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-[#f2f8f7] dark:bg-[#082a29] border border-[#1BA19A]/20 p-8 md:p-16 text-center animate-fade-in">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#1BA19A] text-white rounded-full flex items-center justify-center mb-8 shadow-xl">
                  <CheckCircle className="h-10 w-10 md:h-12 md:w-12" />
                </div>
                <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Requisição Enviada</h4>
                <p className="text-slate-500 dark:text-slate-400 font-light mb-8 text-sm md:text-base">Um especialista técnico entrará em contato em breve para o detalhamento.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="text-[10px] font-black text-[#1BA19A] uppercase tracking-[0.4em] border-b-2 border-[#1BA19A]/20 hover:border-[#1BA19A] pb-2 transition-all"
                >
                  Nova solicitação
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl p-6 md:p-16 relative">
                <div className="absolute top-0 right-0 w-12 h-12 md:w-20 md:h-20 border-r-2 border-t-2 border-slate-100 dark:border-slate-800 -translate-y-2 translate-x-2 md:-translate-y-4 md:translate-x-4 pointer-events-none"></div>
                
                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <User className="h-3 w-3 text-[#1BA19A]" /> Nome Completo
                      </label>
                      <input type="text" required placeholder="João da Silva" className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 px-5 py-4 outline-none focus:border-[#1BA19A] transition-all text-slate-900 dark:text-white text-sm" />
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Mail className="h-3 w-3 text-[#1BA19A]" /> E-mail
                      </label>
                      <input type="email" required placeholder="email@empresa.com" className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 px-5 py-4 outline-none focus:border-[#1BA19A] transition-all text-slate-900 dark:text-white text-sm" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <MessageSquare className="h-3 w-3 text-[#1BA19A]" /> Mensagem Técnica
                    </label>
                    <textarea required rows={5} placeholder="Descreva brevemente as necessidades estruturais..." className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 px-5 py-4 outline-none focus:border-[#1BA19A] transition-all text-slate-900 dark:text-white text-sm resize-none"></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="w-full py-5 md:py-6 bg-[#1BA19A] text-white font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? 'Processando...' : 'Enviar Requisição'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-4">
          <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Aguardamos sua parceria estratégica.</p>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;