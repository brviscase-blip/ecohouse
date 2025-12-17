import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Calendar, Clock, Edit2, X, Save, Image as ImageIcon, CheckCircle, FileText, Upload, FileCheck, AlertCircle, ChevronDown, Trash2, Plus, Zap } from 'lucide-react';
import { BlogPost } from '../types';

const MAMMOTH_URL = "https://esm.sh/mammoth@1.6.0";
const CATEGORIES = ['Casas Construídas', 'Inovação', 'Certificações', 'Diário de Obra'];

interface PostViewProps {
  post: BlogPost;
  onBack: () => void;
  isAdmin: boolean;
  onUpdatePost: (updated: BlogPost) => void;
}

const PostView: React.FC<PostViewProps> = ({ post, onBack, isAdmin, onUpdatePost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState<BlogPost>({ ...post, additionalImages: post.additionalImages || [] });
  const [showSavedMsg, setShowSavedMsg] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [wordFileName, setWordFileName] = useState<string>('');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing) {
      setEditedPost({ ...post, additionalImages: post.additionalImages || [] });
      setWordFileName('');
    }
  }, [isEditing, post]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleWordImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setWordFileName(file.name);
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
          setEditedPost({ ...editedPost, imageUrl: base64 });
        } else {
          setEditedPost(prev => ({
            ...prev,
            additionalImages: [...(prev.additionalImages || []), base64]
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    onUpdatePost(editedPost);
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 3000);
  };

  return (
    <div className="animate-fade-in bg-white dark:bg-slate-950 min-h-screen pt-36 pb-12 relative transition-colors duration-500">
      {showSavedMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[50000] bg-emerald-600 text-white px-6 py-2.5 shadow-2xl flex items-center gap-2 animate-fade-in-up rounded-full">
          <CheckCircle className="h-4 w-4" />
          <span className="text-[9px] font-black uppercase tracking-widest">Sincronizado</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6">
        <button onClick={onBack} className="flex items-center gap-3 text-slate-400 hover:text-emerald-600 font-bold text-[9px] uppercase tracking-[0.4em] mb-12 transition-all group">
          <ChevronLeft className="h-4 w-4" /> <span>Voltar para a Listagem</span>
        </button>

        <div className="space-y-5 mb-10">
          <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="text-emerald-600">{post.category}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
          </div>
          
          <div className="flex justify-between items-end gap-8">
            <h2 className="text-2xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tighter leading-tight uppercase max-w-2xl">{post.title}</h2>
            {isAdmin && (
              <button onClick={() => setIsEditing(true)} className="p-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg transition-all border border-emerald-500/10">
                <Edit2 className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Capa Compactada (21/7 aspect ratio) */}
        <div className="relative aspect-[21/7] mb-12 overflow-hidden rounded-2xl shadow-lg border border-gray-100 dark:border-slate-900 group">
          <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
            <div className="flex flex-col gap-0.5 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-[0.4em] mb-0.5 drop-shadow-md">
                Construções Sustentáveis
              </span>
              <div className="flex items-center gap-2">
                <div className="h-px w-6 bg-white/40"></div>
                <span className="text-[8px] font-medium text-white/90 uppercase tracking-[0.3em]">
                  Registro Técnico #{post.id}
                </span>
              </div>
            </div>
          </div>
          
          <div className="absolute top-6 right-6 p-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <Zap className="h-3.5 w-3.5 text-emerald-400" />
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div 
            className="prose prose-base dark:prose-invert text-slate-800 dark:text-emerald-50/90 leading-relaxed font-normal mb-16"
            dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || "" }}
          />

          {/* Galeria Compacta */}
          {post.additionalImages && post.additionalImages.length > 0 && (
            <div className="mt-12 pt-12 border-t border-gray-100 dark:border-slate-800">
              <h4 className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] mb-8">Anexos Fotográficos</h4>
              <div className="grid grid-cols-2 gap-5">
                {post.additionalImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-square overflow-hidden rounded-xl shadow-md border border-gray-100 dark:border-slate-900 group">
                    <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt={`Gallery ${idx}`} />
                    <div className="absolute bottom-4 left-4">
                       <div className="px-2 py-1 bg-emerald-600/90 backdrop-blur-sm text-white text-[7px] font-bold uppercase tracking-widest rounded-sm">
                         Det {idx + 1}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-[60000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg p-10 my-8 shadow-2xl relative border border-emerald-500/20 transition-colors duration-300">
            <button onClick={() => setIsEditing(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-10">
              <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mb-4 transition-colors">
                <Edit2 className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Editar Registro</h2>
              <p className="text-gray-500 dark:text-gray-300 text-sm font-light mt-2">Atualize as informações do seu registro técnico.</p>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Título do Registro</label>
                <input 
                  type="text" 
                  value={editedPost.title} 
                  onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })} 
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white border-b-2 border-transparent focus:border-emerald-500 outline-none transition-all font-medium"
                />
              </div>
              
              <div className="relative" ref={dropdownRef}>
                <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Categoria</label>
                <button 
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white border-b-2 border-transparent hover:border-emerald-500 outline-none transition-all font-medium text-left"
                >
                  <span className="text-sm">{editedPost.category}</span>
                  <ChevronDown className={`h-4 w-4 text-emerald-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-slate-900 border border-emerald-500/20 shadow-2xl z-[70] animate-dropdown">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setEditedPost({ ...editedPost, category: cat });
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-widest transition-all ${editedPost.category === cat ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Imagem de Capa</label>
                  <div className="relative aspect-square bg-gray-50 dark:bg-slate-800 border-2 border-dashed border-emerald-500/20 hover:border-emerald-500/50 transition-all flex flex-col items-center justify-center overflow-hidden group">
                    <img src={editedPost.imageUrl} className="w-full h-full object-cover opacity-80" alt="Preview" />
                    <label className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                      <ImageIcon className="h-6 w-6 mb-1" />
                      <span className="text-[8px] font-bold uppercase">Trocar Foto</span>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="hidden" />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Atualizar Texto (.docx)</label>
                  <div className={`aspect-square flex flex-col items-center justify-center border-2 border-dashed transition-all ${wordFileName ? 'bg-emerald-600 border-emerald-600' : 'bg-gray-50 dark:bg-slate-800 border-emerald-500/20 hover:border-emerald-500/50'}`}>
                    {isProcessing ? (
                      <div className="h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    ) : wordFileName ? (
                      <div className="text-center p-2">
                        <FileCheck className="h-6 w-6 text-white mx-auto mb-1" />
                        <p className="text-[8px] font-bold text-white uppercase truncate px-2">{wordFileName}</p>
                        <label htmlFor="replace-word-edit" className="text-[7px] font-bold bg-white text-emerald-600 px-2 py-1 rounded-full mt-1 inline-block cursor-pointer">Trocar</label>
                        <input type="file" accept=".docx" onChange={handleWordImport} className="hidden" id="replace-word-edit" />
                      </div>
                    ) : (
                      <label className="cursor-pointer flex flex-col items-center p-2 text-center w-full h-full justify-center">
                        <Upload className="h-5 w-5 text-emerald-600 mb-1" />
                        <span className="text-[8px] font-bold text-slate-400 uppercase">Substituir Arquivo</span>
                        <input type="file" accept=".docx" onChange={handleWordImport} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Gerenciamento da Galeria no Editor */}
              <div>
                <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Gerenciar Galeria</label>
                <div className="grid grid-cols-4 gap-2">
                  {editedPost.additionalImages?.map((img, idx) => (
                    <div key={idx} className="relative aspect-square group rounded overflow-hidden shadow-sm">
                      <img src={img} className="w-full h-full object-cover" alt="" />
                      <button 
                        type="button"
                        onClick={() => removeAdditionalImage(idx)}
                        className="absolute inset-0 bg-red-600/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square bg-gray-50 dark:bg-slate-800 border-2 border-dashed border-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center justify-center cursor-pointer">
                    <Plus className="h-5 w-5 text-emerald-600" />
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, false)} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{editedPost.readTime} calculados</span>
                </div>
              </div>

              <button type="submit" className="w-full bg-slate-950 dark:bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 text-xs uppercase tracking-[0.3em] transition-all shadow-lg active:scale-95">
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dropdownScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-dropdown { animation: dropdownScale 0.2s ease-out forwards; transform-origin: top; }
      `}</style>
    </div>
  );
};

export default PostView;