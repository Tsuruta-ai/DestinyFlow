import React, { useState } from 'react';

interface TaskInputProps {
  userGreeting: string;
  onSubmit: (task: string) => void;
  isLoading: boolean;
}

const TaskInput: React.FC<TaskInputProps> = ({ userGreeting, onSubmit, isLoading }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onSubmit(task);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-8">
      <h1 className="text-4xl font-serif text-white text-center mb-2">
        {userGreeting}，你此刻的困扰是什么？
      </h1>
      <p className="text-center text-mystic-100 mb-8 opacity-70">
        告诉我你的任务，以及你当下的心境。
      </p>

      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="例如：我需要写毕业论文，但我一直在刷抖音，感觉整个人瘫住了..."
          className="w-full h-32 bg-mystic-800 border-2 border-mystic-600 rounded-xl p-4 text-lg text-white placeholder-mystic-600 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-all resize-none shadow-inner"
          disabled={isLoading}
        />
        
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !task.trim()}
            className={`
              px-8 py-3 rounded-full font-serif font-bold tracking-wide transition-all shadow-lg
              ${isLoading 
                ? 'bg-mystic-600 cursor-not-allowed opacity-50' 
                : 'bg-gold-500 text-mystic-900 hover:bg-gold-400 hover:shadow-gold-500/20 transform hover:-translate-y-1'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-mystic-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                正在链接星辰能量...
              </span>
            ) : (
              '深度解析 & 拆解'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;