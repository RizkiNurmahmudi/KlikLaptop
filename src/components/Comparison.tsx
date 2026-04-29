import { useState } from 'react';
import { Laptop } from '../data/mockLaptops';
import { X, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  compareList: Laptop[];
  onRemove: (id: string) => void;
}

export default function Comparison({ compareList, onRemove }: Props) {
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 italic">Mulai Membandingkan</h2>
        <p className="text-slate-500 mb-8 font-medium">Pilih beberapa laptop dari halaman utama untuk melihat perbandingannya di sini.</p>
      </div>
    );
  }

  // Helper to check if a specific spec is different across all selected laptops
  const isDifferent = (key: keyof Laptop['specs']) => {
    if (compareList.length < 2) return true;
    const firstVal = compareList[0].specs[key].raw;
    for (let i = 1; i < compareList.length; i++) {
        if (compareList[i].specs[key].raw !== firstVal) {
            return true;
        }
    }
    return false;
  };

  const categories = [
    { id: 'cpu', label: 'Prosesor' },
    { id: 'gpu', label: 'Kartu Grafis' },
    { id: 'ram', label: 'RAM / Memori' },
    { id: 'storage', label: 'Penyimpanan' },
    { id: 'screen', label: 'Layar' },
    { id: 'battery', label: 'Baterai' },
    { id: 'cooling', label: 'Pendingin' },
    { id: 'ports', label: 'Colokan (Port)' },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 overflow-x-hidden">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 italic">Adu Spesifikasi Laptop</h1>
          <p className="text-slate-600 font-medium">Pelajari letak perbedaan antar kandidat laptopmu.</p>
        </div>
        
        {/* Toggle Show Differences */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-sm font-bold text-slate-700 pl-2 tracking-wide">Tampilkan hanya perbedaan</span>
          <button 
            onClick={() => setShowDifferencesOnly(!showDifferencesOnly)}
            className={`w-12 h-6 rounded-full transition-colors relative ${showDifferencesOnly ? 'bg-indigo-600' : 'bg-slate-300'}`}
          >
            <motion.div 
              layout
              className={`w-4 h-4 bg-white rounded-full mx-1 absolute top-1 ${showDifferencesOnly ? 'right-0' : 'left-0'}`} 
            />
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="min-w-[800px] flex border border-slate-200 bg-white rounded-3xl overflow-hidden shadow-sm">
            
            {/* Header / Product summary row */}
            <div className="flex w-full mt-4 pb-4 border-b border-slate-100 items-stretch">
                <div className="w-48 shrink-0 p-6 flex flex-col justify-end">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-normal">Kategori Spesifikasi</span>
                </div>
                {compareList.map(laptop => (
                    <div key={laptop.id} className="flex-1 p-6 relative group border-l border-slate-100 flex flex-col">
                        <button 
                            onClick={() => onRemove(laptop.id)}
                            className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                            title="Hapus dari perbandingan"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 mb-4 flex items-center justify-center">
                            <img src={laptop.image} alt={laptop.name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1 leading-tight">{laptop.name}</h3>
                        <p className="font-black text-indigo-600 mt-auto">Rp {(laptop.price / 1000000).toFixed(1)} Jt</p>
                    </div>
                ))}
                {/* Empty slots placeholders if < 4 */}
                {Array.from({ length: Math.max(0, 4 - compareList.length) }).map((_, i) => (
                    <div key={`empty-${i}`} className="flex-1 p-6 border-l border-slate-100 bg-slate-50 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center mb-4">
                            <span className="text-slate-400 text-xl font-bold">+</span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Pilih laptop lagi<br/>dari beranda</p>
                    </div>
                ))}
            </div>

        </div>

        {/* Categories Rows */}
        <div className="min-w-[800px] border-x border-b border-slate-200 bg-white rounded-b-3xl mt-[-16px]">
            {categories.map((cat, idx) => {
                const diff = isDifferent(cat.id);
                if (showDifferencesOnly && !diff) return null;

                return (
                    <div key={cat.id} className={`flex w-full items-stretch border-t border-slate-100 ${diff ? 'bg-white' : 'bg-slate-50'}`}>
                        {/* Label Category */}
                        <div className="w-48 shrink-0 p-6 flex flex-col justify-center border-r border-slate-100">
                            <h4 className="font-bold text-[11px] uppercase tracking-wider text-slate-800">{cat.label}</h4>
                            {diff && showDifferencesOnly && <span className="text-[9px] uppercase font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded w-max mt-1 border border-indigo-100">Berbeda</span>}
                        </div>
                        
                        {/* Columns values */}
                        {compareList.map(laptop => (
                            <div key={laptop.id} className="flex-1 p-6 border-r border-slate-100 last:border-r-0">
                                <p className="text-slate-900 font-bold mb-3 text-sm">{laptop.specs[cat.id].human}</p>
                                <p className="text-[11px] font-medium text-slate-500 font-mono bg-white border border-slate-200 shadow-sm inline-block px-2 py-1 rounded">
                                    {laptop.specs[cat.id].raw}
                                </p>
                            </div>
                        ))}

                        {/* Empty slot values */}
                        {Array.from({ length: Math.max(0, 4 - compareList.length) }).map((_, i) => (
                            <div key={`empty-val-${i}`} className="flex-1 p-6 bg-slate-50 border-r border-slate-100 last:border-r-0"></div>
                        ))}
                    </div>
                );
            })}
        </div>
      </div>

    </div>
  );
}
