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

      {/* Container Reduzido de 1600px para 7xl (aprox 1280px) para compactar o visual */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-24 md:pb-32">
        
        {isAdmin && (
          <div className="mb-10 flex justify-center md:justify-end">
            <button onClick={onRequestCreate} className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 md:px-10 py-4 text-[9px] font-black uppercase tracking-[0.4em] shadow-xl flex items-center justify-center gap-4 active:scale-95">
              <Plus className="h-4 w-4" /> Novo Registro
            </button>
          </div>
        )}

        {/* Search & Filters - Layout mais compacto */}
        <div className="mb-12 md:mb-16 flex flex-col lg:flex-row gap-6 items-center justify-between border-b border-emerald-500/20 pb-6 md:pb-8">
          <div className="flex overflow-x-auto w-full lg:w-auto no-scrollbar gap-1 pb-2 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 text-[8px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${selectedCategory === cat ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full lg:w-80">
            <input type="text" placeholder="Pesquisar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-white border-none focus:ring-1 focus:ring-emerald-500 outline-none text-[10px] font-bold tracking-tight" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-300" />
          </div>
        </div>

        {/* Grid aumentado para 4 colunas em telas grandes para reduzir o tamanho individual dos cards em ~25% */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {filteredPosts.length > 0 ? filteredPosts.map((post) => (
            <article key={post.id} className="group flex flex-col cursor-pointer bg-white dark:bg-slate-950 transition-all duration-700 hover:-translate-y-1" onClick={() => onPostSelect(post)}>
              <div className="relative aspect-[16/11] overflow-hidden shadow-lg mb-5 rounded-sm">
                <img src={post.imageUrl} alt="" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="space-y-3 px-1 md:px-0">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] md:text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em]">{post.category}</span>
                  <span className="text-[7px] font-bold text-slate-300 uppercase tracking-widest">{post.date}</span>
                </div>
                {/* Tamanho de título reduzido de 3xl para 2xl (ou xl no mobile) para um visual mais técnico e menos amplo */}
                <h4 className="text-lg md:text-xl font-black text-slate-900 dark:text-white leading-[1.2] tracking-tighter uppercase line-clamp-2">{post.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 font-light text-[11px] line-clamp-2 leading-relaxed">{post.excerpt}</p>
              </div>
            </article>
          )) : (
            <div className="col-span-full py-16 text-center bg-gray-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800">
              <p className="text-slate-400 uppercase tracking-[0.3em] text-[9px] font-black">Nenhum registro encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;