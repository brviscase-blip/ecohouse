
import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Image as ImageIcon, Clock, 
  Check, Trash2, FileText, Upload,
  AlertCircle, FileCheck, Type, ChevronDown, Plus
} from 'lucide-react';
import { BlogPost } from '../types';

const MAMMOTH_URL = "https://esm.sh/mammoth@1.6.0";
const CATEGORIES = ['Casas Construídas', 'Inovação', 'Certificações', 'Diário de Obra'];

interface EditorViewProps {
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const EditorView: React.FC<EditorViewProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [category, setCategory] = useState('Inovação');
  const [extractedHtml, setExtractedHtml] = useState<string>('');
  const [wordFileName, setWordFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [readTime, setReadTime] = useState('1 min');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
        } else {
          setAdditionalImages(prev => [...prev, base64]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const isFormIncomplete = !title.trim() || !imageUrl || !extractedHtml || isProcessing;

  return (
    <div className="fixed inset-0 z-[50000] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg p-10 my-8 shadow-2xl relative border border-emerald-500/20 transition-colors duration-300">
        <button 
          onClick={onCancel} 
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mb-4 transition-colors">
            <Type className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tighter">Novo Registro</h2>
          <p className="text-gray-500 dark:text-gray-300 text-sm font-light mt-2">Publique novos artigos e documentos técnicos.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Título do Registro</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white border-b-2 border-transparent focus:border-emerald-500 outline-none transition-all font-medium placeholder:text-gray-400 dark:placeholder:text-slate-500"
              placeholder="Digite o título do artigo"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Imagem de Capa</label>
              <div className="relative aspect-square bg-gray-50 dark:bg-slate-800 border-2 border-dashed border-emerald-500/20 hover:border-emerald-500/50 transition-all flex flex-col items-center justify-center overflow-hidden group">
                {imageUrl ? (
                  <>
                    <img src={imageUrl} className="w-full h-full object-cover" alt="Preview" />
                    <button onClick={() => setImageUrl('')} className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Trash2 className="h-6 w-6 text-white" />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center p-2 text-center w-full h-full justify-center">
                    <ImageIcon className="h-6 w-6 text-emerald-600 mb-2" />
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Selecionar</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Documento (.docx)</label>
              <div className={`aspect-square transition-all flex flex-col items-center justify-center border-2 border-dashed ${wordFileName ? 'bg-emerald-600 border-emerald-600' : 'bg-gray-50 dark:bg-slate-800 border-emerald-500/20 hover:border-emerald-500/50'}`}>
                {isProcessing ? (
                  <div className="h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                ) : wordFileName ? (
                  <div className="text-center p-2">
                    <FileCheck className="h-6 w-6 text-white mx-auto mb-2" />
                    <p className="text-[8px] font-bold text-white uppercase truncate px-2">{wordFileName}</p>
                    <label htmlFor="replace-word" className="text-[7px] font-bold bg-white text-emerald-600 px-2 py-1 rounded-full mt-2 inline-block cursor-pointer">Trocar</label>
                    <input type="file" accept=".docx" onChange={handleWordImport} className="hidden" id="replace-word" />
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center p-2 text-center w-full h-full justify-center">
                    <FileText className="h-6 w-6 text-emerald-600 mb-2" />
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Anexar</span>
                    <input type="file" accept=".docx" onChange={handleWordImport} className="hidden" />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Galeria de Imagens Adicionais */}
          <div>
            <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Galeria de Fotos (Opcional)</label>
            <div className="grid grid-cols-4 gap-2">
              {additionalImages.map((img, idx) => (
                <div key={idx} className="relative aspect-square group rounded overflow-hidden">
                  <img src={img} className="w-full h-full object-cover" alt="" />
                  <button 
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

          <div className="relative" ref={dropdownRef}>
            <label className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Categoria</label>
            <button 
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-slate-800 text-slate-900 dark:text-white border-b-2 border-transparent hover:border-emerald-500 outline-none transition-all font-medium"
            >
              <span className="text-sm">{category}</span>
              <ChevronDown className={`h-4 w-4 text-emerald-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-slate-900 border border-emerald-500/20 shadow-2xl z-[70] animate-dropdown">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategory(cat);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-widest transition-all ${category === cat ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-slate-800">
             <div className="flex items-center gap-2 text-slate-400">
               <Clock className="h-4 w-4" />
               <span className="text-[10px] font-bold uppercase tracking-widest">{readTime} de leitura</span>
             </div>
             {isFormIncomplete && (
               <span className="text-[8px] font-bold text-red-500 uppercase flex items-center gap-1">
                 <AlertCircle className="h-3 w-3" /> Preencha tudo
               </span>
             )}
          </div>

          <button 
            onClick={() => onSave({
              id: Date.now(),
              date: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date()),
              title: title.toUpperCase(),
              category,
              excerpt: extractedHtml.replace(/<[^>]*>?/gm, '').substring(0, 160).trim() + '...',
              content: extractedHtml,
              readTime,
              imageUrl,
              additionalImages
            })}
            disabled={isFormIncomplete}
            className={`w-full py-4 text-xs font-bold uppercase tracking-[0.3em] transition-all shadow-lg ${isFormIncomplete ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-950 dark:bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'}`}
          >
            Publicar Registro
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dropdownScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-dropdown { animation: dropdownScale 0.2s ease-out forwards; transform-origin: top; }
      `}</style>
    </div>
  );
};

export default EditorView;
