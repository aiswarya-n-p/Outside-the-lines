'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import confetti from 'canvas-confetti';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CloudRain,
  Trees,
  Wind,
  Coffee,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const FocusView: React.FC = () => {
  const { tasks } = useApp();
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [focusGoal, setFocusGoal] = useState('Mastering Next.js App Router & Editorial Layouts');

  // Ambient Sound Ambient Toggle
  const [activeSound, setActiveSound] = useState<'rain' | 'birds' | 'wind' | 'cafe' | 'none'>('rain');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setIsActive(false);
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#4A7C59', '#E07A5F', '#CADA84'],
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const setPreset = (mins: number) => {
    setIsActive(false);
    setMinutes(mins);
    setSeconds(0);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = (m: number, s: number) => {
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const ambientSounds = [
    { id: 'rain' as const, name: 'Garden Rain', icon: CloudRain, color: 'text-blue-500' },
    { id: 'birds' as const, name: 'Forest Birds', icon: Trees, color: 'text-emerald-500' },
    { id: 'wind' as const, name: 'Gentle Wind', icon: Wind, color: 'text-teal-500' },
    { id: 'cafe' as const, name: 'Botanical Cafe', icon: Coffee, color: 'text-amber-600' },
  ];

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="border-b border-earth-200 dark:border-botanical-800 pb-6 text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-teal-600 dark:text-teal-400">
          <Timer className="w-4 h-4" />
          <span>Distraction-Free Sanctuary</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900 dark:text-cream-100">
          Botanical Focus Mode
        </h1>
        <p className="text-xs sm:text-sm text-earth-600 dark:text-botanical-300 font-light">
          Set your intent, immerse in gentle garden soundscapes, and let deep work flow naturally.
        </p>
      </div>

      {/* Main Focus Card Container */}
      <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-4xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft-lg space-y-8 text-center relative overflow-hidden">

        {/* Preset Selector Pills */}
        <div className="flex items-center justify-center space-x-2">
          {[
            { label: '25m Focus', mins: 25 },
            { label: '5m Short Break', mins: 5 },
            { label: '15m Long Break', mins: 15 },
            { label: '45m Deep Work', mins: 45 },
          ].map((p) => (
            <button
              key={p.mins}
              onClick={() => setPreset(p.mins)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                minutes === p.mins && seconds === 0
                  ? 'bg-botanical-500 text-cream-50 shadow-soft'
                  : 'bg-cream-200 dark:bg-botanical-800 text-earth-800 dark:text-cream-100 hover:bg-earth-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Big Timer Display */}
        <div className="space-y-4">
          <div className="font-serif text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-earth-900 dark:text-cream-100 select-none">
            {formatTime(minutes, seconds)}
          </div>

          {/* Goal Input Binder */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="What are you focusing on during this session?"
              value={focusGoal}
              onChange={(e) => setFocusGoal(e.target.value)}
              className="w-full text-center px-4 py-2.5 rounded-2xl bg-cream-200/80 dark:bg-botanical-800/80 border border-earth-200 dark:border-botanical-700 text-xs font-medium text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500"
            />
          </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className="px-8 py-4 rounded-2xl bg-botanical-500 hover:bg-botanical-600 text-cream-50 font-extrabold text-sm shadow-soft-lg hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isActive ? 'Pause Session' : 'Start Focus'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="p-4 rounded-2xl bg-cream-200 dark:bg-botanical-800 text-earth-700 dark:text-cream-200 hover:bg-earth-200 transition-colors"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Ambient Soundscapes Selector */}
        <div className="pt-6 border-t border-earth-200 dark:border-botanical-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-earth-700 dark:text-cream-200 max-w-md mx-auto">
            <span>Ambient Garden Soundscapes</span>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center space-x-1 text-botanical-600 dark:text-botanical-300"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
              <span>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
            {ambientSounds.map((snd) => {
              const Icon = snd.icon;
              const isSelected = activeSound === snd.id;
              return (
                <button
                  key={snd.id}
                  onClick={() => setActiveSound(snd.id)}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
                    isSelected && !isMuted
                      ? 'bg-botanical-100 dark:bg-botanical-800 border-botanical-500 text-botanical-700 dark:text-botanical-200 shadow-sm'
                      : 'bg-cream-200 dark:bg-botanical-800/40 border-earth-200 dark:border-botanical-800 text-earth-600 dark:text-cream-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${snd.color}`} />
                  <span>{snd.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
