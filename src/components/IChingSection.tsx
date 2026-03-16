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
      <div className="flex flex-col items-center justify-center space-y-4 py-20 opacity-60 bg-white/60 dark:bg-ray-dark/60 rounded-[2.5rem] border border-dashed border-warm-gray-300 dark:border-warm-gray-700 animate-fade-in-up">
        <div className="w-16 h-16 border-2 border-dashed border-warm-gray-400 rounded-full flex items-center justify-center mb-4">
          <Telescope className="text-warm-gray-400 w-8 h-8" />
        </div>
        <p className="font-display italic text-warm-gray-600 dark:text-warm-gray-400">
          선택한 날짜에 해당하는 역경 항목이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-white/82 dark:bg-ray-dark/82 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-xl border border-elegant-gold/10 transition-colors duration-300 relative overflow-hidden group animate-fade-in-up stagger-1">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-elegant-gold to-transparent opacity-50"></div>
      <div className="absolute -top-20 -right-20 w-44 h-44 bg-elegant-gold/10 dark:bg-elegant-gold/8 blur-3xl rounded-full"></div>

      <div className="grid gap-8 md:gap-12 md:grid-cols-[0.88fr_1.12fr] items-start">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-[2rem] bg-warm-gray-50 dark:bg-warm-gray-900 border border-warm-gray-200 dark:border-warm-gray-800 shadow-inner flex items-center justify-center p-6 overflow-hidden transition-all duration-700">
            <div className="absolute inset-0 bg-gradient-to-br from-warm-gray-100/80 to-transparent dark:from-white/5"></div>
            {sigilSrc ? (
              <img
                src={sigilSrc}
                alt={`sigil ${yaoNum}`}
                className="relative w-full h-full object-contain filter dark:brightness-200 dark:contrast-125 dark:grayscale transition-all duration-700 group-hover:scale-105"
              />
            ) : (
              <span className="italic text-sm text-warm-gray-400">이미지가 없습니다</span>
            )}
          </div>

          <div className="rounded-[1.7rem] border border-warm-gray-200/80 dark:border-warm-gray-800/80 bg-warm-gray-50/90 dark:bg-warm-gray-900/65 px-5 py-5">
            <div className="text-[11px] tracking-[0.16em] text-warm-gray-500 dark:text-warm-gray-400 mb-2">
              오늘의 핵심 문장
            </div>
            <p className="text-[15px] sm:text-[16px] leading-7 tracking-[-0.015em] text-elegant-gold font-display">
              {yaoData.short}
            </p>
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          <div className="border-b border-warm-gray-200 dark:border-warm-gray-800 pb-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-7 w-1 bg-elegant-gold rounded-full shadow-[0_0_8px_rgba(184,134,11,0.5)]"></div>
              <div>
                <div className="text-[11px] tracking-[0.16em] text-warm-gray-500 dark:text-warm-gray-400 mb-1">
                  괘
                </div>
                <h2 className="text-[1.45rem] sm:text-[1.8rem] font-display font-semibold tracking-[-0.04em] text-warm-gray-900 dark:text-white break-keep">
                  {guaData.header}
                </h2>
              </div>
            </div>
            <p className="text-[15px] sm:text-[16px] text-ray-body dark:text-warm-gray-300 font-display leading-7 sm:leading-8 italic break-keep max-w-2xl">
              {guaData.meta}
            </p>
          </div>

          <div className="space-y-6 pt-1">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-elegant-gold/10 border border-elegant-gold/20 text-elegant-gold text-[11px] sm:text-xs tracking-[0.16em]">
              오늘의 묵상
            </div>

            <h3 className="text-[1.9rem] sm:text-[2.2rem] md:text-[2.45rem] font-display font-semibold tracking-[-0.05em] leading-[1.16] text-warm-gray-900 dark:text-white/95 break-keep text-balance">
              {yaoData.titleLine}
            </h3>

            <div className="rounded-[1.7rem] border border-elegant-gold/15 bg-elegant-gold/[0.07] dark:bg-elegant-gold/[0.11] px-5 sm:px-6 py-5">
              <div className="text-[11px] tracking-[0.16em] text-warm-gray-500 dark:text-warm-gray-400 mb-2">
                짧은 단서
              </div>
              <p className="text-lg sm:text-[1.2rem] text-elegant-gold font-display italic font-medium leading-8 tracking-[-0.02em] break-keep">
                {yaoData.short}
              </p>
            </div>

            <div className="rounded-[1.9rem] border border-warm-gray-200/85 dark:border-warm-gray-800/85 bg-white/70 dark:bg-ray-dark/55 px-5 sm:px-6 py-6">
              <div className="text-[11px] tracking-[0.16em] text-warm-gray-500 dark:text-warm-gray-400 mb-4">
                본문
              </div>
              <div className="text-ray-body/92 dark:text-warm-gray-200/92 font-display whitespace-pre-wrap leading-8 sm:leading-[2.05] text-[15px] sm:text-[16px] tracking-[-0.01em] break-keep max-w-2xl text-block-flow">
                {yaoData.body}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
