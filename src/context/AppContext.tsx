'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ActiveTab,
  TaskItem,
  Journey,
  Skill,
  Note,
  MoodEntry,
  Resume,
} from '@/types';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  toggleDarkMode: () => void;

  // Tasks & Streaks
  tasks: TaskItem[];
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  streakCount: number;

  // Journeys
  journeys: Journey[];
  addJourney: (journey: Omit<Journey, 'id'>) => void;
  toggleMilestoneStatus: (journeyId: string, milestoneId: string) => void;

  // Skills
  skills: Skill[];
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkillProgress: (id: string, newProgress: number, addHours?: number) => void;

  // Notes
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'date'>) => void;
  deleteNote: (id: string) => void;
  toggleFavoriteNote: (id: string) => void;

  // Mood & Reflection
  moodEntries: MoodEntry[];
  addMoodEntry: (entry: Omit<MoodEntry, 'id' | 'date'>) => void;

  // Resumes
  resumes: Resume[];
  addResume: (resume: Omit<Resume, 'id' | 'lastUpdated'>) => void;
  deleteResume: (id: string) => void;
  updateResumePdf: (id: string, pdfUrl: string | undefined, pdfName: string | undefined) => void;
}

const initialTasks: TaskItem[] = [
  { id: '1', title: 'Complete Next.js App Router Architecture', category: 'Tech', date: new Date().toISOString().split('T')[0], priority: 'high', completed: true, durationMinutes: 45 },
  { id: '2', title: 'Design Botanical Color Tokens & Micro-interactions', category: 'Design', date: new Date().toISOString().split('T')[0], priority: 'medium', completed: true, durationMinutes: 30 },
  { id: '3', title: '15-minute Morning Reflection & Garden Break', category: 'Well-being', date: new Date().toISOString().split('T')[0], priority: 'low', completed: false, durationMinutes: 15 },
  { id: '4', title: 'Update Resume Space with AI Engineering Projects', category: 'Career', date: new Date().toISOString().split('T')[0], priority: 'high', completed: false, durationMinutes: 40 },
];

const initialJourneys: Journey[] = [
  {
    id: 'j1',
    title: 'Full Stack & Modern Web Craftsman',
    description: 'Mastering Next.js, React, Tailwind CSS, and scalable system design.',
    category: 'Tech',
    icon: 'Sprout',
    color: '#4A7C59',
    milestones: [
      {
        id: 'm1',
        journeyId: 'j1',
        title: 'Master Next.js App Router & Server Components',
        description: 'Understand streaming, routing, and server actions thoroughly.',
        status: 'in-progress',
        targetDate: '2026-10-15',
        subtasks: [
          { id: 'st1', title: 'Build interactive botanical dashboard', completed: true },
          { id: 'st2', title: 'Implement dark mode context & persistence', completed: true },
          { id: 'st3', title: 'Integrate canvas confetti micro-animation', completed: false },
        ]
      },
      {
        id: 'm2',
        journeyId: 'j1',
        title: 'Design System & Micro-animations',
        description: 'Craft editorial layout components with smooth transitions.',
        status: 'upcoming',
        targetDate: '2026-11-01',
        subtasks: [
          { id: 'st4', title: 'Curate botanical color palette variables', completed: true },
          { id: 'st5', title: 'Build custom audio focus timer', completed: false },
        ]
      }
    ]
  },
  {
    id: 'j2',
    title: 'Editorial Design & Creative Writing',
    description: 'Nurturing aesthetic typography, UI storytelling, and personal branding.',
    category: 'Design',
    icon: 'Feather',
    color: '#E07A5F',
    milestones: [
      {
        id: 'm3',
        journeyId: 'j2',
        title: 'Launch "Outside the Lines" Brand & Portfolio',
        description: 'Create an inspiring, peaceful web app that celebrates growth.',
        status: 'in-progress',
        targetDate: '2026-09-30',
        subtasks: [
          { id: 'st6', title: 'Write organic brand story & tagline', completed: true },
          { id: 'st7', title: 'Curate Playfair & Sans serif font pairings', completed: true }
        ]
      }
    ]
  }
];

