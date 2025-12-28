import React, { useState, useEffect } from 'react';
import { UserProfile, CoachResponse } from './types';
import { generateCoachPlan } from './services/geminiService';
import Onboarding from './components/Onboarding';
import TaskInput from './components/TaskInput';
import PlanDisplay from './components/PlanDisplay';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentPlan, setCurrentPlan] = useState<CoachResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'onboarding' | 'input' | 'plan'>('onboarding');

  // Load profile from local storage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('destiny_coach_profile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setView('input');
    }
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('destiny_coach_profile', JSON.stringify(profile));
    setView('input');
  };

  const handleTaskSubmit = async (taskDescription: string) => {
    if (!userProfile) return;

    setIsLoading(true);
    try {
      const plan = await generateCoachPlan(userProfile, taskDescription);
      setCurrentPlan(plan);
      setView('plan');
    } catch (error) {
      console.error("Failed to generate plan", error);
      alert("星象云雾缭绕 (API Error)。请重试。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setView('input');
    setCurrentPlan(null);
  };

  const handleFullReset = () => {
    localStorage.removeItem('destiny_coach_profile');
    setUserProfile(null);
    setView('onboarding');
  }

  return (
    <div className="min-h-screen bg-mystic-900 text-mystic-100 flex flex-col font-sans selection:bg-gold-500 selection:text-mystic-900">
      {/* Top Bar */}
      <header className="p-4 border-b border-mystic-800 flex justify-between items-center bg-mystic-900/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gold-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-serif font-bold text-xs">DC</span>
          </div>
          <h1 className="font-serif text-lg tracking-widest text-gold-400">DestinyFlow</h1>
        </div>
        {userProfile && (
           <div className="flex items-center gap-4">
             <span className="text-xs text-mystic-100 hidden md:inline-block">
               {userProfile.name} • {userProfile.mbti}
             </span>
             <button 
                onClick={handleFullReset}
                className="text-xs text-mystic-600 hover:text-red-400 transition-colors"
                title="重置档案"
             >
               登出
             </button>
           </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {view === 'onboarding' && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}

        {view === 'input' && userProfile && (
          <TaskInput 
            userGreeting={userProfile.name} 
            onSubmit={handleTaskSubmit} 
            isLoading={isLoading} 
          />
        )}

        {view === 'plan' && currentPlan && (
          <PlanDisplay data={currentPlan} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-mystic-700 text-xs">
        <p>基于荣格原型 & 八字五行 • AI 智能演算</p>
      </footer>
    </div>
  );
};

export default App;