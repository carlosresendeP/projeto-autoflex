import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type{ AppDispatch, RootState } from '../store';
import { fetchSuggestions } from '../store/productionSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Pegamos o estado completo de produção para inspecionar
  const productionState = useSelector((state: RootState) => state.production);
  const { suggestions, loading } = productionState;

  useEffect(() => {
    dispatch(fetchSuggestions());
  }, [dispatch]);

  // Debug: Abra o console (F12) e veja o que aparece aqui
  console.log("Estado de Produção:", productionState);

  if (loading) return <div className="p-10 text-center">Carregando sugestões...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">Painel de Produção</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Verificação de segurança antes do .map */}
        {Array.isArray(suggestions) && suggestions.length > 0 ? (
          suggestions.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
               <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Sugestão de Produção</h3>
               <h2 className="text-xl font-bold text-slate-900 mb-4">{item.productName}</h2>
               <div className="flex justify-between border-t border-slate-100 pt-4">
                  <div>
                    <span className="text-slate-400 text-xs">Quantidade</span>
                    <p className="text-lg font-semibold text-slate-700">{item.quantityToProduce} un.</p>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-xs">Retorno Estimado</span>
                    <p className="text-lg font-bold text-emerald-600">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.totalValue)}
                    </p>
                  </div>
               </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-12 text-center text-slate-400">
            Nenhuma sugestão disponível para os materiais em estoque.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;