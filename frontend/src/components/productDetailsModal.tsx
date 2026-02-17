import type { Product } from "../types";

interface DetailsModalProps {
  item: Product;
  onClose: () => void;
  onEdit: () => void;
  onDelete: (id: number) => void;
}

export const DetailsModal = ({ item, onClose, onEdit, onDelete }: DetailsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="p-6 bg-slate-50 border-b flex justify-between items-center">
          <h2 className="font-bold text-slate-800">Detalhes do Registro</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        
        <div className="p-8 text-center">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-2xl font-bold text-slate-900">{item.name}</h3>
          <p className="text-slate-500 mb-6">Código: {item.code}</p>
          
          <div className="bg-blue-50 p-4 rounded-xl mb-8">
            <span className="text-blue-600 font-bold text-2xl">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.value)}
            </span>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-100 text-amber-700 font-bold rounded-xl hover:bg-amber-200 transition-colors"
            >
              ✏️ Editar
            </button>
            <button 
              onClick={() => {
                if(window.confirm("Deseja realmente excluir este item?")) {
                  onDelete(item.id!);
                  onClose();
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-colors"
            >
              🗑️ Apagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};