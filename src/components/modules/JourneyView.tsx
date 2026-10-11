'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Compass,
  Sprout,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Calendar,
  Layers,
  CheckSquare,
  Square,
} from 'lucide-react';

export const JourneyView: React.FC = () => {
  const { journeys, toggleMilestoneStatus, addJourney } = useApp();
  const [selectedJourneyId, setSelectedJourneyId] = useState<string>(journeys[0]?.id || '');

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'Tech' | 'Design' | 'Career' | 'Writing'>('Tech');

  const activeJourney = journeys.find(j => j.id === selectedJourneyId) || journeys[0];

  const handleCreateJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addJourney({
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom learning path built step by step.',
      category: newCategory,
      icon: 'Sprout',
      color: '#4A7C59',
      milestones: [
        {
          id: 'm_' + Date.now(),
          journeyId: '',
          title: 'Initial Foundation & Discovery',
          description: 'Set goals and outline core skills to practice.',
          status: 'in-progress',
          targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          subtasks: [
            { id: 'st_1', title: 'Define 3 key learning outcomes', completed: false },
            { id: 'st_2', title: 'Gather study resources and notes', completed: false },
          ]
        }
      ]
    });
    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-earth-200 dark:border-botanical-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-botanical-600 dark:text-botanical-300 mb-1">
            <Compass className="w-4 h-4" />
            <span>Visual Learning Roadmap</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900 dark:text-cream-100">
            My Journey & Milestones
          </h1>
          <p className="text-xs sm:text-sm text-earth-600 dark:text-botanical-300 font-light mt-1">
            Plot your unique learning path, break goals into gentle milestones, and celebrate every step.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-botanical-500 hover:bg-botanical-600 text-cream-50 font-bold text-xs shadow-soft flex items-center space-x-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Journey Path</span>
        </button>
      </div>

      {/* Path Selector Pills */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2">
        {journeys.map((j) => (
          <button
            key={j.id}
            onClick={() => setSelectedJourneyId(j.id)}
            className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-2 ${
              selectedJourneyId === j.id
                ? 'bg-botanical-500 text-cream-50 shadow-soft'
                : 'bg-cream-100 dark:bg-botanical-900 text-earth-800 dark:text-cream-100 border border-earth-200 dark:border-botanical-800 hover:bg-cream-200'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>{j.title}</span>
          </button>
        ))}
      </div>

      {/* Main Journey Detail */}
      {activeJourney && (
        <div className="space-y-8">

          {/* Journey Overview Card */}
          <div className="p-8 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-peach-600 dark:text-peach-400">
              <Sparkles className="w-4 h-4" />
              <span>{activeJourney.category} Domain Path</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-cream-100">
              {activeJourney.title}
            </h2>
            <p className="text-sm text-earth-600 dark:text-botanical-300 font-light max-w-3xl leading-relaxed">
              {activeJourney.description}
            </p>
          </div>

          {/* Visual Roadmap Flow */}
          <div className="relative space-y-6 before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-botanical-200 dark:before:bg-botanical-800">
            {activeJourney.milestones.map((ms, index) => {
              const isDone = ms.status === 'completed';
              const isInProgress = ms.status === 'in-progress';

              return (
                <div key={ms.id} className="relative pl-14 group">

                  {/* Node Circle */}
                  <div
                    onClick={() => toggleMilestoneStatus(activeJourney.id, ms.id)}
                    className={`absolute left-2.5 top-1 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                      isDone
                        ? 'bg-botanical-500 border-botanical-500 text-cream-50 shadow-soft scale-110'
                        : isInProgress
                        ? 'bg-amber-100 dark:bg-amber-900/60 border-amber-500 text-amber-700 animate-pulse'
                        : 'bg-cream-100 dark:bg-botanical-900 border-earth-300 text-earth-400'
                    }`}
                    title="Click to toggle status"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>

                  {/* Milestone Card */}
                  <div className="p-6 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft hover:shadow-soft-lg transition-all space-y-4">

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-earth-200 dark:border-botanical-800 pb-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-earth-500 dark:text-botanical-300">
                          Milestone {index + 1}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-earth-900 dark:text-cream-100">
                          {ms.title}
                        </h3>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-xs text-earth-500 dark:text-botanical-300 font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Target: {ms.targetDate}</span>
                        </div>
                        <button
                          onClick={() => toggleMilestoneStatus(activeJourney.id, ms.id)}
                          className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all ${
                            isDone
                              ? 'bg-botanical-100 dark:bg-botanical-800 text-botanical-700 dark:text-botanical-300'
                              : isInProgress
                              ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                              : 'bg-cream-200 dark:bg-botanical-800 text-earth-600 dark:text-cream-200'
                          }`}
                        >
                          {ms.status.replace('-', ' ')}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-earth-600 dark:text-botanical-300 font-light leading-relaxed">
                      {ms.description}
                    </p>

                    {/* Subtasks checklist */}
                    {ms.subtasks && ms.subtasks.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <span className="text-[11px] font-bold text-earth-500 uppercase tracking-wider">
                          Key Sub-goals
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {ms.subtasks.map((st) => (
                            <div
                              key={st.id}
                              className="flex items-center space-x-2 text-xs text-earth-800 dark:text-cream-200 p-2 rounded-xl bg-cream-200 dark:bg-botanical-800/60"
                            >
                              {st.completed ? (
                                <CheckSquare className="w-4 h-4 text-botanical-500" />
                              ) : (
                                <Square className="w-4 h-4 text-earth-400" />
                              )}
                              <span className={st.completed ? 'line-through opacity-70' : ''}>{st.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Add Journey Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-soft-lg">
            <h3 className="font-serif text-2xl font-bold text-earth-900 dark:text-cream-100">
              Create New Journey Path
            </h3>

            <form onSubmit={handleCreateJourney} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Journey Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Master AI & Machine Learning Fundamentals"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Category Domain
                </label>
                <select
                  value={newCategory}
                  onChange={(e: any) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs font-semibold text-earth-900 dark:text-cream-100"
                >
                  <option value="Tech">Tech & Coding</option>
                  <option value="Design">UI/UX & Editorial</option>
                  <option value="Writing">Writing & Publishing</option>
                  <option value="Career">Career Transformation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Vision & Description
                </label>
                <textarea
                  placeholder="Describe what success looks like for this learning journey..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500 h-24"
                />
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
                  Create Path
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
