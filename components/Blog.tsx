import React, { useState, useMemo } from 'react';
import { Search, Plus, BookOpen, Zap } from 'lucide-react';
import { BlogPost } from '../types';

const categories = ['Todos', 'Casas Construídas', 'Inovação', 'Certificações', 'Obra'];

interface BlogProps {
  posts: BlogPost[];
  isAdmin?: boolean;
  onPostSelect: (post: BlogPost) => void;
  onRequestCreate: () => void;
}

const Blog: React.FC<BlogProps> = ({ posts, isAdmin, onPostSelect, onRequestCreate }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const catMatch = selectedCategory === 'Todos' || post.category.includes(selectedCategory);
      const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery, posts]);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500">
      
      {/* Hero Padronizado - 45% Ocupação */}
      <section className="relative h-[45vh] min-h-[400px] bg-[#0a0f12] overflow-hidden flex flex-col justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f12] via-[#0a0f12]/40 to-[#0a0f12] z-10"></div>
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover opacity-40 mix-blend-luminosity" alt="Technical" />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 text-center space-y-8">
          <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 backdrop-blur-md rounded-full border border-emerald-500/20 mb-2 animate-fade-in">
            <BookOpen className="h-10 w-10 text-emerald-500" />
          </div>
          <div className="space-y-4 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">
              Artigos & <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-200">Registros Técnicos</span>
            </h1>
            <p className="text-emerald-400 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">Documentação de Engenharia e Inovação</p>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 md:px-16 pt-16 md:pt-24 pb-24 md:pb-48">
        
        {isAdmin && (
          <div className="mb-12 md:mb-16 flex justify-center md:justify-end">
            <button onClick={onRequestCreate} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 md:px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] shadow-xl flex items-center justify-center gap-4 active:scale-95">
              <Plus className="h-5 w-5" /> Novo Registro
            </button>
          </div>
        )}

        {/* Search & Filters */}
        <div className="mb-16 md:mb-24 flex flex-col lg:flex-row gap-8 items-center justify-between border-b border-emerald-500/40 pb-8 md:pb-12">
          <div className="flex overflow-x-auto w-full lg:w-auto no-scrollbar gap-2 pb-4 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-6 py-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${selectedCategory === cat ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full lg:w-96">
            <input type="text" placeholder="Pesquisar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-6 py-4 bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-white border-none focus:ring-1 focus:ring-emerald-500 outline-none text-xs font-bold tracking-tight rounded-none" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
          {filteredPosts.length > 0 ? filteredPosts.map((post) => (
            <article key={post.id} className="group flex flex-col cursor-pointer bg-white dark:bg-slate-950 transition-all duration-700 hover:-translate-y-2" onClick={() => onPostSelect(post)}>
              <div className="relative aspect-[16/10] overflow-hidden shadow-xl mb-6 md:mb-8">
                <img src={post.imageUrl} alt="" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="space-y-4 px-2 md:px-0">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] md:text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em]">{post.category}</span>
                  <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{post.date}</span>
                </div>
                <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter uppercase">{post.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 font-light text-sm line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>
            </article>
          )) : (
            <div className="col-span-full py-24 text-center bg-gray-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px] font-black">Nenhum registro encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;