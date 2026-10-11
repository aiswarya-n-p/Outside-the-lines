'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import {
  Sprout,
  Compass,
  Award,
  Calendar,
  BookOpen,
  TrendingUp,
  Heart,
  Timer,
  FileText,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Sun,
  ShieldCheck,
  Feather,
} from 'lucide-react';

export const LandingView: React.FC = () => {
  const { setActiveTab } = useApp();

  const features = [
    {
      tab: 'journey' as const,
      title: 'My Journey',
      desc: 'Interactive roadmap where you plot your milestones, goals, and learning stages.',
      icon: Compass,
      color: 'bg-peach-100 text-peach-600 dark:bg-peach-900/40 dark:text-peach-300',
    },
    {
      tab: 'skills' as const,
      title: 'Skill Progress',
      desc: 'Visual cards to log practice hours, target proficiency, and skill mastery.',
      icon: Award,
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    },
    {
      tab: 'planner' as const,
      title: 'Planner',
      desc: 'Clean daily, weekly, and monthly planner with interactive task completion.',
      icon: Calendar,
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    },
    {
      tab: 'notes' as const,
      title: 'Notes & Knowledge',
      desc: 'Searchable space for revision, interview prep, project ideas, and study notes.',
      icon: BookOpen,
      color: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    },
    {
      tab: 'progress' as const,
      title: 'Analytics & Consistency',
      desc: 'Activity charts, milestone trophies, and streak heatmaps to celebrate growth.',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    },
    {
      tab: 'reflection' as const,
      title: 'Reflection & Well-being',
      desc: 'Calm mood check-ins, gratitude journaling, and 1-minute guided breathing.',
      icon: Heart,
      color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
    },
    {
      tab: 'focus' as const,
      title: 'Focus Timer',
      desc: 'Distraction-free Pomodoro timer paired with ambient botanical garden soundscapes.',
      icon: Timer,
      color: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
    },
    {
      tab: 'resumes' as const,
      title: 'Resume Space',
      desc: 'Organize custom resume profiles tailored for different career paths.',
      icon: FileText,
      color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
    },
  ];

  return (
    <div className="space-y-20">

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 p-6 sm:p-12 shadow-soft">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">

            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-botanical-100 dark:bg-botanical-800 text-botanical-700 dark:text-botanical-200 text-xs font-bold border border-botanical-200 dark:border-botanical-700">
              <Sparkles className="w-4 h-4 text-botanical-500 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Personal Learning & Productivity OS</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-earth-900 dark:text-cream-100 leading-[1.15]">
              Outside the Lines
            </h1>

            <p className="font-serif italic text-xl sm:text-2xl text-peach-600 dark:text-peach-400 font-medium">
              “Because everyone&apos;s journey is different.”
            </p>

            <p className="text-base sm:text-lg text-earth-800 dark:text-cream-200 leading-relaxed max-w-2xl font-light">
              Step away from generic productivity tools. Welcome to a warm, editorial workspace designed to help you build your own learning path, stay consistent, and grow at your own pace — without feeling overwhelmed.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setActiveTab('journey')}
                className="px-7 py-3.5 rounded-2xl bg-botanical-500 hover:bg-botanical-600 text-cream-50 font-bold text-sm shadow-soft-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('planner')}
                className="px-7 py-3.5 rounded-2xl bg-cream-200 dark:bg-botanical-800 hover:bg-earth-200 dark:hover:bg-botanical-700 text-earth-900 dark:text-cream-100 font-semibold text-sm border border-earth-300 dark:border-botanical-700 transition-all flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-botanical-500" />
                <span>Open Daily Planner</span>
              </button>
            </div>

            {/* Core Message Badge */}
            <div className="pt-4 flex items-center space-x-3 text-xs text-earth-500 dark:text-botanical-300">
              <CheckCircle2 className="w-4 h-4 text-botanical-500" />
              <span>Light & Dark mode ready</span>
              <span className="opacity-40">•</span>
              <CheckCircle2 className="w-4 h-4 text-botanical-500" />
              <span>Offline persistence</span>
              <span className="opacity-40">•</span>
              <CheckCircle2 className="w-4 h-4 text-botanical-500" />
              <span>Distraction-free focus</span>
            </div>

          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl overflow-hidden border-4 border-cream-50 dark:border-botanical-800 shadow-soft-lg group">
              <Image
                src="/hero-girl.jpg"
                alt="Girl watering plants in a beautiful garden"
                width={600}
                height={700}
                priority
                className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Botanical Quote Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-card border border-white/40 shadow-lg text-earth-900 dark:text-cream-100">
                <div className="flex items-center space-x-2 mb-1 text-botanical-600 dark:text-botanical-300">
                  <Sprout className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Garden Philosophy</span>
                </div>
                <p className="font-serif italic text-sm text-earth-800 dark:text-cream-200">
                  “Plants don&apos;t bloom all year round. Allow yourself time and space to grow.”
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Core Principles */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900 dark:text-cream-100">
            Designed for Peaceful Growth
          </h2>
          <p className="text-sm sm:text-base text-earth-600 dark:text-botanical-300 font-light">
            Every feature in Outside the Lines is built to nurture your individual potential rather than push artificial burnout deadlines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 space-y-4 hover:shadow-soft transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-botanical-100 dark:bg-botanical-800 text-botanical-600 dark:text-botanical-300 flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-earth-900 dark:text-cream-100">
              Personalized Journeys
            </h3>
            <p className="text-sm text-earth-800 dark:text-cream-200 font-light leading-relaxed">
              Create custom roadmaps tailored to your unique interests, career switch, or competitive goals without comparing yourself to standard paths.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 space-y-4 hover:shadow-soft transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-peach-100 dark:bg-peach-900/40 text-peach-600 dark:text-peach-300 flex items-center justify-center">
              <Feather className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-earth-900 dark:text-cream-100">
              Consistency over Perfection
            </h3>
            <p className="text-sm text-earth-800 dark:text-cream-200 font-light leading-relaxed">
              Track daily habits, study streaks, and small wins. Progress is built block by block, step by step, with patience and delight.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 space-y-4 hover:shadow-soft transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-earth-900 dark:text-cream-100">
              Mental Well-being First
            </h3>
            <p className="text-sm text-earth-800 dark:text-cream-200 font-light leading-relaxed">
              Integrated daily reflections, mood check-ins, and distraction-free audio timers ensure your mind stays calm and resilient.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Navigation Grid */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-earth-200 dark:border-botanical-800 pb-6">
          <div>
            <h2 className="font-serif text-3xl font-bold text-earth-900 dark:text-cream-100">
              Explore Your OS Modules
            </h2>
            <p className="text-sm text-earth-600 dark:text-botanical-300 font-light mt-1">
              Select any section below to jump directly into that experience.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('journey')}
            className="text-xs font-bold text-botanical-600 dark:text-botanical-300 hover:underline flex items-center space-x-1"
          >
            <span>Explore All OS Modules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className="p-6 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 hover:border-botanical-400 dark:hover:border-botanical-600 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-2xl ${item.color} flex items-center justify-center font-bold`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-botanical-600 dark:text-botanical-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-cream-100 group-hover:text-botanical-600 dark:group-hover:text-botanical-400 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-earth-600 dark:text-botanical-300 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-botanical-500 text-cream-50 text-center space-y-4 shadow-soft-lg relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10 space-y-4">
          <Sprout className="w-10 h-10 mx-auto text-amber-200 animate-bounce" style={{ animationDuration: '4s' }} />
          <h2 className="font-serif text-2xl sm:text-3xl font-bold italic">
            “Your journey is unique. Grow at your own pace.” 🌱
          </h2>
          <p className="text-xs sm:text-sm text-cream-200 font-light">
            Start organizing your study goals, skills, notes, reflections, and resumes in one soothing workspace.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('journey')}
              className="px-8 py-3.5 rounded-2xl bg-cream-50 text-botanical-900 hover:bg-cream-200 font-bold text-sm shadow-md hover:scale-105 transition-all"
            >
              Explore My Journey
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
