import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addComposition } from "../store/compositionSlice";
import { fetchProducts } from "../store/productSlice"; 
import { fetchMaterials } from "../store/materialSlice"; 
import { compositionSchema, type CompositionFormData, type CompositionFormInput } from "../schemas/compositionSchema";

export const CompositionForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  
  // Buscamos as listas da Store
  const { list: products } = useAppSelector((state) => state.product);
  const { list: materials } = useAppSelector((state) => state.materials);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchMaterials());
  }, [dispatch]);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CompositionFormInput, CompositionFormData>({
    resolver: zodResolver(compositionSchema),
  });

  const handleSave = async (data: CompositionFormData) => {
    try {
      await dispatch(addComposition(data)).unwrap();
      onClose();
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar composição. Verifique se essa combinação já existe.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 text-slate-900">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-indigo-600 p-6">
          <h2 className="text-xl font-bold text-white">Vincular Material ao Produto</h2>
        </div>

        <form onSubmit={handleSubmit(handleSave as unknown as SubmitHandler<CompositionFormInput>)} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-700">Produto Final</label>
            <select 
              {...register("productId")} 
              className="w-full mt-1 p-3 border rounded-lg border-slate-200 outline-none focus:ring-2 focus:ring-indigo-100 bg-white"
            >
              <option value="">Selecione um produto...</option>
              {/* Agora o products.map vai funcionar porque o useEffect trouxe os dados */}
              {products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.code})</option>)}
            </select>
            {errors.productId && <p className="text-red-500 text-xs mt-1">{errors.productId.message}</p>}
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">Matéria-Prima Necessária</label>
            <select 
              {...register("rawMaterialId")} 
              className="w-full mt-1 p-3 border rounded-lg border-slate-200 outline-none focus:ring-2 focus:ring-indigo-100 bg-white"
            >
              <option value="">Selecione um material...</option>
              {materials.map(m => <option key={m.id} value={m.id}>{m.name} ({m.code})</option>)}
            </select>
            {errors.rawMaterialId && <p className="text-red-500 text-xs mt-1">{errors.rawMaterialId.message}</p>}
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">Quantidade por Unidade</label>
            <input 
              type="number" 
              step="0.01" 
              {...register("quantityRequired")} 
              className="w-full mt-1 p-3 border rounded-lg border-slate-200 outline-none focus:ring-2 focus:ring-indigo-100" 
              placeholder="Ex: 5.0"
            />
            {errors.quantityRequired && <p className="text-red-500 text-xs mt-1">{errors.quantityRequired.message}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors">Cancelar</button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg disabled:opacity-50 transition-all active:scale-95"
            >
              {isSubmitting ? "Vinculando..." : "Salvar Composição"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};