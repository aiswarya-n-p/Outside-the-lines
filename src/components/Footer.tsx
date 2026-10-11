'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sprout, Heart, Compass, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="mt-20 border-t border-earth-200 dark:border-botanical-800 bg-cream-300/60 dark:bg-botanical-950/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-botanical-500 text-cream-50 flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-earth-900 dark:text-cream-100">
                Outside the Lines
              </span>
            </div>
            <p className="text-sm text-earth-800 dark:text-cream-200 max-w-md leading-relaxed font-light">
              Because everyone&apos;s journey is different. A personalized editorial workspace for learning, personal growth, skill nurturing, and reflection.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs font-semibold text-botanical-700 dark:text-botanical-300">
              <span>Your journey is unique. Grow at your own pace. 🌱</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-serif text-base font-bold text-earth-900 dark:text-cream-100 mb-4">
              Explore Modules
            </h4>
            <ul className="space-y-2.5 text-xs text-earth-800 dark:text-cream-200 font-medium">
              <li>
                <button onClick={() => setActiveTab('journey')} className="hover:text-botanical-600 dark:hover:text-botanical-400 transition-colors flex items-center space-x-1">
                  <ArrowRight className="w-3 h-3 text-botanical-500" />
                  <span>My Journey Roadmap</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('skills')} className="hover:text-botanical-600 dark:hover:text-botanical-400 transition-colors flex items-center space-x-1">
                  <ArrowRight className="w-3 h-3 text-botanical-500" />
                  <span>Skill Progress</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('planner')} className="hover:text-botanical-600 dark:hover:text-botanical-400 transition-colors flex items-center space-x-1">
                  <ArrowRight className="w-3 h-3 text-botanical-500" />
                  <span>Daily & Weekly Planner</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('focus')} className="hover:text-botanical-600 dark:hover:text-botanical-400 transition-colors flex items-center space-x-1">
                  <ArrowRight className="w-3 h-3 text-botanical-500" />
                  <span>Distraction-Free Focus</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Knowledge & Resume */}
          <div>
            <h4 className="font-serif text-base font-bold text-earth-900 dark:text-cream-100 mb-4">
              Knowledge & Career
            </h4>
            <ul className="space-y-2.5 text-xs text-earth-800 dark:text-cream-200 font-medium">
              <li>
                <button onClick={() => setActiveTab('notes')} className="hover:text-botanical-600 dark:hover:text-botanical-400 transition-colors flex items-center space-x-1">
                  <ArrowRight className="w-3 h-3 text-peach-500" />
                  <span>Knowledge Notes</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('progress')} className="hover:text-botanical-600 dark:hover:text-botanical-400 transition-colors flex items-center space-x-1">
                  <ArrowRight className="w-3 h-3 text-peach-500" />
                  <span>Visual Analytics</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('reflection')} className="hover:text-botanical-600 dark:hover:text-botanical-400 transition-colors flex items-center space-x-1">
                  <ArrowRight className="w-3 h-3 text-peach-500" />
                  <span>Reflection & Mood</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('resumes')} className="hover:text-botanical-600 dark:hover:text-botanical-400 transition-colors flex items-center space-x-1">
                  <ArrowRight className="w-3 h-3 text-peach-500" />
                  <span>Resume Space</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-earth-200 dark:border-botanical-800 flex flex-col sm:flex-row items-center justify-between text-xs text-earth-500 dark:text-botanical-300">
          <p>© {new Date().getFullYear()} Outside the Lines. Crafted with warmth & care for continuous personal growth.</p>
          <div className="flex items-center space-x-1 mt-3 sm:mt-0 font-medium">
            <span>Designed for Aiswarya N. P.</span>
            <Heart className="w-3.5 h-3.5 text-peach-500 fill-peach-500 inline mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
