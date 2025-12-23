
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, Edit2, X, Image as ImageIcon, 
  CheckCircle, Upload, Trash2, 
  Plus, Share2, Calendar, Clock, Move
} from 'lucide-react';
import { BlogPost, PostImage } from '../types';

const MAMMOTH_URL = "https://esm.sh/mammoth@1.6.0";

interface PostViewProps {
  post: BlogPost;
  onBack: () => void;
  isAdmin: boolean;
  onUpdatePost: (updated: BlogPost) => void;
  onDeletePost?: (id: string | number) => void;
}

const PostView: React.FC<PostViewProps> = ({ post, onBack, isAdmin, onUpdatePost, onDeletePost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState<BlogPost>({ 
    ...post, 
    additionalImages: post.additionalImages || [],
    imagePosX: post.imagePosX ?? 50,
    imagePosY: post.imagePosY ?? 50
  });
  const [showSavedMsg, setShowSavedMsg] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Controle de Arraste (Dragging)
  const [draggingIdx, setDraggingIdx] = useState<number | 'cover' | null>(null);
  const dragContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing) {
      setEditedPost({ 
        ...post, 
        additionalImages: (post.additionalImages || []).map(img => 
          typeof img === 'string' ? { url: img, posX: 50, posY: 50 } : img
        ),
        imagePosX: post.imagePosX ?? 50,
        imagePosY: post.imagePosY ?? 50
      });
    }
  }, [isEditing, post]);

  const handleWordImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsProcessing(true);
    try {
      const mammoth = await import(MAMMOTH_URL);
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.default.convertToHtml({ arrayBuffer });
      if (result.value) {
        setEditedPost({ 
          ...editedPost, 
          content: result.value,
          readTime: `${Math.max(1, Math.ceil(result.value.replace(/<[^>]*>?/gm, '').trim().split(/\s+/).length / 225))} min`
        });
      }
    } catch (err) {
      alert("Erro ao processar Word.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        if (isCover) {
          setEditedPost({ ...editedPost, imageUrl: base64, imagePosX: 50, imagePosY: 50 });
        } else {
          setEditedPost(prev => ({
            ...prev,
            additionalImages: [...(prev.additionalImages || []), { url: base64, posX: 50, posY: 50 }]
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAdditionalImage = (index: number) => {
    setEditedPost(prev => ({
      ...prev,
      additionalImages: (prev.additionalImages || []).filter((_, i) => i !== index)
    }));
  };

  const handleMouseDown = (idx: number | 'cover') => {
    setDraggingIdx(idx);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggingIdx === null) return;
      
      let rect;
      if (draggingIdx === 'cover') {
        rect = coverRef.current?.getBoundingClientRect();
      } else {
        rect = dragContainerRefs.current[draggingIdx]?.getBoundingClientRect();
      }

      if (!rect) return;

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const posX = Math.max(0, Math.min(100, x));
      const posY = Math.max(0, Math.min(100, y));

      if (draggingIdx === 'cover') {
        setEditedPost(prev => ({ ...prev, imagePosX: posX, imagePosY: posY }));
      } else {
        setEditedPost(prev => {
          const newImgs = [...(prev.additionalImages || [])];
          const current = newImgs[draggingIdx];
          if (typeof current === 'object') {
             newImgs[draggingIdx] = { ...current, posX, posY };
          }
          return { ...prev, additionalImages: newImgs };
        });
      }
    };

    const handleMouseUp = () => setDraggingIdx(null);

    if (draggingIdx !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingIdx]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    onUpdatePost(editedPost);
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 3000);
  };

  return (
    <div className="animate-fade-in bg-white dark:bg-slate-950 min-h-screen pt-24 pb-24 transition-colors duration-500">
      {showSavedMsg && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[50000] bg-[#1BA19A] text-white px-8 py-3 shadow-xl flex items-center gap-3 rounded-full animate-fade-in-up">
          <CheckCircle className="h-4 w-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Atualizado com sucesso</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 mb-12 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-[#1BA19A] font-bold text-[10px] uppercase tracking-widest transition-all">
          <ChevronLeft className="h-4 w-4" /> Voltar para o acervo
        </button>

        {isAdmin && (
          <div className="flex gap-2">
             <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-6 py-2 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-[9px] font-bold uppercase tracking-widest hover:bg-[#1BA19A] hover:text-white transition-all rounded">
               <Edit2 className="h-3.5 w-3.5" /> Editar Registro
             </button>
             <button 
                onClick={() => {
                  console.log('[DEBUG-CLICK] Botão de lixeira pressionado para o Post:', post.title);
                  onDeletePost?.(post.id);
                }} 
                className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition-all"
             >
               <Trash2 className="h-4 w-4" />
             </button>
          </div>
        )}
      </div>

      <article className="max-w-6xl mx-auto px-6">
        <header className="mb-10 text-left">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#1BA19A] text-[11px] font-black uppercase tracking-[0.4em] border-l-4 border-[#1BA19A] pl-4">{post.category}</span>
            <span className="text-slate-300 text-[11px] font-bold uppercase tracking-widest">/ {post.date}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-white tracking-tighter leading-[1.1] uppercase max-w-5xl">
            {post.title}
          </h1>
        </header>

        <div className="w-full aspect-[21/9] mb-20 rounded-xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800">
          <img 
            src={post.imageUrl} 
            className="w-full h-full object-cover" 
            style={{ objectPosition: `${post.imagePosX ?? 50}% ${post.imagePosY ?? 50}%` }}
            alt="Documentação Técnica" 
          />
        </div>

        <div className="space-y-16">
          <div 
            className="prose prose-xl md:prose-2xl dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 font-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || "" }}
          />

          {post.additionalImages && post.additionalImages.length > 0 && (
            <section className="pt-20 border-t border-slate-100 dark:border-slate-900">
              <div className="flex items-center gap-6 mb-12">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em] whitespace-nowrap">Anexos Técnicos</h4>
                <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {post.additionalImages.map((img, idx) => {
                  const isObj = typeof img === 'object';
                  const url = isObj ? img.url : img;
                  const px = isObj ? img.posX : 50;
                  const py = isObj ? img.posY : 50;
                  return (
                    <div key={idx} className="aspect-video rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg group">
                      <img 
                        src={url} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                        style={{ objectPosition: `${px}% ${py}%` }}
                        alt={`Anexo Técnico ${idx}`} 
                      />
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <footer className="pt-16 flex items-center justify-between border-t border-slate-100 dark:border-slate-900">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                <Clock className="h-4 w-4 text-[#1BA19A]" />
                Tempo de leitura: {post.readTime}
              </div>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
              <div className="hidden md:flex items-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-widest">
                <Calendar className="h-4 w-4 text-[#1BA19A]" />
                Registro: #{post.id}
              </div>
            </div>
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-5 py-2 text-slate-400 hover:text-[#1BA19A] transition-colors text-[10px] font-black uppercase tracking-widest">
                 <Share2 className="h-4 w-4" /> Compartilhar
               </button>
            </div>
          </footer>
        </div>
      </article>

      {isEditing && (
        <div className="fixed inset-0 z-[60000] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl p-10 md:p-14 my-10 shadow-2xl relative border border-slate-100 dark:border-slate-800 rounded-3xl">
            <button onClick={() => setIsEditing(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
              <X className="h-7 w-7" />
            </button>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-10 border-b border-slate-100 dark:border-slate-800 pb-4">Ajustar Registro Técnico</h2>
            
            <form onSubmit={handleSave} className="space-y-10">
              <div>
                <label className="block text-[10px] font-black text-[#1BA19A] uppercase tracking-widest mb-3">Título do Artigo</label>
                <input type="text" value={editedPost.title} onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-[#1BA19A] text-slate-950 dark:text-white font-medium" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <label className="block text-[10px] font-black text-[#1BA19A] uppercase tracking-widest">Imagem de Capa</label>
                    {editedPost.imageUrl && <span className="text-[8px] text-slate-400 font-bold uppercase flex items-center gap-1"><Move className="h-2.5 w-2.5" /> Arraste na imagem</span>}
                  </div>
                  <div 
                    ref={coverRef}
                    onMouseDown={() => handleMouseDown('cover')}
                    className={`relative aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border-2 border-dashed border-slate-200 dark:border-slate-700 transition-all ${editedPost.imageUrl ? 'cursor-move' : 'cursor-pointer'}`}
                  >
                    {editedPost.imageUrl ? (
                      <>
                        <img 
                          src={editedPost.imageUrl} 
                          className="w-full h-full object-cover pointer-events-none select-none" 
                          style={{ objectPosition: `${editedPost.imagePosX}% ${editedPost.imagePosY}%` }}
                          alt="Preview" 
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                          <label className="pointer-events-auto cursor-pointer p-3 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg hover:scale-110 transition-transform">
                            <Upload className="h-4 w-4 text-[#1BA19A]" />
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="hidden" />
                          </label>
                        </div>
                      </>
                    ) : (
                      <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                        <ImageIcon className="h-6 w-6 text-[#1BA19A] mb-2" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase">Selecionar</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#1BA19A] uppercase tracking-widest mb-3">Documento Word</label>
                  <label className="aspect-video bg-slate-100 dark:bg-slate-800 flex items-center justify-center rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border-2 border-dashed border-slate-200 dark:border-slate-700">
                    {isProcessing ? <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#1BA19A] border-t-transparent"></div> : <Upload className="h-6 w-6 text-[#1BA19A]" />}
                    <input type="file" accept=".docx" onChange={handleWordImport} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#1BA19A] uppercase tracking-widest mb-5">Anexos Técnicos (Drag para posicionar)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(editedPost.additionalImages || []).map((img, idx) => {
                    const isObj = typeof img === 'object';
                    const url = isObj ? img.url : img;
                    const px = isObj ? img.posX : 50;
                    const py = isObj ? img.posY : 50;
                    return (
                      <div 
                        key={idx} 
                        ref={el => dragContainerRefs.current[idx] = el}
                        onMouseDown={() => handleMouseDown(idx)}
                        className="relative aspect-square bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 cursor-move group"
                      >
                        <img 
                          src={url} 
                          className="w-full h-full object-cover pointer-events-none select-none" 
                          style={{ objectPosition: `${px}% ${py}%` }}
                          alt="" 
                        />
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeAdditionalImage(idx); }}
                          className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[7px] text-white font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                          Posicionar
                        </div>
                      </div>
                    );
                  })}
                  <label className="aspect-square bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center rounded-xl cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border-2 border-dashed border-slate-200 dark:border-slate-700">
                    <Plus className="h-5 w-5 text-[#1BA19A] mb-1" />
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Novo Anexo</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, false)} className="hidden" />
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full py-5 bg-[#1BA19A] text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-xl shadow-xl hover:bg-slate-900 transition-all active:scale-[0.98]">
                Salvar Todas as Alterações
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostView;
