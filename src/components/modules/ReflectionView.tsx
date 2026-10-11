'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Heart,
  Smile,
  Sparkles,
  Wind,
  Play,
  Pause,
  RotateCcw,
  Check,
  Calendar,
} from 'lucide-react';

export const ReflectionView: React.FC = () => {
  const { moodEntries, addMoodEntry } = useApp();

  const [selectedMood, setSelectedMood] = useState<'Calm' | 'Inspired' | 'Focused' | 'Tired' | 'Overwhelmed' | 'Joyful'>('Calm');
  const [gratitudeText, setGratitudeText] = useState('');
  const [reflectionText, setReflectionText] = useState('');
  const [energyLevel, setEnergyLevel] = useState<number>(4);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Breathing Timer state
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathSeconds, setBreathSeconds] = useState(60);

  useEffect(() => {
    let interval: any = null;
    if (breathingActive && breathSeconds > 0) {
      interval = setInterval(() => {
        setBreathSeconds(prev => prev - 1);
        // Phase cycle: 4s Inhale, 4s Hold, 4s Exhale
        const elapsed = 60 - breathSeconds;
        const cycle = elapsed % 12;
        if (cycle < 4) setBreathPhase('Inhale');
        else if (cycle < 8) setBreathPhase('Hold');
        else setBreathPhase('Exhale');
      }, 1000);
    } else if (breathSeconds === 0) {
      setBreathingActive(false);
    }
    return () => clearInterval(interval);
  }, [breathingActive, breathSeconds]);

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gratitudeText.trim()) return;
    addMoodEntry({
      mood: selectedMood,
      gratitude: gratitudeText.trim(),
      reflection: reflectionText.trim() || 'Peaceful progress today.',
      energyLevel,
    });
    setGratitudeText('');
    setReflectionText('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const moods = [
    { name: 'Calm' as const, emoji: '🌱', color: 'bg-botanical-100 text-botanical-700 dark:bg-botanical-800 dark:text-botanical-200' },
    { name: 'Inspired' as const, emoji: '✨', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
    { name: 'Focused' as const, emoji: '🎯', color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300' },
    { name: 'Joyful' as const, emoji: '☀️', color: 'bg-peach-100 text-peach-600 dark:bg-peach-900/40 dark:text-peach-300' },
    { name: 'Tired' as const, emoji: '🌙', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' },
    { name: 'Overwhelmed' as const, emoji: '🌊', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
  ];

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="border-b border-earth-200 dark:border-botanical-800 pb-6">
        <div className="flex items-center space-x-2 text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">
          <Heart className="w-4 h-4" />
          <span>Mindfulness & Reflection Sanctuary</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900 dark:text-cream-100">
          Reflection & Well-being
        </h1>
        <p className="text-xs sm:text-sm text-earth-600 dark:text-botanical-300 font-light mt-1">
          Pause, check in with your emotional garden, practice gratitude, and breathe.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left: Daily Reflection & Gratitude Form */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSaveReflection} className="p-8 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft space-y-6">

            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-cream-100">
                Daily Check-in
              </h2>
              {savedSuccess && (
                <span className="flex items-center space-x-1 text-xs font-bold text-botanical-600 dark:text-botanical-300">
                  <Check className="w-4 h-4" />
                  <span>Saved to Reflection Log</span>
                </span>
              )}
            </div>

            {/* Mood Picker */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-earth-700 dark:text-cream-200">
                How are you feeling right now?
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {moods.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setSelectedMood(m.name)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center space-y-1 ${
                      selectedMood === m.name
                        ? `${m.color} border-botanical-500 font-bold scale-105 shadow-sm`
                        : 'bg-cream-200 dark:bg-botanical-800 border-earth-200 text-earth-800 dark:text-cream-100 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className="text-xl">{m.emoji}</span>
                    <span className="text-[11px] font-semibold">{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gratitude Prompt */}
            <div>
              <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                What is 1 thing you are grateful for today?
              </label>
              <textarea
                placeholder="e.g. A peaceful morning cup of tea, progress on my code, or sunlight through the window..."
                value={gratitudeText}
                onChange={(e) => setGratitudeText(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500 h-24"
                required
              />
            </div>

            {/* General Reflection */}
            <div>
              <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                Daily Reflection & Growth Note (Optional)
              </label>
              <textarea
                placeholder="Write any thoughts, lessons, or feelings from today..."
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500 h-20"
              />
            </div>

            {/* Energy Slider */}
            <div>
              <div className="flex justify-between text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                <span>Energy Level</span>
                <span>{energyLevel} / 5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                className="w-full accent-botanical-500 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-botanical-500 hover:bg-botanical-600 text-cream-50 font-bold text-xs shadow-soft transition-all"
            >
              Save Daily Reflection
            </button>
          </form>
        </div>

        {/* Right: Guided 1-Minute Breathing Circle */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft text-center space-y-6">
            <div className="flex items-center justify-center space-x-2 text-xs font-bold text-teal-600 dark:text-teal-400">
              <Wind className="w-4 h-4" />
              <span>1-Minute Mindful Reset</span>
            </div>

            {/* Animated Pulsing Ring */}
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full bg-botanical-500/20 border-2 border-botanical-500 transition-all duration-1000 ${
                  breathingActive ? 'animate-breathe' : ''
                }`}
              />
              <div className="relative z-10 text-center space-y-1">
                <span className="font-serif text-3xl font-extrabold text-earth-900 dark:text-cream-100">
                  {breathSeconds}s
                </span>
                <p className="text-xs font-bold text-botanical-600 dark:text-botanical-300">
                  {breathingActive ? breathPhase : 'Ready'}
                </p>
              </div>
            </div>

            <p className="text-xs text-earth-600 dark:text-botanical-300 font-light leading-relaxed max-w-xs mx-auto">
              Slow down your breathing. Inhale calm, exhale tension.
            </p>

            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => setBreathingActive(!breathingActive)}
                className="px-6 py-3 rounded-2xl bg-botanical-500 text-cream-50 font-bold text-xs shadow-soft flex items-center space-x-2"
              >
                {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{breathingActive ? 'Pause' : 'Start Breathing'}</span>
              </button>

              <button
                onClick={() => {
                  setBreathingActive(false);
                  setBreathSeconds(60);
                }}
                className="p-3 rounded-2xl bg-cream-200 dark:bg-botanical-800 text-earth-700 dark:text-cream-200"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Past Mood Entries List */}
          <div className="p-6 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-cream-100">
              Recent Reflection Log
            </h3>

            <div className="space-y-3">
              {moodEntries.map((entry) => (
                <div key={entry.id} className="p-4 rounded-2xl bg-cream-200 dark:bg-botanical-800/80 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold text-earth-900 dark:text-cream-100">
                    <span>Mood: {entry.mood}</span>
                    <span className="text-earth-500 dark:text-botanical-300 font-normal">{entry.date}</span>
                  </div>
                  <p className="font-serif italic text-earth-700 dark:text-cream-200">
                    &ldquo;{entry.gratitude}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
