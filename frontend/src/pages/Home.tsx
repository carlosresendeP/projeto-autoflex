import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchSuggestions } from '../store/productionSlice';
import { fetchProducts } from '../store/productSlice';
import { fetchMaterials } from '../store/materialSlice';
import { KpiCard } from '../components/KpiCard';

const Home = () => {
  const dispatch = useAppDispatch();
  
  // Pegamos os dados de todas as frentes para compor os KPIs
  const { suggestions, loading: loadingSug } = useAppSelector((state) => state.production);
  const { list: products } = useAppSelector((state) => state.product);
  const { list: materials } = useAppSelector((state) => state.materials);

  useEffect(() => {
    dispatch(fetchSuggestions());
    dispatch(fetchProducts());
    dispatch(fetchMaterials());
  }, [dispatch]);

  // Cálculo do valor total potencial das sugestões
  const totalPotentialValue = suggestions.reduce((acc, curr) => acc + curr.totalValue, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Painel de Controle</h1>
        <p className="text-slate-500 text-lg">Visão estratégica e sugestões de produção em tempo real.</p>
      </header>

      {/* Seção de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <KpiCard 
          label="Produtos Ativos" 
          value={products.length} 
          icon="📦" 
          color="blue" 
        />
        <KpiCard 
          label="Materiais em Estoque" 
          value={materials.length} 
          icon="🏗️" 
          color="emerald" 
        />
        <KpiCard 
          label="Receita Estimada" 
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPotentialValue)} 
          icon="💰" 
          color="indigo" 
        />
      </div>

      {/* Área Principal: Sugestões de Produção */}
      <section className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Detalhe decorativo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold italic">AutoFlex Intelligence</h2>
              <p className="text-slate-400 text-sm">Baseado no estoque atual e composições cadastradas [cite: 2026-02-10].</p>
            </div>
            <div className="px-4 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-bold text-blue-400 animate-pulse">
              LIVE UPDATE
            </div>
          </div>

          {loadingSug ? (
            <div className="py-20 text-center text-slate-500">Processando algoritmos de produção...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {suggestions.length > 0 ? (
                suggestions.map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{item.productName}</h3>
                        <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">Capacidade de Produção</p>
                      </div>
                      <span className="text-3xl font-black text-blue-500">{item.quantityToProduce}<small className="text-sm font-normal opacity-50 ml-1">un</small></span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-white/5 text-sm">
                      <span className="text-slate-500 italic">Valor sugerido de venda:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.totalValue)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-10 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
                   <p className="text-slate-500 font-medium">Cadastre composições e estoque para ver sugestões aqui.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;