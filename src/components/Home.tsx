import { useState, useMemo } from 'react';
import { LAPTOPS, Laptop } from '../data/mockLaptops';
import { Check, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  onViewDetail: (laptop: Laptop) => void;
  onToggleCompare: (laptop: Laptop) => void;
  compareList: Laptop[];
  onGoToCompare: () => void;
}

const USE_CASES = [
  'Semua',
  'Laptop untuk Kuliah',
  'Laptop untuk Office',
  'Laptop untuk Coding',
  'Laptop untuk Desain',
  'Laptop untuk Gaming'
];

export default function Home({ onViewDetail, onToggleCompare, compareList, onGoToCompare }: Props) {
  const [budget, setBudget] = useState<number>(20000000);
  const [selectedUseCase, setSelectedUseCase] = useState<string>('Semua');

  const filteredLaptops = useMemo(() => {
    return LAPTOPS.filter(laptop => {
      const matchBudget = laptop.price <= budget;
      const matchUseCase = selectedUseCase === 'Semua' ? true : laptop.use_case_tags.includes(selectedUseCase);
      return matchBudget && matchUseCase;
    });
  }, [budget, selectedUseCase]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* GUIDED SEARCH - LEFT COLUMN */}
      <section className="lg:col-span-4 bg-white rounded-3xl shadow-sm border border-slate-200 p-6 lg:p-8 flex flex-col h-fit lg:sticky lg:top-24">
        <h1 className="text-3xl font-bold leading-tight mb-2 italic text-slate-900">Laptop apa yang kamu cari?</h1>
        <p className="text-slate-500 mb-8 text-sm">Pilih sesuai kebutuhan, bukan spesifikasi rumit.</p>
        
        {/* Budget Filter */}
        <div className="mb-8">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block">1. Anggaran Maksimal</label>
          <div className="flex justify-between items-end mb-4">
            <span className="text-2xl font-bold text-indigo-600">Rp {(budget / 1000000).toFixed(1)} Jt</span>
            <span className="text-xs text-slate-400 font-mono font-bold">IDR</span>
          </div>
          <div className="relative w-full h-2 rounded-full mt-2 bg-slate-100 border border-slate-200">
            <input 
              type="range" 
              min="5000000" 
              max="25000000" 
              step="500000"
              value={budget} 
              onChange={(e) => setBudget(Number(e.target.value))}
              className="absolute w-full h-full appearance-none cursor-pointer accent-indigo-600 bg-transparent z-10"
            />
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span>5 Juta</span>
            <span>25 Juta+</span>
          </div>
        </div>

        {/* Use Case Filter */}
        <div className="mb-8">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 block">2. Digunakan Untuk Apa?</label>
          <div className="grid grid-cols-2 gap-3">
            {USE_CASES.map(useCase => (
              <button
                key={useCase}
                onClick={() => setSelectedUseCase(useCase)}
                className={`p-3 rounded-2xl border-2 text-left transition-all duration-200 active:scale-95 flex flex-col justify-center ${
                  selectedUseCase === useCase 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                    : 'border-slate-100 bg-white text-slate-600 hover:border-indigo-200'
                }`}
              >
                <div className="font-bold text-xs">{useCase.replace('Laptop untuk ', '')}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* REKOMENDASI LIST - RIGHT COLUMN */}
      <section className="lg:col-span-8 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{filteredLaptops.length} Hasil Terbaik Untukmu</h2>
        </div>

        {filteredLaptops.length === 0 ? (
          <div className="bg-slate-50 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
            <p className="text-slate-500 text-lg font-medium">Maaf, tidak ada laptop yang sesuai dengan kriteria yang dipilih.</p>
            <button 
              onClick={() => { setBudget(25000000); setSelectedUseCase('Semua'); }}
              className="mt-4 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-24">
            <AnimatePresence>
            {filteredLaptops.map(laptop => {
              const isCompared = compareList.some(l => l.id === laptop.id);
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={laptop.id} 
                  className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col relative group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => onViewDetail(laptop)}
                >
                  {/* Image Area */}
                  <div className="h-40 w-full bg-slate-50 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                    <img 
                      src={laptop.image} 
                      alt={laptop.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-xl font-bold mb-1 line-clamp-1">{laptop.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 italic line-clamp-2">"{laptop.short_description}"</p>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="flex justify-between text-[11px] font-bold mb-1 uppercase tracking-tight">
                        <span className="text-slate-500">Performa</span>
                        <span className={
                          laptop.performance_badge === 'Powerful' ? 'text-indigo-600' :
                          laptop.performance_badge === 'Smooth' ? 'text-indigo-400' : 'text-slate-500'
                        }>{laptop.performance_badge.toUpperCase()}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full">
                        <div 
                          className={`h-full rounded-full ${
                            laptop.performance_badge === 'Powerful' ? 'bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]' :
                            laptop.performance_badge === 'Smooth' ? 'bg-indigo-400' : 'bg-slate-400'
                          }`}
                          style={{ width: `${laptop.performance_score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-lg font-black text-slate-900">Rp {(laptop.price / 1000000).toFixed(1)} Jt</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleCompare(laptop);
                        }}
                        className={`p-3 rounded-xl border-2 font-bold text-sm transition-all flex items-center justify-center ${
                          isCompared 
                            ? 'bg-slate-900 border-slate-900 text-white' 
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                        title={isCompared ? "Hapus dari komparasi" : "Bandingkan"}
                      >
                        {isCompared ? <Check className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetail(laptop);
                        }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
                      >
                        Pilih
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Floating Compare Action if there are items */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-50 pointer-events-auto min-w-[340px] border border-slate-700"
          >
            <div className="flex flex-col flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Membandingkan ({compareList.length})</span>
              <span className="text-sm font-medium">{compareList.map(l => l.name.split(' ')[0]).join(' vs ')}</span>
            </div>
            <button 
              onClick={onGoToCompare}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-indigo-900/50 whitespace-nowrap"
            >
              Lihat Perbedaan
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
