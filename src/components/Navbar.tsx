'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ActiveTab } from '@/types';
import {
  Sun,
  Moon,
  Sprout,
  Compass,
  Award,
  Calendar,
  BookOpen,
  TrendingUp,
  Heart,
  Timer,
  FileText,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, darkMode, toggleDarkMode, streakCount } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: ActiveTab; label: string; icon: React.ElementType }[] = [
    { tab: 'landing', label: 'Home', icon: Sprout },
    { tab: 'journey', label: 'My Journey', icon: Compass },
    { tab: 'skills', label: 'Skills', icon: Award },
    { tab: 'planner', label: 'Planner', icon: Calendar },
    { tab: 'notes', label: 'Notes', icon: BookOpen },
    { tab: 'progress', label: 'Progress', icon: TrendingUp },
    { tab: 'reflection', label: 'Reflection', icon: Heart },
    { tab: 'focus', label: 'Focus Mode', icon: Timer },
    { tab: 'resumes', label: 'Resumes', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 bg-cream-200/90 dark:bg-botanical-900/90 backdrop-blur-md border-b border-earth-200 dark:border-botanical-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('landing')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-botanical-500 text-cream-50 flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform duration-300">
              <Sprout className="w-6 h-6 animate-pulse-subtle" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-earth-900 dark:text-cream-100 group-hover:text-botanical-600 dark:group-hover:text-botanical-400 transition-colors">
                Outside the Lines
              </span>
              <p className="text-[11px] text-earth-500 dark:text-botanical-300 tracking-wide uppercase font-medium">
                Grow at your own pace 🌱
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 overflow-x-auto py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-botanical-500 text-cream-50 shadow-soft font-bold'
                      : 'text-earth-800 dark:text-cream-200 hover:bg-earth-100 dark:hover:bg-botanical-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cream-50' : 'text-botanical-600 dark:text-botanical-300'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Streak Badge */}
            <div
              onClick={() => setActiveTab('progress')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-peach-100 dark:bg-peach-600/20 text-peach-600 dark:text-peach-300 text-xs font-bold border border-peach-200 dark:border-peach-500/30 cursor-pointer hover:scale-105 transition-transform"
              title="Current streak"
            >
              <Sparkles className="w-3.5 h-3.5 text-peach-500 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{streakCount} Day Streak</span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-earth-100 dark:bg-botanical-800 text-earth-800 dark:text-cream-100 hover:bg-earth-200 dark:hover:bg-botanical-700 transition-colors shadow-sm"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-botanical-700" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-earth-100 dark:bg-botanical-800 text-earth-800 dark:text-cream-100"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-botanical-700" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-earth-800 dark:text-cream-100 hover:bg-earth-100 dark:hover:bg-botanical-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-earth-200 dark:border-botanical-800 bg-cream-100 dark:bg-botanical-900 px-4 pt-3 pb-6 space-y-2">
          <div className="flex items-center justify-between pb-3 border-b border-earth-200 dark:border-botanical-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-earth-500">Navigation</span>
            <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-peach-100 text-peach-600 text-xs font-bold">
              🔥 {streakCount} Days Active
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => {
                    setActiveTab(item.tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 p-3 rounded-xl text-xs font-semibold text-left transition-all ${
                    isActive
                      ? 'bg-botanical-500 text-cream-50 font-bold shadow-sm'
                      : 'bg-cream-200 dark:bg-botanical-800/80 text-earth-800 dark:text-cream-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
