import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    mbti: '',
    birthDate: '',
    birthTime: '',
    gender: 'male',
    height: '',
    weight: '',
    traits: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.birthDate || !formData.birthTime) {
      alert("请填写必要信息（姓名、出生日期、时间），以便进行精准分析。");
      return;
    }
    onComplete(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-mystic-800 rounded-xl shadow-2xl border border-mystic-700 animate-fade-in">
      <h2 className="text-3xl font-serif text-gold-400 mb-2 text-center">启动命运矩阵</h2>
      <p className="text-mystic-100 mb-8 text-center text-sm opacity-80">
        为了解析你的气场流动（Qi）与认知结构，我们需要精确的数据。
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Basic Info */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gold-500 font-semibold">姓名 / 称呼</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-mystic-900 border border-mystic-600 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none transition-colors"
              placeholder="你的名字"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gold-500 font-semibold">性别</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-mystic-900 border border-mystic-600 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none"
            >
              <option value="male">男 (乾造)</option>
              <option value="female">女 (坤造)</option>
              <option value="other">其他</option>
            </select>
          </div>

          {/* BaZi Data */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gold-500 font-semibold">出生日期</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full bg-mystic-900 border border-mystic-600 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gold-500 font-semibold">出生时间</label>
            <input
              type="time"
              name="birthTime"
              value={formData.birthTime}
              onChange={handleChange}
              className="w-full bg-mystic-900 border border-mystic-600 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none"
            />
          </div>

          {/* Psychology */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gold-500 font-semibold">MBTI 人格类型</label>
            <input
              type="text"
              name="mbti"
              value={formData.mbti}
              onChange={handleChange}
              placeholder="例如：INTJ, ENFP"
              className="w-full bg-mystic-900 border border-mystic-600 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none"
            />
          </div>

          {/* Physical (Optional) */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-gold-500 font-semibold">身高 (cm)</label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full bg-mystic-900 border border-mystic-600 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none"
              />
            </div>
             <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-gold-500 font-semibold">体重 (kg)</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full bg-mystic-900 border border-mystic-600 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Deep Dive */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-gold-500 font-semibold">自我认知 & 特质</label>
          <textarea
            name="traits"
            value={formData.traits}
            onChange={handleChange}
            rows={3}
            placeholder="例如：我在深夜效率最高，容易焦虑，喜欢整理数据..."
            className="w-full bg-mystic-900 border border-mystic-600 rounded-lg p-3 text-white focus:border-gold-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-mystic-900 font-bold py-4 rounded-lg shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98] font-serif tracking-wider"
        >
          开始命盘解析
        </button>
      </form>
    </div>
  );
};

export default Onboarding;