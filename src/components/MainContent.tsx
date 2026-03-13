import React, { useState, useEffect } from 'react';
import type { GuaData, YaoData, SoulSection, SoulGroup } from '../types';

interface MainContentProps {
  dayIndex: number;
  isValidRange: boolean;
  yaoNum: number | null;
  guaNum: number | null;
  guaData: GuaData | null;
  yaoData: YaoData | null;
  hitSoulGroup?: SoulGroup;
  soulSections: SoulSection[];
  onOpenJournal: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  isValidRange, yaoNum, guaData, yaoData, hitSoulGroup, soulSections, onOpenJournal
}) => {
  const [sigilSrc, setSigilSrc] = useState<string | null>(null);

  useEffect(() => {
    if (yaoNum !== null && isValidRange) {
      const src = `/images/yao-${yaoNum}.png`;
      setSigilSrc(src);
    } else {
      setSigilSrc(null);
    }
  }, [yaoNum, isValidRange]);

  const renderEmpty = () => (
    <div className="flex flex-col items-center justify-center space-y-4 py-20 opacity-50">
      <div className="w-16 h-16 border-2 border-dashed border-warm-gray-400 rounded-full flex items-center justify-center mb-4">
        <span className="text-xl">?</span>
      </div>
      <p className="font-serif italic text-warm-gray-600 dark:text-warm-gray-400">해당 날짜는 비움</p>
    </div>
  );

  const formatText = (text: string) => {
    return text.replace(/\(([^)]+)\)/g, (match, inner) => {
      if (inner.length < 25) return match;
      const mid = Math.floor(inner.length / 2);
      let best = -1, min = Infinity;
      for (let i = 0; i < inner.length; i++) {
        if (inner[i] === ' ') {
          const diff = Math.abs(i - mid);
          if (diff < min) { min = diff; best = i; }
        }
      }
      if (best !== -1) {
        return '(' + inner.substring(0, best) + '<br/>' + inner.substring(best + 1) + ')';
      }
      return match;
    });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-36 mt-4 space-y-12 animate-fade-in relative z-10">
      
      {/* 주역(I Ching) 섹션 */}
      <section className="bg-white/80 dark:bg-ray-dark/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-elegant-gold/10 transition-colors duration-300 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-elegant-gold to-transparent opacity-20 group-hover:opacity-40 transition-opacity"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-elegant-gold opacity-5 dark:opacity-5 blur-3xl rounded-full"></div>
        
        {isValidRange && guaData && yaoData ? (
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
            
            {/* Sigil Image */}
            <div className="w-full md:w-1/3 flex-shrink-0 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-warm-gray-100 to-transparent dark:from-warm-gray-800 rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
              <div className="relative aspect-square rounded-3xl bg-warm-gray-50 dark:bg-warm-gray-900 border border-warm-gray-200 dark:border-warm-gray-800 shadow-inner flex items-center justify-center p-6 overflow-hidden transition-transform duration-500 hover:scale-105">
                {sigilSrc ? (
                  <img 
                    src={sigilSrc} 
                    alt={`sigil ${yaoNum}`} 
                    className="w-full h-full object-contain filter dark:brightness-200 dark:contrast-125 dark:grayscale"
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
                  dangerouslySetInnerHTML={{ __html: formatText(guaData.meta) }}
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
                    dangerouslySetInnerHTML={{ __html: formatText(yaoData.short) }}
                  />
                </div>

                <div className="pt-4 text-warm-gray-700/90 dark:text-warm-gray-200/90 font-display font-light whitespace-pre-wrap leading-loose text-[15px] md:text-[16px] tracking-wide">
                  {yaoData.body}
                </div>
              </div>
            </div>
          </div>
        ) : renderEmpty()}
      </section>

      {/* 영혼의 달력 (Calendar of the Soul) 섹션 */}
      <section className="relative">
        <div className="text-center mb-10">
          <div className="inline-block">
            <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-warm-gray-800 to-warm-gray-500 dark:from-white dark:to-warm-gray-400 tracking-wide mb-3">
              Calendar of the Soul
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-elegant-gold"></div>
              <span className="text-sm font-bold text-elegant-gold tracking-[0.3em] uppercase">
                {hitSoulGroup ? hitSoulGroup.weeksLabel : '해당 날짜는 비움'}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-elegant-gold"></div>
            </div>
          </div>
        </div>

        {soulSections.length >= 2 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-elegant-gold opacity-5 blur-3xl rounded-full pointer-events-none"></div>
            {soulSections.slice(0, 2).map((sec, i) => {
              const seasonMatch = sec.text.match(/^(봄|여름|가을|겨울)\s*\n+/);
              const season = seasonMatch ? seasonMatch[1] : null;
              const content = seasonMatch ? sec.text.substring(seasonMatch[0].length).trim() : sec.text;

              return (
                <div key={i} className="space-y-4 bg-white/70 dark:bg-ray-dark/70 backdrop-blur-xl p-8 rounded-[2rem] border border-elegant-gold/20 shadow-md hover:shadow-lg dark:shadow-2xl dark:shadow-black/50 h-full text-center transition-all duration-500 hover:-translate-y-1 group">
                  <div className="flex justify-between items-baseline mb-2 gap-2">
                    <div className="font-bold text-sm text-warm-gray-600 dark:text-warm-gray-300 group-hover:text-elegant-gold transition-colors">{sec.week}주</div>
                    <div className="text-xs text-warm-gray-400 dark:text-warm-gray-500 font-bold whitespace-nowrap uppercase tracking-widest">{sec.range}</div>
                  </div>
                  <div className="whitespace-pre-wrap break-keep leading-relaxed text-[15px] md:text-[16px] font-serif text-warm-gray-800 dark:text-warm-gray-200 mt-2">
                    {season && (
                      <div className="text-[13px] md:text-sm font-bold text-warm-gray-500 dark:text-warm-gray-400 mb-5 tracking-[0.4em] uppercase">{season}</div>
                    )}
                    {content}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="text-warm-gray-500 font-serif italic whitespace-pre-wrap leading-loose">
              해당 구절이 없습니다.
            </span>
          </div>
        )}
      </section>

      {/* 일기 작성 모달 트리거 */}
      <div className="fixed bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none w-full max-w-4xl px-4 flex justify-center">
        <button 
          onClick={onOpenJournal}
          className="pointer-events-auto bg-ray-dark dark:bg-white text-white dark:text-ray-dark hover:bg-elegant-gold dark:hover:bg-elegant-gold px-8 py-4 rounded-full font-bold shadow-xl shadow-ray-dark/20 dark:shadow-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center max-w-sm"
        >
          <span className="material-icons opacity-80 text-xl">auto_awesome</span>
          <span>Add Journal Entry</span>
        </button>
      </div>

    </main>
  );
};
