import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../store/hooks";
import { addMaterial } from "../store/materialSlice";
import { materialSchema, type MaterialFormData, type MaterialFormInput } from "../schemas/materialSchema";
import type { RawMaterial } from "../types";

interface MaterialFormProps {
  onClose: () => void;
  initialData?: RawMaterial;
}

export const MaterialForm = ({ onClose, initialData }: MaterialFormProps) => {
  const dispatch = useAppDispatch();
  const isEditing = !!initialData;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MaterialFormInput, MaterialFormData>({
    resolver: zodResolver(materialSchema),
    defaultValues: isEditing
      ? {
          code: initialData.code,
          name: initialData.name,
          stockQuantity: initialData.stockQuantity,
        }
      : {
          code: "",
          name: "",
          stockQuantity: 0,
        },
  });

  const handleSave = async (data: MaterialFormData) => {
    try {
      await dispatch(addMaterial(data)).unwrap();
      onClose();
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar matéria-prima.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-emerald-600 p-6">
          <h2 className="text-xl font-bold text-white">{isEditing ? "Editar Matéria-Prima" : "Nova Matéria-Prima"}</h2>
        </div>

        <form onSubmit={handleSubmit(handleSave as unknown as SubmitHandler<MaterialFormInput>)} className="p-6 space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-700">Código</label>
            <input {...register("code")} className="w-full mt-1 p-3 border rounded-lg border-slate-200 outline-none focus:ring-2 focus:ring-emerald-100" />
            {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>}
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">Nome do Material</label>
            <input {...register("name")} className="w-full mt-1 p-3 border rounded-lg border-slate-200 outline-none focus:ring-2 focus:ring-emerald-100" />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">Estoque Inicial</label>
            <input type="number" {...register("stockQuantity")} className="w-full mt-1 p-3 border rounded-lg border-slate-200 outline-none focus:ring-2 focus:ring-emerald-100" />
            {errors.stockQuantity && <p className="text-red-500 text-xs mt-1">{errors.stockQuantity.message}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl">Cancelar</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 disabled:opacity-50">
              {isSubmitting ? "Enviando..." : "Salvar Material"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};