const initialSkills: Skill[] = [
  { id: 'sk1', name: 'Next.js & React 19', category: 'Tech', level: 'Advanced', progress: 88, hoursSpent: 120, lastPracticed: 'Today' },
  { id: 'sk2', name: 'UI/UX Editorial Design', category: 'Design', level: 'Advanced', progress: 82, hoursSpent: 95, lastPracticed: 'Yesterday' },
  { id: 'sk3', name: 'System Architecture', category: 'Tech', level: 'Intermediate', progress: 65, hoursSpent: 54, lastPracticed: '3 days ago' },
  { id: 'sk4', name: 'Mindfulness & Focus Practice', category: 'Well-being', level: 'Master', progress: 94, hoursSpent: 140, lastPracticed: 'Today' },
];

const initialNotes: Note[] = [
  {
    id: 'n1',
    title: 'Why Consistency Trumps Perfection in Learning',
    content: 'Learning is like tending a garden. Small daily watering creates deep roots. When building complex web apps, focus on steady progress and clean foundational patterns.',
    category: 'Learning',
    tags: ['Mindset', 'Growth', 'Garden'],
    date: '2026-09-28',
    isFavorite: true,
  },
  {
    id: 'n2',
    title: 'Next.js App Router & Server Components Key Takeaways',
    content: '1. Server components reduce client JS payload.\n2. Use Client components only when state or browser APIs are required.\n3. Keep context providers near the root layout.',
    category: 'Revision',
    tags: ['Nextjs', 'React', 'Frontend'],
    date: '2026-09-27',
    isFavorite: true,
  },
  {
    id: 'n3',
    title: 'System Design Interview Checklist',
    content: 'Remember to clarify non-functional requirements (latency vs throughput), draw key data flows, explain database indexing, and discuss caching strategies.',
    category: 'Interview',
    tags: ['Interview', 'Career', 'Architecture'],
    date: '2026-09-25',
    isFavorite: false,
  }
];

const initialMoodEntries: MoodEntry[] = [
  {
    id: 'mo1',
    date: '2026-09-29',
    mood: 'Calm',
    gratitude: 'Grateful for peaceful morning sunlight and building meaningful projects at my own pace.',
    reflection: 'Felt very clear-headed during today\'s focus timer session.',
    energyLevel: 5,
  },
  {
    id: 'mo2',
    date: '2026-09-28',
    mood: 'Inspired',
    gratitude: 'Grateful for rich design references and progress on my skill roadmap.',
    reflection: 'Pivoted from stress to steady action. Watered my indoor plants.',
    energyLevel: 4,
  }
];

