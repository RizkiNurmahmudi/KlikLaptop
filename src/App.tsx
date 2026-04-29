import { useState } from 'react';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Comparison from './components/Comparison';
import Navbar from './components/Navbar';
import { AppState } from './types';
import { Laptop } from './data/mockLaptops';

export default function App() {
  const [state, setState] = useState<AppState>({
    view: 'home',
    selectedLaptop: null,
    compareList: [],
  });

  const handleViewDetail = (laptop: Laptop) => {
    setState(prev => ({ ...prev, view: 'detail', selectedLaptop: laptop }));
    window.scrollTo(0, 0);
  };

  const handleToggleCompare = (laptop: Laptop) => {
    setState(prev => {
      const isAlreadyCompared = prev.compareList.some(l => l.id === laptop.id);
      let newList = prev.compareList;
      
      if (isAlreadyCompared) {
        newList = prev.compareList.filter(l => l.id !== laptop.id);
      } else {
        if (prev.compareList.length < 4) {
          newList = [...prev.compareList, laptop];
        } else {
          alert('Maksimal membandingkan 4 laptop!');
          return prev;
        }
      }
      return { ...prev, compareList: newList };
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setState(prev => ({
      ...prev,
      compareList: prev.compareList.filter(l => l.id !== id)
    }));
  };

  const handleGoToCompare = () => {
    if (state.compareList.length === 0) {
      alert('Pilih beberapa laptop terlebih dahulu untuk membandingkan.');
      return;
    }
    setState(prev => ({ ...prev, view: 'compare' }));
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setState(prev => ({ ...prev, view: 'home', selectedLaptop: null }));
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setState(prev => ({ ...prev, view: 'home', selectedLaptop: null }));
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-200 flex flex-col overflow-x-hidden">
      <Navbar 
        view={state.view} 
        compareCount={state.compareList.length} 
        onBack={handleBack} 
        onGoToCompare={handleGoToCompare}
        onGoHome={handleGoHome}
      />
      
      <main className="flex-1">
        {state.view === 'home' && (
          <Home 
            onViewDetail={handleViewDetail}
            onToggleCompare={handleToggleCompare}
            compareList={state.compareList}
            onGoToCompare={handleGoToCompare}
          />
        )}

        {state.view === 'detail' && state.selectedLaptop && (
          <ProductDetail 
            laptop={state.selectedLaptop}
            onToggleCompare={handleToggleCompare}
            isCompared={state.compareList.some(l => l.id === state.selectedLaptop?.id)}
          />
        )}

        {state.view === 'compare' && (
          <Comparison 
            compareList={state.compareList}
            onRemove={handleRemoveFromCompare}
          />
        )}
      </main>
    </div>
  );
}
