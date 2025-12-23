
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
import { BlogPost, PostImage } from './types';
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
    readTime: '8 min',
    imagePosX: 50,
    imagePosY: 50,
    additionalImages: []
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

  const toSupabase = (post: Partial<BlogPost>) => {
    // Garantir que as imagens adicionais sejam enviadas como objetos puros para o JSONB
    const sanitizedAdditional = (post.additionalImages || []).map(img => {
      if (typeof img === 'string') return { url: img, posX: 50, posY: 50 };
      return img;
    });

    return {
      titulo: post.title || 'Sem título',
      categoria: post.category || 'Inovação',
      resumo: post.excerpt || '',
      conteudo: post.content || '',
      url_imagem: post.imageUrl || '',
      pos_x_imagem: post.imagePosX ?? 50,
      pos_y_imagem: post.imagePosY ?? 50,
      tempo_leitura: post.readTime || '1 min',
      data_publicacao: post.date || new Date().toLocaleDateString(),
      imagens_adicionais: sanitizedAdditional
    };
  };

  const toFrontend = (data: any): BlogPost => {
    if (!data) throw new Error("Dados do Supabase estão vazios");
    
    // Normalizar imagens adicionais para o novo formato de objeto
    const rawImgs = Array.isArray(data.imagens_adicionais) ? data.imagens_adicionais : [];
    const normalizedAdditional: PostImage[] = rawImgs.map((img: any) => {
      if (typeof img === 'string') return { url: img, posX: 50, posY: 50 };
      return {
        url: img.url || '',
        posX: typeof img.posX === 'number' ? img.posX : 50,
        posY: typeof img.posY === 'number' ? img.posY : 50
      };
    });

    return {
      id: data.id,
      date: data.data_publicacao,
      category: data.categoria,
      title: data.titulo,
      excerpt: data.resumo,
      content: data.conteudo,
      imageUrl: data.url_imagem,
      imagePosX: data.pos_x_imagem ?? 50,
      imagePosY: data.pos_y_imagem ?? 50,
      readTime: data.tempo_leitura,
      additionalImages: normalizedAdditional
    };
  };

  const fetchPosts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('artigos')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      if (data) {
        setBlogPosts(data.map(toFrontend));
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

    setBlogPosts(prev => [optimisticPost, ...prev]);
    setIsCreatingPost(false);
    setCurrentView('blog');

    try {
      const payload = toSupabase(post);
      const { data, error } = await supabase
        .from('artigos')
        .insert(payload)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setBlogPosts(prev => 
          prev.map(p => p.id === tempId ? toFrontend(data) : p)
        );
      }
    } catch (error: any) {
      setBlogPosts(prev => prev.filter(p => p.id !== tempId));
      console.error('Erro ao salvar:', error);
      alert(`Erro ao salvar no servidor: ${error.message}. Certifique-se de que as colunas pos_x_imagem, pos_y_imagem existem e imagens_adicionais é do tipo JSONB.`);
    }
  };

  const handleUpdateExistingPost = async (updatedPost: BlogPost) => {
    const previousPosts = [...blogPosts];
    setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
    setSelectedPost(updatedPost);

    try {
      const payload = toSupabase(updatedPost);
      const { error } = await supabase
        .from('artigos')
        .update(payload)
        .eq('id', updatedPost.id);

      if (error) throw error;
    } catch (error: any) {
      console.error('[SUPABASE] Erro ao atualizar:', error);
      setBlogPosts(previousPosts);
      alert(`Erro ao atualizar no servidor: ${error.message}`);
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
    } catch (error) {
      console.error('[SUPABASE] Erro ao remover:', error);
      setBlogPosts(previousPosts);
      alert('Erro ao remover do servidor.');
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
