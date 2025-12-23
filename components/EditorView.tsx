
import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Image as ImageIcon, Clock, 
  Trash2, FileText, Upload,
  AlertCircle, FileCheck, Type, ChevronDown, Plus, Move
} from 'lucide-react';
import { BlogPost, PostImage } from '../types';

const MAMMOTH_URL = "https://esm.sh/mammoth@1.6.0";
const CATEGORIES = ['Casas Construídas', 'Inovação', 'Certificações', 'Diário de Obra'];

interface EditorViewProps {
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const EditorView: React.FC<EditorViewProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imagePosX, setImagePosX] = useState(50);
  const [imagePosY, setImagePosY] = useState(50);
  const [additionalImages, setAdditionalImages] = useState<PostImage[]>([]);
  const [category, setCategory] = useState('Inovação');
  const [extractedHtml, setExtractedHtml] = useState<string>('');
  const [wordFileName, setWordFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [readTime, setReadTime] = useState('1 min');
  
  // Controle de Arraste
  const [draggingIdx, setDraggingIdx] = useState<number | 'cover' | null>(null);
  const dragContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coverRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
        setExtractedHtml(result.value);
        const text = result.value.replace(/<[^>]*>?/gm, '');
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.max(1, Math.ceil(words / 225));
        setReadTime(`${minutes} min`);
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
          setImageUrl(base64);
          setImagePosX(50);
          setImagePosY(50);
        } else {
          setAdditionalImages(prev => [...prev, { url: base64, posX: 50, posY: 50 }]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (idx: number | 'cover') => {
    if (idx === 'cover' && !imageUrl) return;
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
        setImagePosX(posX);
        setImagePosY(posY);
      } else {
        setAdditionalImages(prev => {
          const newImgs = [...prev];
          newImgs[draggingIdx] = { ...newImgs[draggingIdx], posX, posY };
          return newImgs;
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

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleFinalPublish = () => {
    const postData: BlogPost = {
      id: Date.now(),
      date: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date()),
      title: title.toUpperCase(),
      category,
      excerpt: extractedHtml.replace(/<[^>]*>?/gm, '').substring(0, 160).trim() + '...',
      content: extractedHtml,
      readTime,
      imageUrl,
      imagePosX,
      imagePosY,
      additionalImages
    };
    onSave(postData);
  };

  const isFormIncomplete = !title.trim() || !imageUrl || !extractedHtml || isProcessing;

  return (
    <div className="fixed inset-0 z-[50000] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl p-10 md:p-14 my-8 shadow-2xl relative border border-emerald-500/20 transition-colors duration-300 rounded-3xl">
        <button onClick={onCancel} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <X className="h-7 w-7" />
        </button>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-10 border-b border-emerald-500/20 pb-4">Novo Registro Técnico</h2>

        <div className="space-y-8">
          <div>
            <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Título do Registro</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white border-none focus:ring-2 focus:ring-emerald-500 outline-none rounded-xl font-medium"
              placeholder="Ex: Documentação Residencial Alphaville"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Capa</label>
                {imageUrl && <Move className="h-3 w-3 text-slate-400" />}
              </div>
              <div 
                ref={coverRef}
                onMouseDown={() => handleMouseDown('cover')}
                className={`relative aspect-video bg-gray-50 dark:bg-slate-800 border-2 border-dashed border-emerald-500/20 rounded-2xl flex flex-col items-center justify-center overflow-hidden group ${imageUrl ? 'cursor-move' : ''}`}
              >
                {imageUrl ? (
                  <>
                    <img 
                      src={imageUrl} 
                      className="w-full h-full object-cover pointer-events-none select-none" 
                      style={{ objectPosition: `${imagePosX}% ${imagePosY}%` }}
                      alt="" 
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 flex items-center justify-center pointer-events-none transition-colors">
                       <label className="pointer-events-auto cursor-pointer p-2.5 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg">
                          <Plus className="h-4 w-4 text-emerald-600" />
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="hidden" />
                       </label>
                    </div>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center p-4 text-center">
                    <ImageIcon className="h-6 w-6 text-emerald-600 mb-2" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Upload Capa</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Artigo (.docx)</label>
              <div className={`aspect-video transition-all flex flex-col items-center justify-center border-2 border-dashed rounded-2xl ${wordFileName ? 'bg-emerald-600 border-emerald-600' : 'bg-gray-50 dark:bg-slate-800 border-emerald-500/20'}`}>
                {isProcessing ? (
                  <div className="h-7 w-7 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                ) : wordFileName ? (
                  <div className="text-center p-4">
                    <FileCheck className="h-8 w-8 text-white mx-auto mb-2" />
                    <p className="text-[9px] font-bold text-white uppercase truncate px-2 mb-2">{wordFileName}</p>
                    <label htmlFor="replace-word-new" className="text-[8px] font-black bg-white text-emerald-600 px-4 py-1.5 rounded-full cursor-pointer uppercase">Trocar</label>
                    <input type="file" accept=".docx" onChange={handleWordImport} className="hidden" id="replace-word-new" />
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center p-4 text-center">
                    <FileText className="h-6 w-6 text-emerald-600 mb-2" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Importar Word</span>
                    <input type="file" accept=".docx" onChange={handleWordImport} className="hidden" />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4">Galeria de Anexos (Clique e arraste para enquadrar)</label>
            <div className="grid grid-cols-4 gap-3">
              {additionalImages.map((img, idx) => (
                <div 
                  key={idx} 
                  ref={el => dragContainerRefs.current[idx] = el}
                  onMouseDown={() => handleMouseDown(idx)}
                  className="relative aspect-square bg-gray-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group cursor-move"
                >
                  <img src={img.url} className="w-full h-full object-cover pointer-events-none select-none" style={{ objectPosition: `${img.posX}% ${img.posY}%` }} alt="" />
                  <button onClick={(e) => { e.stopPropagation(); removeAdditionalImage(idx); }} className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <label className="aspect-square bg-gray-50 dark:bg-slate-800 border-2 border-dashed border-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center justify-center cursor-pointer rounded-xl">
                <Plus className="h-5 w-5 text-emerald-600" />
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, false)} className="hidden" />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between py-6 border-t border-gray-100 dark:border-slate-800">
             <div className="flex items-center gap-3 text-slate-400">
               <Clock className="h-4 w-4 text-emerald-500" />
               <span className="text-[10px] font-black uppercase tracking-widest">{readTime} de leitura prevista</span>
             </div>
             {isFormIncomplete && (
               <span className="text-[9px] font-black text-red-500 uppercase flex items-center gap-2">
                 <AlertCircle className="h-4 w-4" /> Dados Pendentes
               </span>
             )}
          </div>

          <button 
            onClick={handleFinalPublish}
            disabled={isFormIncomplete}
            className={`w-full py-5 text-[11px] font-black uppercase tracking-[0.4em] transition-all shadow-xl rounded-xl ${isFormIncomplete ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-950 dark:bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'}`}
          >
            Publicar Registro Técnico
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorView;
