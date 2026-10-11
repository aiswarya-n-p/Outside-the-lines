'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Skill, CategoryTag } from '@/types';
import {
  Award,
  Plus,
  Clock,
  TrendingUp,
  Sparkles,
  Zap,
  BookOpen,
} from 'lucide-react';

export const SkillsView: React.FC = () => {
  const { skills, addSkill, updateSkillProgress } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryTag>('Tech');
  const [newLevel, setNewLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Master'>('Intermediate');

  const [selectedSkillForLog, setSelectedSkillForLog] = useState<Skill | null>(null);
  const [logHours, setLogHours] = useState<number>(1);
  const [newProgressVal, setNewProgressVal] = useState<number>(50);

  const filteredSkills = selectedFilter === 'All'
    ? skills
    : skills.filter(s => s.category === selectedFilter);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({
      name: newSkillName.trim(),
      category: newCategory,
      level: newLevel,
      progress: 25,
      hoursSpent: 10,
      lastPracticed: 'Today',
    });
    setNewSkillName('');
    setShowAddModal(false);
  };

  const handleUpdateProgress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSkillForLog) return;
    updateSkillProgress(selectedSkillForLog.id, newProgressVal, logHours);
    setSelectedSkillForLog(null);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-earth-200 dark:border-botanical-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
            <Award className="w-4 h-4" />
            <span>Nurture & Practice</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900 dark:text-cream-100">
            Skills & Mastery
          </h1>
          <p className="text-xs sm:text-sm text-earth-600 dark:text-botanical-300 font-light mt-1">
            Track your continuous practice, log study hours, and observe your skills bloom over time.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-botanical-500 hover:bg-botanical-600 text-cream-50 font-bold text-xs shadow-soft flex items-center space-x-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {['All', 'Tech', 'Design', 'Well-being', 'Career'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === cat
                ? 'bg-botanical-500 text-cream-50 shadow-soft'
                : 'bg-cream-100 dark:bg-botanical-900 text-earth-800 dark:text-cream-100 border border-earth-200 dark:border-botanical-800 hover:bg-cream-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((sk) => (
          <div
            key={sk.id}
            className="p-6 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft hover:shadow-soft-lg transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
                  {sk.level}
                </span>
                <span className="text-[11px] font-semibold text-earth-500 dark:text-botanical-300">
                  {sk.category}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-earth-900 dark:text-cream-100">
                {sk.name}
              </h3>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-earth-600 dark:text-botanical-300 font-medium">Proficiency</span>
                  <span className="font-bold text-botanical-600 dark:text-botanical-300">{sk.progress}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-earth-200 dark:bg-botanical-800 overflow-hidden">
                  <div
                    className="h-full bg-botanical-500 transition-all duration-500"
                    style={{ width: `${sk.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-earth-200 dark:border-botanical-800 flex items-center justify-between text-xs text-earth-500 dark:text-botanical-300">
              <div className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-botanical-500" />
                <span>{sk.hoursSpent} Hours Practiced</span>
              </div>

              <button
                onClick={() => {
                  setSelectedSkillForLog(sk);
                  setNewProgressVal(sk.progress);
                }}
                className="px-3 py-1.5 rounded-xl bg-cream-200 dark:bg-botanical-800 hover:bg-botanical-500 hover:text-cream-50 text-earth-800 dark:text-cream-100 font-bold transition-all flex items-center space-x-1"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Log Session</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-soft-lg">
            <h3 className="font-serif text-2xl font-bold text-earth-900 dark:text-cream-100">
              Add New Skill Card
            </h3>

            <form onSubmit={handleAddSkill} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tailwind CSS & Responsive Layouts"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e: any) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs font-semibold text-earth-900 dark:text-cream-100"
                >
                  <option value="Tech">Tech</option>
                  <option value="Design">Design</option>
                  <option value="Career">Career</option>
                  <option value="Well-being">Well-being</option>
                  <option value="Writing">Writing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Current Level
                </label>
                <select
                  value={newLevel}
                  onChange={(e: any) => setNewLevel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs font-semibold text-earth-900 dark:text-cream-100"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Master">Master</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-earth-600 dark:text-cream-200 hover:bg-earth-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-botanical-500 hover:bg-botanical-600 text-cream-50 font-bold text-xs shadow-soft"
                >
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Progress Modal */}
      {selectedSkillForLog && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-soft-lg">
            <div>
              <h3 className="font-serif text-2xl font-bold text-earth-900 dark:text-cream-100">
                Log Practice Session
              </h3>
              <p className="text-xs text-botanical-600 dark:text-botanical-300 font-bold mt-1">
                {selectedSkillForLog.name}
              </p>
            </div>

            <form onSubmit={handleUpdateProgress} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Hours Spent Today
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={logHours}
                  onChange={(e) => setLogHours(parseFloat(e.target.value) || 1)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs font-bold text-earth-900 dark:text-cream-100"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  <span>Updated Progress %</span>
                  <span>{newProgressVal}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newProgressVal}
                  onChange={(e) => setNewProgressVal(parseInt(e.target.value))}
                  className="w-full accent-botanical-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedSkillForLog(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-earth-600 dark:text-cream-200 hover:bg-earth-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-botanical-500 hover:bg-botanical-600 text-cream-50 font-bold text-xs shadow-soft"
                >
                  Save Progress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
