import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchProducts, deleteProduct } from '../store/productSlice'; // Adicione deleteProduct
import { Card } from '../components/Card';
import { ProductForm } from '../components/ProductForm';
import { DetailsModal } from '../components/productDetailsModal'; // Vamos criar este
import type { Product } from '../types';

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.product);
  
  // Estados para controle de fluxo
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Função para abrir o formulário em modo de criação
  const handleNewProduct = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  }

  // Função para abrir detalhes ao clicar no card
  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
  }

  // Função para acionar a edição a partir dos detalhes
  const handleEditFromDetails = () => {
    setIsDetailsOpen(false);
    setIsFormOpen(true);
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Gestão de Produtos</h1>
          <p className="text-slate-500">Cadastre e gerencie os itens finais da AutoFlex</p>
        </div>
        <button 
          onClick={handleNewProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg transition-transform active:scale-95">
          + Novo Produto
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse text-center p-10">Carregando produtos...</div>
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
                value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.value)}
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
          onDelete={(id) => dispatch(deleteProduct(id))}
        />
      )}

      {/* Formulário (Reutilizado para Criar e Editar) */}
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