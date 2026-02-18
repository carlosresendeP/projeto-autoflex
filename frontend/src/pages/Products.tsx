import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { fetchProducts, deleteProduct } from "../store/productSlice"; // Adicione deleteProduct
import { Card } from "../components/Card";
import { ProductForm } from "../components/ProductForm";
import { DetailsModal } from "../components/productDetailsModal"; // Vamos criar este
import type { Product } from "../types";
import { toast } from "react-toastify";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.product);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Function to open form in create mode
  const handleNewProduct = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  // Function to open details when clicking on the card
  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
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
            Gestão de Produtos
          </h1>
          <p className="text-slate-500">
            Cadastre e gerencie os itens finais da AutoFlex
          </p>
        </div>
        <button
          onClick={handleNewProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition-transform active:scale-95"
        >
          + Novo Produto
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse text-center p-10 text-slate-500">
          Carregando produtos...
        </div>
      ) : list.length === 0 ? (
        <div className="text-center p-10 text-slate-500">
          Nenhum produto encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((product) => (
            <div
              key={product.id}
              onClick={() => handleCardClick(product)}
              className="cursor-pointer"
            >
              <Card
                title={product.name}
                subtitle={`Cód: ${product.code}`}
                value={new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.value)}
              />
            </div>
          ))}
        </div>
      )}

      {isDetailsOpen && selectedProduct && (
        <DetailsModal
          item={selectedProduct}
          onClose={() => setIsDetailsOpen(false)}
          onEdit={handleEditFromDetails}
          onDelete={async (id) => {
            try {
              await dispatch(deleteProduct(id)).unwrap();
              toast.success("Produto excluído com sucesso!");
              setIsDetailsOpen(false);
            } catch (error) {
              console.error(error);
              toast.error("Erro ao excluir produto.");
            }
          }}
        />
      )}

      {isFormOpen && (
        <ProductForm
          initialData={selectedProduct || undefined}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default Products;
