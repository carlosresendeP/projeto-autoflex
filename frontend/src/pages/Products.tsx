import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { fetchProducts } from '../store/productSlice';
import { Card } from '../components/Card';
import { ProductForm } from '../components/ProductForm';

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.product);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleNewProduct = () => {
    setIsModalOpen(true);
  }

  return (
    <div className="max-w-7xl mx-auto">
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
        <div className="animate-pulse flex space-x-4">Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((product) => (
            <Card 
              key={product.id}
              title={product.name}
              subtitle={`Cód: ${product.code}`}
              value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.value)}
            />
          ))}
        </div>
      )}


      {/* Renderização do Form/Modal */}
      {isModalOpen && <ProductForm onClose={() => setIsModalOpen(false)} />}

    </div>
  );
};

export default Products;