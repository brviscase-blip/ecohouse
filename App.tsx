
import React, { useState, useEffect } from 'react';
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
  },
  {
    id: 2,
    date: '10 Fev, 2024',
    category: 'Inovação',
    title: 'Sistemas Fotovoltaicos Integrados à Fachada',
    excerpt: 'A revolução dos vidros inteligentes que geram energia sem comprometer a estética arquitetônica.',
    content: 'A integração de células fotovoltaicas em elementos estruturais é o próximo passo da construção civil...',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    readTime: '12 min'
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
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cs_blog_posts');
    if (saved) {
      setBlogPosts(JSON.parse(saved));
    } else {
      setBlogPosts(INITIAL_POSTS);
      localStorage.setItem('cs_blog_posts', JSON.stringify(INITIAL_POSTS));
    }
  }, []);

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

  const handleSaveNewPost = (post: BlogPost) => {
    setIsCreatingPost(false);
    const updatedPosts = [post, ...blogPosts];
    setBlogPosts(updatedPosts);
    localStorage.setItem('cs_blog_posts', JSON.stringify(updatedPosts));
    setSelectedPost(null);
    setCurrentView('blog');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleUpdateExistingPost = (updatedPost: BlogPost) => {
    const updatedPosts = blogPosts.map(p => p.id === updatedPost.id ? updatedPost : p);
    setBlogPosts(updatedPosts);
    localStorage.setItem('cs_blog_posts', JSON.stringify(updatedPosts));
    setSelectedPost(updatedPost);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-emerald-50 font-sans flex flex-col transition-colors duration-500 bg-blueprint">
      <Navbar 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        isTransparent={currentView === 'home'}
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

      {/* Exibe o Footer apenas se NÃO estiver na Home e não tiver um post selecionado */}
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
