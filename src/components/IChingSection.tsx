import React from 'react';
import { Telescope } from 'lucide-react';
import type { GuaData, YaoData } from '../types';
import { applySentenceBalance } from '../utils/textUtils';

interface IChingSectionProps {
  yaoNum: number | null;
  guaData: GuaData | null;
  yaoData: YaoData | null;
}

export const IChingSection: React.FC<IChingSectionProps> = ({ yaoNum, guaData, yaoData }) => {
  const sigilSrc = yaoNum !== null ? `/images/yao-${yaoNum}.png` : null;

  if (!guaData || !yaoData) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-20 opacity-50 bg-white/50 dark:bg-ray-dark/50 rounded-[2.5rem] border border-dashed border-warm-gray-300 dark:border-warm-gray-700 animate-fade-in-up">
        <div className="w-16 h-16 border-2 border-dashed border-warm-gray-400 rounded-full flex items-center justify-center mb-4">
          <Telescope className="text-warm-gray-400 w-8 h-8" />
        </div>
        <p className="font-serif italic text-warm-gray-600 dark:text-warm-gray-400">해당 날짜는 비움</p>
      </div>
    );
  }

  return (
    <section className="bg-white/80 dark:bg-ray-dark/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-elegant-gold/10 transition-colors duration-300 relative overflow-hidden group animate-fade-in-up stagger-1">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-elegant-gold to-transparent opacity-20 group-hover:opacity-40 transition-opacity"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-elegant-gold opacity-5 dark:opacity-5 blur-3xl rounded-full"></div>
      
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
        
        {/* Sigil Image */}
        <div className="w-full md:w-1/3 flex-shrink-0 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-warm-gray-100 to-transparent dark:from-warm-gray-800 rounded-3xl transform rotate-3 scale-105 opacity-50 group-hover:rotate-0 transition-transform duration-700"></div>
          <div className="relative aspect-square rounded-3xl bg-warm-gray-50 dark:bg-warm-gray-900 border border-warm-gray-200 dark:border-warm-gray-800 shadow-inner flex items-center justify-center p-6 overflow-hidden transition-all duration-700 hover:scale-105 hover:shadow-2xl">
            {sigilSrc ? (
              <img 
                src={sigilSrc} 
                alt={`sigil ${yaoNum}`} 
                className="w-full h-full object-contain filter dark:brightness-200 dark:contrast-125 dark:grayscale transition-all duration-700 group-hover:scale-110"
              />
            ) : (
              <span className="italic text-sm text-warm-gray-400">이미지 없음</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3 space-y-8 relative z-10">
          {/* Gua */}
          <div className="border-b border-warm-gray-200 dark:border-warm-gray-800 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-1 bg-elegant-gold rounded-full shadow-[0_0_8px_rgba(184,134,11,0.5)]"></div>
              <h2 className="text-xl md:text-2xl font-bold font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-warm-gray-800 to-warm-gray-500 dark:from-white dark:to-warm-gray-400">
                {guaData.header}
              </h2>
            </div>
            <p 
              className="text-base md:text-lg text-warm-gray-600 dark:text-warm-gray-300 font-serif leading-relaxed italic"
              dangerouslySetInnerHTML={{ __html: applySentenceBalance(guaData.meta) }}
            />
          </div>

          {/* Yao */}
          <div className="space-y-6 pt-2">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-elegant-gold/10 border border-elegant-gold/20 text-elegant-gold text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
              Today's Reflection
            </div>
            
            <h3 className="text-2xl md:text-[1.75rem] font-bold font-serif leading-snug text-warm-gray-800 dark:text-white/90">
              {yaoData.titleLine}
            </h3>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 w-1 bg-elegant-gold/30 rounded-full"></div>
              <p 
                className="text-lg md:text-xl text-elegant-gold font-serif italic font-medium leading-relaxed pl-6 py-2"
                dangerouslySetInnerHTML={{ __html: applySentenceBalance(yaoData.short) }}
              />
            </div>

            <div className="pt-4 text-warm-gray-700/90 dark:text-warm-gray-200/90 font-serif whitespace-pre-wrap leading-[1.8] text-[15px] md:text-[16px] tracking-wide">
              {yaoData.body}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
