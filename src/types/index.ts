export type ActiveTab =
  | 'landing'
  | 'learn'
  | 'plan'
  | 'grow'
  | 'career';

export type LearnSubTab = 'journey' | 'skills' | 'notes';
export type GrowSubTab  = 'progress' | 'reflection' | 'focus';

export type CategoryTag = 'Tech' | 'Design' | 'Personal' | 'Career' | 'Well-being' | 'Writing';

export interface TaskItem {
  id: string;
  title: string;
  category: CategoryTag;
  date: string; // YYYY-MM-DD
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  durationMinutes: number;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Milestone {
  id: string;
  journeyId: string;
  title: string;
  description: string;
  status: 'upcoming' | 'in-progress' | 'completed';
  targetDate: string;
  subtasks: SubTask[];
}

export interface Journey {
  id: string;
  title: string;
  description: string;
  category: CategoryTag;
  icon: string;
  color: string;
  milestones: Milestone[];
}

export interface Skill {
  id: string;
  name: string;
  category: CategoryTag;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
  progress: number; // 0 to 100
  hoursSpent: number;
  lastPracticed: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: 'Learning' | 'Revision' | 'Interview' | 'Project' | 'Personal';
  tags: string[];
  date: string;
  isFavorite: boolean;
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: 'Calm' | 'Inspired' | 'Focused' | 'Tired' | 'Overwhelmed' | 'Joyful';
  gratitude: string;
  reflection: string;
  energyLevel: number; // 1-5
}

export interface ResumeSection {
  title: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface Resume {
  id: string;
  title: string;
  targetRole: string;
  summary: string;
  skills: string[];
  experiences: ResumeSection[];
  projects: string[];
  lastUpdated: string;
  pdfUrl?: string;   // base64 data URL
  pdfName?: string;  // original filename
}
