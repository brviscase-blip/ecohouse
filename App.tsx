
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CertificationsPage from './components/CertificationsPage';
import AboutUsPage from './components/AboutUsPage';
import ContactPage from './components/ContactPage';
import Blog from './components/Blog';
import PostView from './components/PostView';
import EditorView from './components/EditorView';
import AdminPortal from './components/AdminPortal';
import { BlogPost } from './types';
import { supabase } from './lib/supabase';

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 1,
    date: '15 Mar, 2024',
    category: 'Casas Construídas',
    title: 'Residencial Alphaville: Eficiência Térmica em Manaus',
    excerpt: 'Um estudo de caso sobre como reduzimos em 40% o consumo de energia em uma residência de alto padrão.',
    content: 'O projeto Alphaville foi um desafio técnico que uniu design biofílico à engenharia de precisão...',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    readTime: '8 min'
  }
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('cs_theme');
    if (saved) return saved as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [currentView, setCurrentView] = useState<'home' | 'certifications' | 'about' | 'contact' | 'blog'>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_POSTS);

  // Mapeamento De/Para com verificações de segurança
  const toSupabase = (post: Partial<BlogPost>) => ({
    titulo: post.title || 'Sem título',
    categoria: post.category || 'Inovação',
    resumo: post.excerpt || '',
    conteudo: post.content || '',
    url_imagem: post.imageUrl || '',
    tempo_leitura: post.readTime || '1 min',
    data_publicacao: post.date || new Date().toLocaleDateString(),
    imagens_adicionais: post.additionalImages || []
  });

  const toFrontend = (data: any): BlogPost => {
    if (!data) throw new Error("Dados do Supabase estão vazios");
    return {
      id: data.id,
      date: data.data_publicacao,
      category: data.categoria,
      title: data.titulo,
      excerpt: data.resumo,
      content: data.conteudo,
      imageUrl: data.url_imagem,
      readTime: data.tempo_leitura,
      additionalImages: data.imagens_adicionais || []
    };
  };

  const fetchPosts = useCallback(async () => {
    console.log('[SUPABASE] Sincronizando com banco...');
    try {
      const { data, error } = await supabase
        .from('artigos')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      if (data) {
        setBlogPosts(data.map(toFrontend));
        console.log('[SUPABASE] Sincronização concluída');
      }
    } catch (error) {
      console.error('[SUPABASE] Erro ao buscar:', error);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('cs_blog_posts');
    if (saved) {
      try {
        setBlogPosts(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar cache local:", e);
      }
    }
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    localStorage.setItem('cs_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('cs_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleNavigate = (view: 'home' | 'certifications' | 'about' | 'contact' | 'blog') => {
    setCurrentView(view);
    setSelectedPost(null);
    setIsCreatingPost(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveNewPost = async (post: BlogPost) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticPost = { ...post, id: tempId };

    // 1. Atualizar local IMEDIATAMENTE
    setBlogPosts(prev => [optimisticPost, ...prev]);
    setIsCreatingPost(false);
    setCurrentView('blog');

    console.log('[SUPABASE] Tentando inserir novo artigo...');

    try {
      const payload = toSupabase(post);
      const { data, error } = await supabase
        .from('artigos')
        .insert(payload)
        .select()
        .single();

      if (error) {
        console.error('[SUPABASE] Erro retornado pelo banco:', error);
        throw error;
      }
      
      if (!data) throw new Error("Banco não retornou dados após inserção.");

      // 3. Substituir temporário pelo real
      setBlogPosts(prev => 
        prev.map(p => p.id === tempId ? toFrontend(data) : p)
      );
      console.log('[SUPABASE] Item adicionado com sucesso:', data.id);
    } catch (error: any) {
      console.error('[SUPABASE] Falha crítica na sincronização:', error.message || error);
      // Reverter estado local em caso de erro
      setBlogPosts(prev => prev.filter(p => p.id !== tempId));
      alert(`Erro ao salvar no servidor: ${error.message || 'Verifique sua conexão ou as configurações do banco.'}`);
    }
  };

  const handleUpdateExistingPost = async (updatedPost: BlogPost) => {
    const previousPosts = [...blogPosts];
    setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
    setSelectedPost(updatedPost);

    try {
      const { error } = await supabase
        .from('artigos')
        .update(toSupabase(updatedPost))
        .eq('id', updatedPost.id);

      if (error) throw error;
      console.log('[SUPABASE] Item atualizado');
    } catch (error) {
      console.error('[SUPABASE] Erro ao atualizar:', error);
      setBlogPosts(previousPosts);
      alert('Erro ao atualizar no servidor. Revertendo alterações locais.');
    }
  };

  const handleDeletePost = async (id: string | number) => {
    if (!confirm('Deseja realmente excluir este registro técnico?')) return;

    const previousPosts = [...blogPosts];
    setBlogPosts(prev => prev.filter(p => p.id !== id));
    setSelectedPost(null);

    try {
      const { error } = await supabase
        .from('artigos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      console.log('[SUPABASE] Item removido');
    } catch (error) {
      console.error('[SUPABASE] Erro ao remover:', error);
      setBlogPosts(previousPosts);
      alert('Erro ao remover o item do servidor. Registro restaurado localmente.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-emerald-50 font-sans flex flex-col transition-colors duration-500 bg-blueprint">
      <Navbar 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        isTransparent={currentView === 'home' && !selectedPost && !isCreatingPost}
        activeView={currentView}
        onNavigate={handleNavigate}
      />
      
      <main className="flex-grow">
        {isCreatingPost && (
          <EditorView onSave={handleSaveNewPost} onCancel={() => setIsCreatingPost(false)} />
        )}

        {selectedPost ? (
          <PostView 
            post={selectedPost} 
            onBack={() => setSelectedPost(null)} 
            isAdmin={isAdmin}
            onUpdatePost={handleUpdateExistingPost}
            onDeletePost={handleDeletePost}
          />
        ) : (
          <>
            {currentView === 'home' && <Hero onNavigate={handleNavigate} />}
            {currentView === 'certifications' && <CertificationsPage onNavigate={handleNavigate} />}
            {currentView === 'about' && <AboutUsPage onNavigate={handleNavigate} />}
            {currentView === 'contact' && <ContactPage />}
            {currentView === 'blog' && (
              <Blog 
                posts={blogPosts}
                isAdmin={isAdmin} 
                onPostSelect={setSelectedPost} 
                onRequestCreate={() => setIsCreatingPost(true)} 
              />
            )}
          </>
        )}
      </main>

      {currentView !== 'home' && !selectedPost && <Footer />}
      
      <AdminPortal 
        isAdmin={isAdmin} 
        onLogin={() => setIsAdmin(true)} 
        onLogout={() => setIsAdmin(false)} 
      />
    </div>
  );
};

export default App;
