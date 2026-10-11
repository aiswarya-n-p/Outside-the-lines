'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Note } from '@/types';
import {
  BookOpen,
  Search,
  Plus,
  Star,
  Trash2,
  Tag,
  Calendar,
  Sparkles,
  Bookmark,
  X,
  Eye,
} from 'lucide-react';

export const NotesView: React.FC = () => {
  const { notes, addNote, deleteNote, toggleFavoriteNote } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [activeNoteModal, setActiveNoteModal] = useState<Note | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Learning' | 'Revision' | 'Interview' | 'Project' | 'Personal'>('Learning');
  const [tagsInput, setTagsInput] = useState('React, Nextjs, Growth');

  const filteredNotes = notes.filter((n) => {
    if (selectedCategory !== 'All' && n.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchContent = n.content.toLowerCase().includes(q);
      const matchTags = n.tags.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchContent || matchTags;
    }
    return true;
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    addNote({
      title: title.trim(),
      content: content.trim(),
      category,
      tags: tagsArray.length > 0 ? tagsArray : ['General'],
      isFavorite: false,
    });
    setTitle('');
    setContent('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-earth-200 dark:border-botanical-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-sky-600 dark:text-sky-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Searchable Knowledge Space</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900 dark:text-cream-100">
            Notes & Revision Repository
          </h1>
          <p className="text-xs sm:text-sm text-earth-600 dark:text-botanical-300 font-light mt-1">
            Organize study takeaways, interview prep sheets, code snippets, and personal thoughts.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="px-5 py-3 rounded-2xl bg-botanical-500 hover:bg-botanical-600 text-cream-50 font-bold text-xs shadow-soft flex items-center space-x-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Note</span>
        </button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-earth-400" />
          <input
            type="text"
            placeholder="Search notes, tags, or concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500 shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {['All', 'Learning', 'Revision', 'Interview', 'Project', 'Personal'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-botanical-500 text-cream-50 font-bold shadow-sm'
                  : 'bg-cream-200 dark:bg-botanical-800 text-earth-800 dark:text-cream-100 hover:bg-earth-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="p-6 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft hover:shadow-soft-lg transition-all space-y-4 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300">
                  {note.category}
                </span>

                <button
                  onClick={() => toggleFavoriteNote(note.id)}
                  className="text-earth-400 hover:text-amber-500 transition-colors"
                >
                  <Star className={`w-4 h-4 ${note.isFavorite ? 'text-amber-500 fill-amber-500' : ''}`} />
                </button>
              </div>

              <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-cream-100 group-hover:text-botanical-600 dark:group-hover:text-botanical-400 transition-colors line-clamp-1">
                {note.title}
              </h3>

              <p className="text-xs text-earth-600 dark:text-botanical-300 font-light leading-relaxed line-clamp-3">
                {note.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {note.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-cream-200 dark:bg-botanical-800 text-[10px] font-medium text-earth-700 dark:text-cream-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-earth-200 dark:border-botanical-800 flex items-center justify-between text-xs text-earth-500 dark:text-botanical-300">
              <span className="text-[11px] font-medium">{note.date}</span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveNoteModal(note)}
                  className="p-1.5 rounded-lg text-earth-600 dark:text-cream-200 hover:bg-cream-200 dark:hover:bg-botanical-800 transition-colors flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold">Read</span>
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-1.5 rounded-lg text-earth-400 hover:text-rose-500 transition-colors"
                  title="Delete Note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Note Reader Modal */}
      {activeNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 rounded-3xl p-8 max-w-2xl w-full space-y-6 shadow-soft-lg max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-earth-200 dark:border-botanical-800 pb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                {activeNoteModal.category} Note
              </span>
              <button
                onClick={() => setActiveNoteModal(null)}
                className="p-1.5 rounded-xl text-earth-500 hover:bg-cream-200 dark:hover:bg-botanical-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-cream-100">
                {activeNoteModal.title}
              </h2>
              <div className="text-xs text-earth-500 dark:text-botanical-300">
                Written on {activeNoteModal.date}
              </div>
              <div className="p-6 rounded-2xl bg-cream-200 dark:bg-botanical-800 text-xs sm:text-sm text-earth-900 dark:text-cream-100 leading-relaxed whitespace-pre-wrap font-sans">
                {activeNoteModal.content}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {activeNoteModal.tags.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-full bg-botanical-100 dark:bg-botanical-800 text-botanical-700 dark:text-botanical-300 text-xs font-bold">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 rounded-3xl p-8 max-w-lg w-full space-y-6 shadow-soft-lg">
            <h3 className="font-serif text-2xl font-bold text-earth-900 dark:text-cream-100">
              Create New Knowledge Note
            </h3>

            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Note Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next.js App Router Architecture Cheatsheet"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs font-semibold text-earth-900 dark:text-cream-100"
                >
                  <option value="Learning">Learning</option>
                  <option value="Revision">Revision</option>
                  <option value="Interview">Interview</option>
                  <option value="Project">Project</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Nextjs, Architecture"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Content & Summary
                </label>
                <textarea
                  placeholder="Write your key takeaways, code notes, or interview pointers..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500 h-32"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
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
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
