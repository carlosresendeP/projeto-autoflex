import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchMaterials, deleteMaterial } from "../store/materialSlice";
import { Card } from "../components/Card";
import { MaterialForm } from "../components/MaterialForm";
import { MaterialDetailsModal } from "../components/MaterialDetalsModal";
import type { RawMaterial } from "../types";
import { toast } from "react-toastify";

const Materials: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { list, loading } = useSelector((state: RootState) => state.materials);

  // Estados para controle de fluxo
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<RawMaterial | null>(
    null,
  );

  useEffect(() => {
    dispatch(fetchMaterials());
  }, [dispatch]);

  // Function to open form in create mode
  const handleNewMaterial = () => {
    setSelectedMaterial(null);
    setIsFormOpen(true);
  };

  // Function to open details when clicking on the card
  const handleCardClick = (material: RawMaterial) => {
    setSelectedMaterial(material);
    setIsDetailsOpen(true);
  };

  // Function to edit from details
  const handleEditFromDetails = () => {
    setIsDetailsOpen(false);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8 md:flex-row flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Gestão de Matérias-Primas
          </h1>
          <p className="text-slate-500">
            Controle o estoque de insumos da AutoFlex
          </p>
        </div>
        <button
          onClick={handleNewMaterial}
          className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition-transform active:scale-95"
        >
          + Novo Material
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse text-center p-10 text-slate-500">
          Carregando estoque...
        </div>
      ) : list.length === 0 ? (
        <div className="text-center p-10 text-slate-500">
          Nenhuma matéria-prima encontrada.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((material) => (
            <div
              key={material.id}
              onClick={() => handleCardClick(material)}
              className="cursor-pointer"
            >
              <Card
                title={material.name}
                subtitle={`Cód: ${material.code}`}
                value={`${material.stockQuantity} un.`}
                icon="🏗️"
              />
            </div>
          ))}
        </div>
      )}
      {isDetailsOpen && selectedMaterial && (
        <MaterialDetailsModal
          item={selectedMaterial}
          onClose={() => setIsDetailsOpen(false)}
          onEdit={handleEditFromDetails}
          onDelete={async (id) => {
            try {
              await dispatch(deleteMaterial(id)).unwrap();
              toast.success("Matéria-prima excluída com sucesso!");
              setIsDetailsOpen(false);
            } catch (error) {
              console.error(error);
              toast.error("Erro ao excluir matéria-prima.");
            }
          }}
        />
      )}

      {isFormOpen && (
        <MaterialForm
          initialData={selectedMaterial || undefined}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default Materials;
