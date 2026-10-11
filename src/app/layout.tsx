import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Outside the Lines | Personal Learning & Growth OS',
  description: "Because everyone's journey is different. A warm, editorial-style web experience for learning, skill development, progress tracking, reflection, and resume space.",
  keywords: ['Learning Platform', 'Personal Growth', 'Study Planner', 'Skill Tracker', 'Focus Timer', 'Resume Space', 'Botanical OS'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-cream-200 dark:bg-botanical-950 text-earth-900 dark:text-cream-100 flex flex-col font-sans transition-colors duration-300">
        <AppProvider>
          <Navbar />
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
