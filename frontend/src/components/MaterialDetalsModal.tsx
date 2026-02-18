import type { RawMaterial } from "../types";

interface MaterialDetailsModalProps {
  item: RawMaterial;
  onClose: () => void;
  onEdit: () => void;
  onDelete: (id: number) => void;
}

export const MaterialDetailsModal = ({ item, onClose, onEdit, onDelete }: MaterialDetailsModalProps) => {
  
  const handleDeleteConfirm = () => {
    if (window.confirm(`Deseja excluir a matéria-prima "${item.name}"? Isso pode afetar composições existentes.`)) {
      onDelete(item.id!);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border-t-8 border-primary">
        <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estoque de Insumo</span>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">✕</button>
        </div>
        
        <div className="p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            🏗️
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">{item.name}</h3>
          <p className="text-slate-500 font-medium mb-6">SKU: {item.code}</p>
          
          <div className="bg-primary/10 rounded-xl p-4 mb-8">
            <p className="text-xs text-primary uppercase font-bold mb-1">Quantidade em Estoque</p>
            <p className="text-3xl font-black text-primary">
              {item.stockQuantity} <span className="text-lg font-normal">un.</span>
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-50 text-amber-600 font-bold rounded-xl hover:bg-amber-100 transition-all active:scale-95"
            >
              <span>✏️</span> Editar
            </button>
            <button 
              onClick={handleDeleteConfirm}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all active:scale-95"
            >
              <span>🗑️</span> Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};