const initialResumes: Resume[] = [
  {
    id: 'r1',
    title: 'Senior Frontend & UI Craftsman',
    targetRole: 'Senior Frontend Engineer / Product Engineer',
    summary: 'Passionate Frontend Engineer with 5+ years of experience building modern, responsive, high-performance web applications using React, Next.js, and TypeScript. Obsessed with aesthetic typography and smooth micro-animations.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'State Management', 'Web Performance'],
    experiences: [
      {
        title: 'Lead Frontend Developer',
        company: 'Outside the Lines Creative Studio',
        period: '2023 - Present',
        role: 'Lead Developer',
        bullets: [
          'Architected editorial React/Next.js applications serving over 50,000 active users.',
          'Reduced bundle sizes by 35% through dynamic imports and server components.',
          'Designed modular botanical component design system.'
        ]
      }
    ],
    projects: ['Outside the Lines Personal OS', 'Botanical Design System', 'Zen Productivity Studio'],
    lastUpdated: '2026-09-29'
  },
  {
    id: 'r2',
    title: 'Full Stack & AI Engineer',
    targetRole: 'Full Stack AI Developer',
    summary: 'Versatile Full Stack Engineer specializing in AI integration, Node.js microservices, Next.js, and database design. Dedicated to peaceful product experiences and robust system architecture.',
    skills: ['Next.js', 'Node.js', 'Python', 'PostgreSQL', 'LLM Integration', 'Tailwind CSS'],
    experiences: [
      {
        title: 'Full Stack Engineer',
        company: 'EcoTech Solutions',
        period: '2022 - 2024',
        role: 'Full Stack Developer',
        bullets: [
          'Implemented end-to-end user dashboards with real-time WebSocket analytics.',
          'Integrated LLM API pipelines for automated knowledge extraction and note summaries.'
        ]
      }
    ],
    projects: ['Outside the Lines Knowledge Graph', 'EcoAnalytics Dashboard'],
    lastUpdated: '2026-09-20'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [journeys, setJourneys] = useState<Journey[]>(initialJourneys);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(initialMoodEntries);
  const [resumes, setResumes] = useState<Resume[]>(initialResumes);
  const [streakCount, setStreakCount] = useState<number>(14);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('otl_dark_mode');
      if (savedTheme !== null) {
        setDarkMode(savedTheme === 'true');
      }
      const savedTab = localStorage.getItem('otl_active_tab') as ActiveTab;
      if (savedTab) {
        setActiveTab(savedTab);
      }
    }
  }, []);

  // Update dark mode class on <html> element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('otl_dark_mode', String(darkMode));
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const handleSetActiveTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      localStorage.setItem('otl_active_tab', tab);
    }
  };

  const addTask = (newTask: Omit<TaskItem, 'id'>) => {
    const item: TaskItem = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks(prev => [item, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addJourney = (newJourney: Omit<Journey, 'id'>) => {
    const j: Journey = { ...newJourney, id: 'j_' + Date.now() };
    setJourneys(prev => [...prev, j]);
  };

  const toggleMilestoneStatus = (journeyId: string, milestoneId: string) => {
    setJourneys(prev => prev.map(j => {
      if (j.id !== journeyId) return j;
      return {
        ...j,
        milestones: j.milestones.map(m => {
          if (m.id !== milestoneId) return m;
          const nextStatus = m.status === 'completed' ? 'in-progress' : m.status === 'in-progress' ? 'completed' : 'in-progress';
          return { ...m, status: nextStatus };
        })
      };
    }));
  };

  const addSkill = (newSkill: Omit<Skill, 'id'>) => {
    const s: Skill = { ...newSkill, id: 'sk_' + Date.now() };
    setSkills(prev => [...prev, s]);
  };

  const updateSkillProgress = (id: string, newProgress: number, addHours: number = 0) => {
    setSkills(prev => prev.map(s => {
      if (s.id !== id) return s;
      return {
        ...s,
        progress: Math.min(100, Math.max(0, newProgress)),
        hoursSpent: s.hoursSpent + addHours,
        lastPracticed: 'Just now'
      };
    }));
  };

  const addNote = (newNote: Omit<Note, 'id' | 'date'>) => {
    const n: Note = {
      ...newNote,
      id: 'n_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setNotes(prev => [n, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const toggleFavoriteNote = (id: string) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, isFavorite: !n.isFavorite } : n));
  };

  const addMoodEntry = (entry: Omit<MoodEntry, 'id' | 'date'>) => {
    const m: MoodEntry = {
      ...entry,
      id: 'mo_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setMoodEntries(prev => [m, ...prev]);
  };

  const addResume = (newResume: Omit<Resume, 'id' | 'lastUpdated'>) => {
    const r: Resume = {
      ...newResume,
      id: 'r_' + Date.now(),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setResumes(prev => [...prev, r]);
  };

  const deleteResume = (id: string) => {
    setResumes(prev => prev.filter(r => r.id !== id));
  };

  const updateResumePdf = (id: string, pdfUrl: string | undefined, pdfName: string | undefined) => {
    setResumes(prev => prev.map(r => r.id === id ? { ...r, pdfUrl, pdfName } : r));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab: handleSetActiveTab,
        darkMode,
        setDarkMode,
        toggleDarkMode,
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        streakCount,
        journeys,
        addJourney,
        toggleMilestoneStatus,
        skills,
        addSkill,
        updateSkillProgress,
        notes,
        addNote,
        deleteNote,
        toggleFavoriteNote,
        moodEntries,
        addMoodEntry,
        resumes,
        addResume,
        deleteResume,
        updateResumePdf,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
