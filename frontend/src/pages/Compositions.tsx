import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import {
  fetchCompositions,
  deleteComposition,
} from "../store/compositionSlice";
import { CompositionForm } from "../components/CompositionForm";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const Compositions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { list, loading } = useSelector(
    (state: RootState) => state.compositions,
  );

  useEffect(() => {
    dispatch(fetchCompositions());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8 md:flex-row flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Engenharia de Produtos
          </h1>
          <p className="text-slate-500">
            Defina a composição técnica de cada item
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-primary/80 shadow-md"
        >
          + Nova Composição
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse text-center p-10 text-slate-500">
          Carregando composições...
        </div>
      ) : list.length === 0 ? (
        <div className="text-center p-10 text-slate-500">
          Nenhuma composição encontrada.
        </div>
      ) : null}

      {isModalOpen && <CompositionForm onClose={() => setIsModalOpen(false)} />}

      {/* Mobile View (Cards) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {list.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-slate-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-800">{c.product.name}</h3>
                <p className="text-sm text-slate-500">{c.rawMaterial.name}</p>
              </div>
              <span className="bg-indigo-50 text-indigo-700 font-mono font-bold px-3 py-1 rounded-lg text-sm">
                {c.quantityRequired} un.
              </span>
            </div>
            <button
              onClick={async () => {
                if (window.confirm("Remover este vínculo?")) {
                  try {
                    await dispatch(deleteComposition(c.id!)).unwrap();
                    toast.success("Vínculo removido com sucesso!");
                  } catch (error) {
                    console.error(error);
                    toast.error("Erro ao remover vínculo.");
                  }
                }
              }}
              className="w-full py-2 text-red-500 font-semibold border border-red-100 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Remover Vínculo
            </button>
          </div>
        ))}
      </div>

      {/* Desktop View (Table) */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-600">Produto</th>
              <th className="p-4 font-bold text-slate-600">Material</th>
              <th className="p-4 font-bold text-slate-600 text-center">
                Necessário (un.)
              </th>
              <th className="p-4 font-bold text-slate-600 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr
                key={c.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="p-4 font-semibold text-slate-800">
                  {c.product.name}
                </td>
                <td className="p-4 text-slate-600">{c.rawMaterial.name}</td>
                <td className="p-4 text-center font-mono font-bold text-indigo-600">
                  {c.quantityRequired}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={async () => {
                      if (window.confirm("Remover este vínculo?")) {
                        try {
                          await dispatch(deleteComposition(c.id!)).unwrap();
                          toast.success("Vínculo removido com sucesso!");
                        } catch (error) {
                          console.error(error);
                          toast.error("Erro ao remover vínculo.");
                        }
                      }
                    }}
                    className="text-red-400 hover:text-red-600 p-2 cursor-pointer"
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compositions;
