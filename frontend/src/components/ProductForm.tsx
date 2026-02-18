import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../store/hooks";
import { addProduct, editProduct } from "../store/productSlice";
import { toast } from "react-toastify";
import {
  productSchema,
  type ProductFormData,
  type ProductFormInput,
} from "../schemas/productSchema";
import type { Product } from "../types";

interface ProductFormProps {
  onClose: () => void;
  initialData?: Product;
}

export const ProductForm = ({ onClose, initialData }: ProductFormProps) => {
  const dispatch = useAppDispatch();
  const isEditing = !!initialData;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: isEditing
      ? {
          code: initialData.code,
          name: initialData.name,
          value: initialData.value,
        }
      : {
          code: "",
          name: "",
          value: 0,
        },
  });

  const handleSave = async (data: ProductFormData) => {
    try {
      if (!isEditing) {
        await dispatch(addProduct(data)).unwrap();
        toast.success("Produto cadastrado com sucesso!");
      } else {
        await dispatch(editProduct({ ...initialData, ...data })).unwrap();
        toast.success("Produto atualizado com sucesso!");
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      toast.error("Erro ao salvar. Verifique se o código já existe.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-600 p-6">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? "Editar Produto" : "Cadastrar Novo Produto"}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(
            handleSave as unknown as SubmitHandler<ProductFormInput>,
          )}
          className="p-6 space-y-4"
        >
          <div>
            <label className="text-sm font-bold text-slate-700">
              Código do Produto
            </label>
            <input
              {...register("code")}
              className={`w-full mt-1 p-3 border rounded-lg transition-all outline-none focus:ring-2 ${errors.code ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100"}`}
            />
            {errors.code && (
              <p className="text-red-500 text-xs mt-1">{errors.code.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">Nome</label>
            <input
              {...register("name")}
              className={`w-full mt-1 p-3 border rounded-lg transition-all outline-none focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100"}`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">
              Preço (R$)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("value")}
              className={`w-full mt-1 p-3 border rounded-lg transition-all outline-none focus:ring-2 ${errors.value ? "border-red-500 focus:ring-red-100" : "border-slate-200 focus:ring-blue-100"}`}
            />
            {errors.value && (
              <p className="text-red-500 text-xs mt-1">
                {errors.value.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Enviando..." : "Salvar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
