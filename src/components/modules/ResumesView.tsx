'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { Resume } from '@/types';
import {
  FileText,
  Plus,
  Copy,
  Download,
  Trash2,
  Check,
  X,
  Eye,
  Upload,
  FileBadge,
  ExternalLink,
} from 'lucide-react';

export const ResumesView: React.FC = () => {
  const { resumes, addResume, deleteResume, updateResumePdf } = useApp();

  const [selectedResumeModal, setSelectedResumeModal] = useState<Resume | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pdfViewerId, setPdfViewerId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [summary, setSummary] = useState('');
  const [skillsInput, setSkillsInput] = useState('React, Next.js, TypeScript, Tailwind CSS, Node.js');

  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleCopySummary = (res: Resume) => {
    navigator.clipboard.writeText(`${res.title} - ${res.targetRole}\n\nSummary:\n${res.summary}\n\nSkills:\n${res.skills.join(', ')}`);
    setCopiedId(res.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePdfUpload = (resumeId: string, file: File) => {
    if (!file || file.type !== 'application/pdf') return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      updateResumePdf(resumeId, dataUrl, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePdf = (resumeId: string) => {
    updateResumePdf(resumeId, undefined, undefined);
    if (pdfViewerId === resumeId) setPdfViewerId(null);
  };

  const handleDownloadPdf = (res: Resume) => {
    if (!res.pdfUrl || !res.pdfName) return;
    const a = document.createElement('a');
    a.href = res.pdfUrl;
    a.download = res.pdfName;
    a.click();
  };

  // keep modal in sync when resumes state updates (e.g. after pdf upload)
  const syncedModal = selectedResumeModal
    ? resumes.find((r) => r.id === selectedResumeModal.id) ?? null
    : null;

  const handleCreateResume = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !targetRole.trim()) return;
    const skillsArray = skillsInput.split(',').map(s => s.trim()).filter(Boolean);

    addResume({
      title: title.trim(),
      targetRole: targetRole.trim(),
      summary: summary.trim() || 'Passionate professional focused on quality, growth, and continuous learning.',
      skills: skillsArray.length > 0 ? skillsArray : ['Frontend', 'React'],
      experiences: [
        {
          title: targetRole.trim(),
          company: 'Outside the Lines Studio',
          period: '2024 - Present',
          role: targetRole.trim(),
          bullets: [
            'Architected high-performance web applications using modern React and TypeScript.',
            'Collaborated on editorial design systems and user-centric features.'
          ]
        }
      ],
      projects: ['Outside the Lines Personal OS', 'Botanical Design System'],
    });

    setTitle('');
    setTargetRole('');
    setSummary('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-earth-200 dark:border-botanical-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
            <FileText className="w-4 h-4" />
            <span>Multi-Role Career Repository</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth-900 dark:text-cream-100">
            Resume Space
          </h1>
          <p className="text-xs sm:text-sm text-earth-600 dark:text-botanical-300 font-light mt-1">
            Organize tailored resumes for different career paths, target roles, and opportunities.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="px-5 py-3 rounded-2xl bg-botanical-500 hover:bg-botanical-600 text-cream-50 font-bold text-xs shadow-soft flex items-center space-x-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Resume Profile</span>
        </button>
      </div>

      {/* Resumes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {resumes.map((res) => (
          <div
            key={res.id}
            className="p-8 rounded-3xl bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 shadow-soft hover:shadow-soft-lg transition-all space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-earth-200 dark:border-botanical-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-botanical-600 dark:text-botanical-400">
                    Target Role: {res.targetRole}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-earth-900 dark:text-cream-100">
                    {res.title}
                  </h3>
                </div>

                <button
                  onClick={() => deleteResume(res.id)}
                  className="p-2 rounded-xl text-earth-400 hover:text-rose-500 hover:bg-cream-200 dark:hover:bg-botanical-800 transition-colors"
                  title="Delete Profile"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-earth-600 dark:text-botanical-300 font-light leading-relaxed">
                {res.summary}
              </p>

              {/* Skills Tags */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-earth-500 uppercase tracking-wider">
                  Highlighted Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {res.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-botanical-100 dark:bg-botanical-800 text-botanical-700 dark:text-botanical-300 text-xs font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects highlight */}
              {res.projects && (
                <div className="text-xs text-earth-500 dark:text-botanical-300">
                  <span className="font-bold text-earth-700 dark:text-cream-200">Key Projects: </span>
                  <span>{res.projects.join(' • ')}</span>
                </div>
              )}

              {/* PDF attachment badge */}
              {res.pdfUrl && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                  <FileBadge className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold truncate flex-1">
                    {res.pdfName}
                  </span>
                  <button
                    onClick={() => handleDownloadPdf(res)}
                    title="Download PDF"
                    className="p-1 rounded-lg text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleRemovePdf(res.id)}
                    title="Remove PDF"
                    className="p-1 rounded-lg text-earth-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-earth-200 dark:border-botanical-800 flex items-center justify-between text-xs text-earth-500 dark:text-botanical-300">
              <span>Updated: {res.lastUpdated}</span>

              <div className="flex items-center space-x-2">
                {/* Hidden file input per card */}
                <input
                  ref={(el) => { fileInputRefs.current[res.id] = el; }}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePdfUpload(res.id, file);
                    e.target.value = '';
                  }}
                />
                <button
                  onClick={() => fileInputRefs.current[res.id]?.click()}
                  className="px-3 py-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors flex items-center space-x-1"
                  title={res.pdfUrl ? 'Replace PDF' : 'Upload PDF'}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{res.pdfUrl ? 'Replace' : 'PDF'}</span>
                </button>

                <button
                  onClick={() => handleCopySummary(res)}
                  className="px-3 py-1.5 rounded-xl bg-cream-200 dark:bg-botanical-800 text-earth-800 dark:text-cream-100 font-bold hover:bg-earth-200 transition-colors flex items-center space-x-1"
                >
                  {copiedId === res.id ? <Check className="w-3.5 h-3.5 text-botanical-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === res.id ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={() => setSelectedResumeModal(res)}
                  className="px-3 py-1.5 rounded-xl bg-botanical-500 text-cream-50 font-bold hover:bg-botanical-600 transition-colors flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Resume Preview Modal */}
      {syncedModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 rounded-3xl p-8 max-w-3xl w-full space-y-6 shadow-soft-lg max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between border-b border-earth-200 dark:border-botanical-800 pb-4">
              <div>
                <span className="text-xs font-bold text-botanical-600 dark:text-botanical-400">
                  Target: {syncedModal.targetRole}
                </span>
                <h2 className="font-serif text-2xl font-bold text-earth-900 dark:text-cream-100">
                  {syncedModal.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedResumeModal(null)}
                className="p-2 rounded-xl text-earth-500 hover:bg-cream-200 dark:hover:bg-botanical-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Resume Content Body */}
            <div className="p-8 rounded-2xl bg-cream-50 dark:bg-botanical-950 border border-earth-200 dark:border-botanical-800 space-y-6 font-sans">

              <div>
                <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-cream-100 mb-1">
                  Professional Summary
                </h3>
                <p className="text-xs sm:text-sm text-earth-700 dark:text-cream-200 leading-relaxed font-light">
                  {syncedModal.summary}
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-cream-100 mb-2">
                  Skills &amp; Technical Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {syncedModal.skills.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-botanical-100 text-botanical-800 text-xs font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {syncedModal.experiences && (
                <div>
                  <h3 className="font-serif text-lg font-bold text-earth-900 dark:text-cream-100 mb-3">
                    Experience &amp; Achievements
                  </h3>
                  <div className="space-y-4">
                    {syncedModal.experiences.map((exp, idx) => (
                      <div key={idx} className="space-y-2 text-xs">
                        <div className="flex justify-between font-bold text-earth-900 dark:text-cream-100">
                          <span>{exp.title} — {exp.company}</span>
                          <span className="text-earth-500">{exp.period}</span>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-earth-700 dark:text-cream-200 pl-2">
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PDF Section */}
            {syncedModal.pdfUrl ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-earth-700 dark:text-cream-200">
                    <FileBadge className="w-4 h-4 text-indigo-500" />
                    <span className="truncate max-w-[200px]">{syncedModal.pdfName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPdfViewerId(pdfViewerId === syncedModal.id ? null : syncedModal.id)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold text-xs hover:bg-indigo-200 transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {pdfViewerId === syncedModal.id ? 'Hide PDF' : 'View PDF'}
                    </button>
                    <button
                      onClick={() => handleDownloadPdf(syncedModal)}
                      className="px-3 py-1.5 rounded-xl bg-botanical-500 text-cream-50 font-bold text-xs hover:bg-botanical-600 transition-colors flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </button>
                  </div>
                </div>

                {pdfViewerId === syncedModal.id && (
                  <div className="rounded-2xl overflow-hidden border border-indigo-200 dark:border-indigo-800 shadow-soft">
                    <iframe
                      src={syncedModal.pdfUrl}
                      title={syncedModal.pdfName}
                      className="w-full h-[500px] bg-white"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-dashed border-earth-300 dark:border-botanical-700">
                <Upload className="w-5 h-5 text-earth-400" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-earth-600 dark:text-botanical-300">No PDF attached</p>
                  <p className="text-[10px] text-earth-400">Attach a PDF resume to view and download it here.</p>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  id={`modal-pdf-${syncedModal.id}`}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handlePdfUpload(syncedModal.id, file);
                    e.target.value = '';
                  }}
                />
                <label
                  htmlFor={`modal-pdf-${syncedModal.id}`}
                  className="px-4 py-2 rounded-xl bg-indigo-500 text-cream-50 font-bold text-xs cursor-pointer hover:bg-indigo-600 transition-colors"
                >
                  Upload PDF
                </label>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => handleCopySummary(syncedModal)}
                className="px-5 py-2.5 rounded-xl bg-botanical-500 text-cream-50 font-bold text-xs shadow-soft"
              >
                Copy Resume Details
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add Resume Profile Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-100 dark:bg-botanical-900 border border-earth-200 dark:border-botanical-800 rounded-3xl p-8 max-w-lg w-full space-y-6 shadow-soft-lg">
            <h3 className="font-serif text-2xl font-bold text-earth-900 dark:text-cream-100">
              Create Resume Profile
            </h3>

            <form onSubmit={handleCreateResume} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Profile Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Frontend & React Specialist"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Target Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Next.js, TypeScript, Tailwind CSS"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-earth-700 dark:text-cream-200 mb-1">
                  Summary
                </label>
                <textarea
                  placeholder="Write a brief intro tailored for this target role..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-200 dark:bg-botanical-800 border border-earth-200 dark:border-botanical-700 text-xs text-earth-900 dark:text-cream-100 focus:outline-none focus:border-botanical-500 h-24"
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
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
