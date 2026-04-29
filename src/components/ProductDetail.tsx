import React, { useState } from 'react';
import { Laptop } from '../data/mockLaptops';
import { ChevronDown, CheckCircle2, ThumbsUp, Scale, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  laptop: Laptop;
  onToggleCompare: (laptop: Laptop) => void;
  isCompared: boolean;
}

export default function ProductDetail({ laptop, onToggleCompare, isCompared }: Props) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    performa: true,
    layar: false,
    koneksi: false,
    baterai: false,
    cooling: true // important as per prompt
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-32">
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 relative group">
              <img src={laptop.image} alt="Official image" className="object-cover w-full h-full" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                Foto Official
              </div>
            </div>
            
            {/* Real Picts */}
            <div>
              <h4 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">🔍 Cek Foto Asli (Real Pict)</h4>
              <div className="flex gap-4 overflow-x-auto pb-2 snap-x">
                {laptop.real_images.map((img, idx) => (
                  <div key={idx} className="w-32 h-24 shrink-0 rounded-xl overflow-hidden snap-start border border-slate-200">
                    <img src={img} className="w-full h-full object-cover" alt="Real pict" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary & Action */}
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2 mb-4">
              {laptop.use_case_tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{laptop.name}</h1>
            <p className="text-2xl font-bold text-indigo-600 mb-6">Rp {laptop.price.toLocaleString('id-ID')}</p>
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-8 text-sm">
              <h3 className="flex items-center gap-2 font-bold text-indigo-900 mb-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                Kenapa cocok buat kamu?
              </h3>
              <p className="text-indigo-800 leading-relaxed font-medium italic">
                "{laptop.short_description}"
              </p>
            </div>

            <div className="mt-auto space-y-4">
              <button 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                Beli Sekarang (Simulasi)
              </button>
              <button 
                onClick={() => onToggleCompare(laptop)}
                className={`w-full font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 border-2 active:scale-[0.98] ${
                  isCompared 
                    ? 'bg-slate-100 border-slate-200 text-slate-700' 
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <Scale className="w-5 h-5" />
                {isCompared ? 'Hapus dari Komparasi' : 'Bandingkan dengan Laptop Lain'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRESSIVE DISCLOSURE - SPECIFICATIONS */}
      <div className="mt-12 space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 pl-2 leading-tight italic">Detail Spesifikasi (Bahasa Manusia)</h2>
        
        <Accordion 
          title="🚀 Performa & Kecepatan" 
          isOpen={openSections['performa']} 
          onToggle={() => toggleSection('performa')}
        >
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">Skor Kecepatan Umum</span>
                <span className="font-bold text-indigo-600 text-sm">{laptop.performance_score} / 100</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-indigo-600 h-2 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.5)]" style={{ width: `${laptop.performance_score}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SpecItem 
                label="Otak Utama (Processor/CPU)" 
                technical={laptop.specs.cpu.raw} 
                human={laptop.specs.cpu.human} 
              />
              <SpecItem 
                label="Kartu Grafis (GPU)" 
                technical={laptop.specs.gpu.raw} 
                human={laptop.specs.gpu.human} 
              />
              <SpecItem 
                label="Memori Buka Aplikasi (RAM)" 
                technical={laptop.specs.ram.raw} 
                human={laptop.specs.ram.human} 
              />
              <SpecItem 
                label="Kapasitas Simpanan (Storage)" 
                technical={laptop.specs.storage.raw} 
                human={laptop.specs.storage.human} 
              />
            </div>
          </div>
        </Accordion>

        <Accordion 
          title="❄️ Sistem Pendingin (Suhu)" 
          isOpen={openSections['cooling']} 
          onToggle={() => toggleSection('cooling')}
        >
           <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-900 text-sm">Info Penting Untuk Ketahanan Laptop</p>
                <p className="text-sm text-emerald-800 mt-1">{laptop.specs.cooling.human}</p>
              </div>
           </div>
           <p className="text-sm text-slate-600"><span className="font-bold text-slate-900">Spesifikasi teknis kipas:</span> {laptop.specs.cooling.raw}</p>
        </Accordion>

        <Accordion 
          title="🖥️ Layar & Penglihatan" 
          isOpen={openSections['layar']} 
          onToggle={() => toggleSection('layar')}
        >
          <SpecItem 
            label="Kualitas Layar" 
            technical={laptop.specs.screen.raw} 
            human={laptop.specs.screen.human} 
          />
        </Accordion>

        <Accordion 
          title="🔋 Baterai & Daya Tahan" 
          isOpen={openSections['baterai']} 
          onToggle={() => toggleSection('baterai')}
        >
          <SpecItem 
            label="Kapasitas & Ketahanan" 
            technical={laptop.specs.battery.raw} 
            human={laptop.specs.battery.human} 
          />
        </Accordion>

        <Accordion 
          title="🔌 Colokan & Konektivitas" 
          isOpen={openSections['koneksi']} 
          onToggle={() => toggleSection('koneksi')}
        >
          <SpecItem 
            label="Kelengkapan Port" 
            technical={laptop.specs.ports.raw} 
            human={laptop.specs.ports.human} 
          />
        </Accordion>
      </div>

      {/* Review Section */}
      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 pl-2 italic">Apa Kata Pembeli Asli?</h2>
        <div className="space-y-4">
          {laptop.reviews.map((rev, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex flex-col items-center justify-center font-bold text-slate-600">
                  {rev.user.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{rev.user}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pembeli Terverifikasi</p>
                </div>
                <div className="ml-auto flex text-yellow-400 text-sm">
                  {Array(rev.rating).fill(0).map((_, i) => <span key={i}>★</span>)}
                </div>
              </div>
              <p className="text-slate-600 italic">"{rev.text}"</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function Accordion({ title, isOpen, onToggle, children }: { title: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border border-slate-200 rounded-3xl bg-white overflow-hidden">
      <button 
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
      >
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-2 border-t border-slate-100">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SpecItem({ label, technical, human }: { label: string; technical: string; human: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
      <p className="text-slate-900 font-bold text-sm mb-2 leading-snug">{human}</p>
      <p className="inline-block px-2 py-1 bg-white border border-slate-200 rounded text-[11px] text-slate-500 font-mono font-medium">{technical}</p>
    </div>
  )
}
