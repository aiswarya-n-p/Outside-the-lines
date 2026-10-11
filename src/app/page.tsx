'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { LandingView } from '@/components/modules/LandingView';
import { JourneyView } from '@/components/modules/JourneyView';
import { SkillsView } from '@/components/modules/SkillsView';
import { PlannerView } from '@/components/modules/PlannerView';
import { NotesView } from '@/components/modules/NotesView';
import { ProgressView } from '@/components/modules/ProgressView';
import { ReflectionView } from '@/components/modules/ReflectionView';
import { FocusView } from '@/components/modules/FocusView';
import { ResumesView } from '@/components/modules/ResumesView';

export default function Home() {
  const { activeTab } = useApp();

  switch (activeTab) {
    case 'landing':
      return <LandingView />;
    case 'journey':
      return <JourneyView />;
    case 'skills':
      return <SkillsView />;
    case 'planner':
      return <PlannerView />;
    case 'notes':
      return <NotesView />;
    case 'progress':
      return <ProgressView />;
    case 'reflection':
      return <ReflectionView />;
    case 'focus':
      return <FocusView />;
    case 'resumes':
      return <ResumesView />;
    default:
      return <LandingView />;
  }
}
