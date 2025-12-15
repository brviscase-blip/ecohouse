
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
    <div className="animate-fade-in bg-white dark:bg-slate-950 min-h-screen pt-32 pb-20 relative transition-colors duration-500">
      {showSavedMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[50000] bg-emerald-600 text-white px-8 py-3 shadow-2xl flex items-center gap-3 animate-fade-in-up rounded-full">
          <CheckCircle className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Sincronizado</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-8">
        <button onClick={onBack} className="flex items-center gap-4 text-slate-400 hover:text-emerald-600 font-bold text-[11px] uppercase tracking-[0.4em] mb-16 transition-all group">
          <ChevronLeft className="h-5 w-5" /> <span>Voltar para a Listagem</span>
        </button>

        <div className="space-y-8 mb-16">
          <div className="flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="text-emerald-600">{post.category}</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {post.readTime}</span>
          </div>
          
          <div className="flex justify-between items-end gap-12">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-950 dark:text-white tracking-tighter leading-tight uppercase">{post.title}</h2>
            {isAdmin && (
              <button onClick={() => setIsEditing(true)} className="p-4 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl transition-all shadow-sm border border-emerald-500/10">
                <Edit2 className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>

        {/* Capa com Texto Overlay */}
        <div className="relative aspect-[21/9] mb-20 overflow-hidden rounded-3xl shadow-xl border border-gray-100 dark:border-slate-900 group">
          <img src={post.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="" />
          
          {/* Overlay Tipográfico */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
            <div className="flex flex-col gap-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-[9px] md:text-[10px] font-bold text-emerald-400 uppercase tracking-[0.5em] mb-1 drop-shadow-md">
                Construções Sustentáveis
              </span>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-white/50"></div>
                <span className="text-[10px] md:text-xs font-medium text-white/90 uppercase tracking-[0.4em]">
                  Registro Técnico #{post.id}
                </span>
              </div>
            </div>
          </div>
          
          <div className="absolute top-8 right-8 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <Zap className="h-4 w-4 text-emerald-400" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-20">
          <div 
            className="prose prose-xl dark:prose-invert text-slate-900 dark:text-emerald-50 leading-relaxed font-normal mb-20"
            dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || "" }}
          />

          {/* Galeria de Exibição com Overlay */}
          {post.additionalImages && post.additionalImages.length > 0 && (
            <div className="mt-20 pt-20 border-t border-gray-100 dark:border-slate-800">
              <h4 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.4em] mb-10">Galeria de Fotos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {post.additionalImages.map((img, idx) => (
                  <div key={idx} className="relative aspect-square overflow-hidden rounded-2xl shadow-lg border border-gray-100 dark:border-slate-900 group">
                    <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt={`Gallery ${idx}`} />
                    
                    {/* Overlay de Detalhe na Galeria */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                    <div className="absolute bottom-6 left-6 flex items-center gap-2">
                       <div className="px-3 py-1.5 bg-emerald-600/90 backdrop-blur-sm text-white text-[8px] font-bold uppercase tracking-widest rounded-sm">
                         Detalhe {idx + 1}
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
