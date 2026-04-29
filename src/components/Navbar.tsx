import { Scale, ArrowLeft } from 'lucide-react';
import { AppState } from '../types';

interface Props {
  view: AppState['view'];
  compareCount: number;
  onBack: () => void;
  onGoToCompare: () => void;
  onGoHome: () => void;
}

export default function Navbar({ view, compareCount, onBack, onGoToCompare, onGoHome }: Props) {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between lg:px-8 py-4">
        
        {/* Left side */}
        <div className="flex items-center gap-2">
          {view !== 'home' && (
            <button 
              onClick={onBack}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-600 mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={onGoHome}
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl italic group-hover:bg-indigo-700 transition">
              LP
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800 hidden sm:block">
              LaptopPintar
            </span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {view !== 'compare' && (
            <button 
              onClick={onGoToCompare}
              className="px-4 py-2 rounded-full border border-slate-200 text-sm font-semibold hover:bg-slate-50 flex items-center gap-2 transition"
            >
              <Scale className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline text-slate-700">Bandingkan</span>
              {compareCount > 0 && (
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                  {compareCount}
                </span>
              )}
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}
