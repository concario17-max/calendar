import React from 'react';
import { Telescope } from 'lucide-react';
import type { GuaData, YaoData } from '../types';

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
        <p className="font-display italic text-warm-gray-600 dark:text-warm-gray-400">
          이 날짜에 해당하는 역경 항목이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-white/80 dark:bg-ray-dark/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-elegant-gold/10 transition-colors duration-300 relative overflow-hidden group animate-fade-in-up stagger-1">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-elegant-gold to-transparent opacity-20 group-hover:opacity-40 transition-opacity"></div>
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-elegant-gold opacity-5 dark:opacity-5 blur-3xl rounded-full"></div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
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
              <span className="italic text-sm text-warm-gray-400">이미지가 없습니다</span>
            )}
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-8 relative z-10">
          <div className="border-b border-warm-gray-200 dark:border-warm-gray-800 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-6 w-1 bg-elegant-gold rounded-full shadow-[0_0_8px_rgba(184,134,11,0.5)]"></div>
              <h2 className="text-xl md:text-[1.9rem] font-bold font-brand tracking-[0.01em] text-transparent bg-clip-text bg-gradient-to-r from-warm-gray-800 to-warm-gray-500 dark:from-white dark:to-warm-gray-400 break-keep leading-tight">
                {guaData.header}
              </h2>
            </div>
            <p className="max-w-[34rem] text-[0.96rem] md:text-[1.06rem] text-ray-body dark:text-warm-gray-300 font-display leading-relaxed italic break-keep">
              {guaData.meta}
            </p>
          </div>

          <div className="space-y-6 pt-2">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-elegant-gold/10 border border-elegant-gold/20 text-elegant-gold text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
              오늘의 묵상
            </div>

            <h3 className="max-w-[22ch] text-[1.7rem] md:text-[2.1rem] font-display font-bold tracking-[-0.03em] leading-[1.28] text-warm-gray-800 dark:text-white/95 break-keep">
              {yaoData.titleLine}
            </h3>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 w-1 bg-elegant-gold/30 rounded-full"></div>
              <p className="max-w-[28rem] text-[1.02rem] md:text-[1.16rem] text-elegant-gold font-display italic font-medium leading-[1.85] pl-6 py-2 break-keep">
                {yaoData.short}
              </p>
            </div>

            <div className="max-w-[35rem] pt-4 text-ray-body/90 dark:text-warm-gray-200/90 font-display whitespace-pre-wrap leading-[1.9] text-[15px] md:text-[16px] tracking-[-0.01em] break-keep">
              {yaoData.body}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
