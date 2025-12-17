import React, { useState } from 'react';
import { Lock, LogOut, Settings, X } from 'lucide-react';

interface AdminPortalProps {
  onLogin: () => void;
  onLogout: () => void;
  isAdmin: boolean;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ onLogin, onLogout, isAdmin }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === 'Ricardo' && password === '1234') {
      onLogin();
      setShowLogin(false);
      setUser('');
      setPassword('');
      setError('');
    } else {
      setError('Acesso negado. Credenciais inválidas.');
    }
  };

  return (
    <>
      {/* Gatilho de Gestão Administrativa - Oculto em Mobile (hidden lg:flex) */}
      <div 
        className="hidden lg:flex fixed bottom-0 right-0 w-8 h-8 z-[9999] cursor-pointer opacity-10 hover:opacity-100 transition-opacity items-center justify-center bg-transparent group"
        onClick={() => isAdmin ? onLogout() : setShowLogin(true)}
      >
        {isAdmin ? (
          <div className="bg-red-600 p-2 text-white shadow-lg">
            <LogOut className="h-4 w-4" />
          </div>
        ) : (
          <div className="p-2 text-slate-400 group-hover:text-emerald-500">
            <Settings className="h-4 w-4" />
          </div>
        )}
      </div>

      {showLogin && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md p-10 shadow-2xl relative border border-emerald-500/20">
            <button 
              onClick={() => setShowLogin(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mb-4 transition-colors">
                <Lock className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Portal de Gestão</h2>
              <p className="text-gray-500 dark:text-gray-300 text-sm font-light mt-2">Área exclusiva para administradores EcoHouse.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Identificador</label>
                <input 
                  type="text" 
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white border-b-2 border-transparent focus:border-emerald-500 outline-none transition-all font-medium"
                  placeholder="Nome de usuário"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Chave de Acesso</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white border-b-2 border-transparent focus:border-emerald-500 outline-none transition-all font-medium"
                  placeholder="••••"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center">{error}</p>}
              <button 
                type="submit"
                className="w-full bg-[#1BA19A] hover:bg-[#15827d] text-white font-bold py-4 text-xs uppercase tracking-[0.3em] transition-all shadow-lg"
              >
                Entrar no Sistema
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPortal;