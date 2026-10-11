'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import {
  TrendingUp,
  Award,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
  Trophy,
  BarChart3,
  PieChart,
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { tasks, streakCount, skills, journeys } = useApp();

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalHours = skills.reduce((acc, s) => acc + s.hoursSpent, 0);

  const trophies = [
    { title: '7-Day Garden Bloom', desc: 'Maintained consistency for 7 consecutive days', earned: streakCount >= 7, icon: '🌱' },
    { title: 'Deep Focus Master', desc: 'Logged over 50 hours of uninterrupted study', earned: totalHours >= 50, icon: '⌛' },
    { title: 'Roadmap Pioneer', desc: 'Completed a major milestone in your Journey', earned: true, icon: '🧭' },
    { title: 'Knowledge Architect', desc: 'Created multi-category notes and revision guides', earned: true, icon: '📚' },
  ];

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="border-b border-earth-200 dark:border-botanical-800 pb-6">
        <div className="flex items-center space-x-2 text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">
          <TrendingUp className="w-4 h-4" />
          <span>Visual Analytics & Consistency</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900 dark:text-cream-100">
          Progress & Achievements
        </h1>
        <p className="text-xs sm:text-sm text-earth-600 dark:text-botanical-300 font-light mt-1">
          Celebrate how your knowledge garden grows over time.
        </p>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="p-6 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-peach-100 dark:bg-peach-900/40 text-peach-600 dark:text-peach-300 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5" />
          </div>
          <div className="text-xs text-earth-500 dark:text-botanical-300 font-medium">Active Streak</div>
          <div className="font-serif text-3xl font-extrabold text-earth-900 dark:text-cream-100">
            {streakCount} Days
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-botanical-100 dark:bg-botanical-800 text-botanical-600 dark:text-botanical-300 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs text-earth-500 dark:text-botanical-300 font-medium">Tasks Completed</div>
          <div className="font-serif text-3xl font-extrabold text-earth-900 dark:text-cream-100">
            {completedTasks}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-xs text-earth-500 dark:text-botanical-300 font-medium">Total Study Hours</div>
          <div className="font-serif text-3xl font-extrabold text-earth-900 dark:text-cream-100">
            {totalHours}h
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="text-xs text-earth-500 dark:text-botanical-300 font-medium">Garden Badges</div>
          <div className="font-serif text-3xl font-extrabold text-earth-900 dark:text-cream-100">
            4 Unlocked
          </div>
        </div>

      </div>

      {/* 30-Day Activity Heatmap Grid */}
      <div className="p-7 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl font-bold text-earth-900 dark:text-cream-100">
            30-Day Activity Heatmap
          </h3>
          <span className="text-xs text-botanical-600 dark:text-botanical-300 font-bold">
            Consistency: High 🌱
          </span>
        </div>

        {/* 30 Box Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 pt-2">
          {Array.from({ length: 30 }).map((_, i) => {
            const isActive = i % 2 === 0 || i % 3 === 0;
            const opacityClass = isActive ? (i % 5 === 0 ? 'bg-botanical-600' : 'bg-botanical-400') : 'bg-earth-200 dark:bg-botanical-800';
            return (
              <div
                key={i}
                className={`h-9 rounded-xl ${opacityClass} flex items-center justify-center text-[10px] font-bold text-cream-50 hover:scale-105 transition-transform cursor-pointer`}
                title={`Day ${i + 1}: Activity logged`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trophies & Badges Section */}
      <div className="p-7 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft space-y-6">
        <h3 className="font-serif text-xl font-bold text-earth-900 dark:text-cream-100">
          Personal Growth Badges & Trophies
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {trophies.map((tr, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border flex items-center space-x-4 ${
                tr.earned
                  ? 'bg-cream-200 dark:bg-botanical-800/80 border-botanical-300 dark:border-botanical-700'
                  : 'bg-earth-100 dark:bg-botanical-950 opacity-50 border-earth-200'
              }`}
            >
              <div className="text-3xl p-3 rounded-2xl bg-cream-100 dark:bg-botanical-900 shadow-sm">
                {tr.icon}
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-earth-900 dark:text-cream-100">
                  {tr.title}
                </h4>
                <p className="text-xs text-earth-600 dark:text-botanical-300 font-light mt-0.5">
                  {tr.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
