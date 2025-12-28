import React, { useState, useEffect } from 'react';
import { CoachResponse, PlanStep } from '../types';

interface PlanDisplayProps {
  data: CoachResponse;
  onReset: () => void;
}

const PlanDisplay: React.FC<PlanDisplayProps> = ({ data, onReset }) => {
  const [steps, setSteps] = useState<PlanStep[]>([]);

  // Initialize steps from API response
  useEffect(() => {
    const formattedSteps: PlanStep[] = data.steps.map((text, index) => ({
      id: `step-${index}`,
      text,
      isCompleted: false,
      type: data.taskType === 'SHORT_TERM_PROCRASTINATION' ? 'micro' : 'milestone',
    }));
    setSteps(formattedSteps);
  }, [data]);

  const toggleStep = (id: string) => {
    setSteps(prev => prev.map(step => 
      step.id === id ? { ...step, isCompleted: !step.isCompleted } : step
    ));
  };

  const completedCount = steps.filter(s => s.isCompleted).length;
  const progress = steps.length > 0 ? (completedCount / steps.length) * 100 : 0;

  const getTaskLabel = (type: string) => {
    return type === 'SHORT_TERM_PROCRASTINATION' ? '短期拖延急救' : '长期复杂项目';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-0 pb-20 animate-fade-in-up">
      
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onReset}
          className="text-mystic-100 hover:text-gold-400 text-sm font-semibold transition-colors flex items-center gap-1"
        >
          ← 开启新咨询
        </button>
        <span className="text-gold-500 font-serif text-sm tracking-widest border border-gold-500/30 px-3 py-1 rounded-full uppercase">
          {getTaskLabel(data.taskType)}
        </span>
      </div>

      {/* Analysis Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Metaphysical Analysis */}
        <div className="bg-mystic-800/80 p-6 rounded-xl border border-indigo-900/50 relative overflow-hidden group hover:border-indigo-500/30 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-16 h-16 text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0L14.59 8.41L23.41 11L14.59 13.59L12 22L9.41 13.59L0.59 11L9.41 8.41L12 0Z"/></svg>
          </div>
          <h3 className="text-indigo-300 font-serif text-lg mb-3 flex items-center gap-2">
            <span>✦</span> 天命 & 心智 (Celestial & Psyche)
          </h3>
          <p className="text-mystic-100 text-sm leading-relaxed mb-4">
            {data.analysis.userAnalysis}
          </p>
          <div className="bg-indigo-900/30 p-3 rounded-lg border-l-2 border-indigo-400">
             <h4 className="text-xs uppercase text-indigo-200 font-bold mb-1">时运契合度</h4>
             <p className="text-xs text-indigo-100 italic">{data.analysis.baziTiming}</p>
          </div>
        </div>

        {/* Scientific Strategy */}
        <div className="bg-mystic-800/80 p-6 rounded-xl border border-emerald-900/50 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-16 h-16 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
          </div>
          <h3 className="text-emerald-300 font-serif text-lg mb-3 flex items-center gap-2">
            <span>☤</span> 行为策略 (Strategy)
          </h3>
          <p className="text-mystic-100 text-sm leading-relaxed mb-4">
            {data.analysis.strategy}
          </p>
           <div className="bg-emerald-900/30 p-3 rounded-lg border-l-2 border-emerald-400">
             <h4 className="text-xs uppercase text-emerald-200 font-bold mb-1">教练指令</h4>
             <p className="text-xs text-emerald-100 italic">"{data.analysis.motivationalQuote}"</p>
          </div>
        </div>
      </div>

      {/* The Plan */}
      <div className="bg-mystic-800 rounded-2xl shadow-2xl overflow-hidden border border-mystic-700">
        <div className="bg-mystic-900 p-6 border-b border-mystic-700 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-serif text-white">行动协议 (Action Protocol)</h2>
            <p className="text-xs text-mystic-100 opacity-60 mt-1">
              {progress === 100 ? '协议已完成。做得好。' : `剩余 ${steps.length - completedCount} 个步骤`}
            </p>
          </div>
          <div className="w-32 h-2 bg-mystic-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-gold-500 to-amber-300 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="divide-y divide-mystic-700/50">
          {steps.map((step, idx) => (
            <div 
              key={step.id} 
              onClick={() => toggleStep(step.id)}
              className={`
                group p-5 flex items-start gap-4 cursor-pointer transition-all duration-200
                ${step.isCompleted ? 'bg-mystic-900/50' : 'hover:bg-mystic-700/30'}
              `}
            >
              <div className={`
                mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0
                ${step.isCompleted 
                  ? 'bg-gold-500 border-gold-500 scale-110' 
                  : 'border-mystic-500 group-hover:border-gold-400'
                }
              `}>
                {step.isCompleted && (
                  <svg className="w-4 h-4 text-mystic-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              
              <div className="flex-1">
                <p className={`
                  text-lg transition-all duration-300 font-sans
                  ${step.isCompleted 
                    ? 'text-mystic-600 line-through decoration-mystic-600 decoration-2' 
                    : 'text-mystic-50'
                  }
                `}>
                  {step.text}
                </p>
                {step.type === 'micro' && !step.isCompleted && (
                  <span className="text-xs text-gold-500/70 uppercase tracking-wider font-semibold mt-1 block">
                    微行动 (Micro-Action) {idx + 1}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanDisplay;