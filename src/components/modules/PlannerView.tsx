'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  Filter,
  CheckSquare,
} from 'lucide-react';
import { CategoryTag } from '@/types';

export const PlannerView: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useApp();
  const [plannerTab, setPlannerTab] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryTag>('Tech');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [duration, setDuration] = useState<number>(30);

  const filteredTasks = tasks.filter(t => {
    if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
    return true;
  });

  const handleToggle = (id: string, currentStatus: boolean) => {
    toggleTask(id);
    if (!currentStatus) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4A7C59', '#E07A5F', '#8FAD88'],
      });
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({
      title: title.trim(),
      category,
      date: new Date().toISOString().split('T')[0],
      priority,
      completed: false,
      durationMinutes: duration,
    });
    setTitle('');
    setShowAddForm(false);
  };

  const completedCount = filteredTasks.filter(t => t.completed).length;

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-earth-200 dark:border-botanical-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-botanical-600 dark:text-botanical-300 mb-1">
            <CalendarIcon className="w-4 h-4" />
            <span>Structured Daily Harmony</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900 dark:text-cream-100">
            Planner & Schedules
          </h1>
          <p className="text-xs sm:text-sm text-earth-600 dark:text-botanical-300 font-light mt-1">
            Organize daily focus blocks, weekly targets, and monthly milestones peacefully.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="px-5 py-3 rounded-2xl bg-botanical-500 hover:bg-botanical-600 text-cream-50 font-bold text-xs shadow-soft flex items-center space-x-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Task Entry</span>
        </button>
      </div>

      {/* View Switcher & Category Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        {/* Daily / Weekly / Monthly Switch */}
        <div className="flex items-center space-x-1 p-1 bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 rounded-2xl">
          {(['Daily', 'Weekly', 'Monthly'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setPlannerTab(mode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                plannerTab === mode
                  ? 'bg-botanical-500 text-cream-50 shadow-soft'
                  : 'text-earth-700 dark:text-cream-200 hover:bg-cream-200 dark:hover:bg-botanical-800'
              }`}
            >
              {mode} Planner
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {['All', 'Tech', 'Design', 'Career', 'Well-being'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-peach-500 text-cream-50 font-bold shadow-sm'
                  : 'bg-cream-200 dark:bg-botanical-800 text-earth-800 dark:text-cream-100 hover:bg-earth-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Task Creation Form Drawer */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="p-6 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft space-y-4">
          <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-cream-100">
            Add New Focus Item
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Task title or focus summary..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="md:col-span-2 px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500"
              required
            />

            <select
              value={category}
              onChange={(e: any) => setCategory(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs font-semibold text-earth-900 dark:text-cream-100"
            >
              <option value="Tech">Tech</option>
              <option value="Design">Design</option>
              <option value="Career">Career</option>
              <option value="Well-being">Well-being</option>
              <option value="Writing">Writing</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center space-x-4 text-xs font-bold text-earth-700 dark:text-cream-200">
              <div className="flex items-center space-x-2">
                <span>Priority:</span>
                <select
                  value={priority}
                  onChange={(e: any) => setPriority(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 text-xs font-bold"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span>Duration (min):</span>
                <input
                  type="number"
                  value={duration}
                  step="5"
                  onChange={(e) => setDuration(parseInt(e.target.value) || 15)}
                  className="w-20 px-3 py-1.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 text-xs font-bold"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-earth-600 dark:text-cream-200 hover:bg-earth-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-botanical-500 hover:bg-botanical-600 text-cream-50 font-bold text-xs shadow-soft"
              >
                Save Task
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Main Task List View */}
      <div className="p-7 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft space-y-6">

        <div className="flex items-center justify-between border-b border-earth-200 dark:border-botanical-800 pb-4">
          <div className="flex items-center space-x-3">
            <CheckSquare className="w-5 h-5 text-botanical-500" />
            <h2 className="font-serif text-xl font-bold text-earth-900 dark:text-cream-100">
              {plannerTab} Task Schedule
            </h2>
          </div>
          <span className="text-xs font-bold text-earth-500 dark:text-botanical-300">
            Completed: {completedCount} / {filteredTasks.length}
          </span>
        </div>

        <div className="space-y-3">
          {filteredTasks.map((t) => (
            <div
              key={t.id}
              className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                t.completed
                  ? 'bg-botanical-50/50 dark:bg-botanical-950/50 border-botanical-200 dark:border-botanical-800 opacity-80'
                  : 'bg-cream-200 dark:bg-botanical-800/80 border-earth-200 dark:border-botanical-700 hover:border-botanical-400'
              }`}
            >
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => handleToggle(t.id, t.completed)}
                  className="text-botanical-500 hover:scale-110 transition-transform"
                >
                  {t.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-botanical-500 fill-botanical-100" />
                  ) : (
                    <Circle className="w-6 h-6 text-earth-400" />
                  )}
                </button>
                <div>
                  <h4 className={`text-sm font-semibold ${t.completed ? 'line-through text-earth-500 dark:text-botanical-400' : 'text-earth-900 dark:text-cream-100'}`}>
                    {t.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-[11px] text-earth-500 dark:text-botanical-300 mt-0.5">
                    <span className="font-bold text-botanical-600 dark:text-botanical-300">
                      {t.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{t.durationMinutes}m</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                  t.priority === 'high'
                    ? 'bg-peach-100 text-peach-600 dark:bg-peach-900/40 dark:text-peach-300'
                    : t.priority === 'medium'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                }`}>
                  {t.priority}
                </span>

                <button
                  onClick={() => deleteTask(t.id)}
                  className="p-1.5 rounded-lg text-earth-400 hover:text-rose-500 hover:bg-earth-200 dark:hover:bg-botanical-700 transition-colors"
                  title="Delete Task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
