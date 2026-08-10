'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BookOpen, ChevronLeft, ChevronRight, List, Bookmark, 
  Settings, Download, Home, CheckCircle2, Lock, Type, Sun, Moon, Sparkles 
} from 'lucide-react';
import { Ebook, EbookChapter } from '@/types';
import { updateReadingProgress, addBookmark } from '@/lib/data/repository';

interface OnlineReaderProps {
  ebook: Ebook;
  userId: string;
  isOwner: boolean;
}

export function OnlineReader({ ebook, userId, isOwner }: OnlineReaderProps) {
  const chapters: EbookChapter[] = ebook.chapters && ebook.chapters.length > 0
    ? ebook.chapters
    : [
        {
          id: 'ch-1',
          title: 'Chapter 1: Principles of Non-Linear Leverage',
          pageNumber: 1,
          content: ebook.preview_content || ebook.description
        },
        {
          id: 'ch-2',
          title: 'Chapter 2: Risk Asymmetry & Capital Preservation',
          pageNumber: 2,
          content: `### Risk Asymmetry & Capital Preservation

When taking strategic bets in business and digital asset creation, the goal is never to avoid risk entirely. Rather, the goal is to systematically isolate **Asymmetric Opportunities**.

#### The Core Formula:
- **Maximum Downside**: Strictly bounded to your initial time or monetary investment.
- **Maximum Upside**: Open-ended, compounding across global digital distribution networks.

> "The true cost of a failed low-risk digital project is close to zero. The cost of missing out on an asymmetric 100x compounding engine is life-changing."`
        },
        {
          id: 'ch-3',
          title: 'Chapter 3: Monopolistic Positioning & Execution',
          pageNumber: 3,
          content: `### Monopolistic Positioning

Competition is for losers. Peter Thiel famously observed that companies creating enduring value build defensible monopolies by solving specific problems that standard commodities ignore.

#### Building Moats around Digital Products:
1. **Proprietary Knowledge**: Deep domain expertise synthesized into actionable blueprints.
2. **Speed & Brand Trust**: Delivering frictionless reader experience and immediate value.
3. **Network Dynamics**: Creating ecosystems where readers become loyal brand advocates.`
        }
      ];

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [themeMode, setThemeMode] = useState<'dark' | 'sepia' | 'light'>('dark');
  const [tocOpen, setTocOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const currentChapter = chapters[currentChapterIndex];
  const progressPercent = Math.round(((currentChapterIndex + 1) / chapters.length) * 100);

  // Sync reading progress
  useEffect(() => {
    if (isOwner && userId) {
      updateReadingProgress(userId, ebook.id, currentChapterIndex + 1, chapters.length);
    }
  }, [currentChapterIndex, isOwner, userId, ebook.id, chapters.length]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleBookmark = async () => {
    if (!isOwner) return;
    await addBookmark(userId, ebook.id, currentChapterIndex + 1, `Bookmark on ${currentChapter.title}`);
    setBookmarked(true);
    showToast(`Bookmarked Page ${currentChapterIndex + 1}`);
  };

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-white">Access Restricted</h2>
        <p className="text-slate-400 text-sm max-w-md mt-2 mb-6">
          You have not purchased <strong className="text-white">&quot;{ebook.title}&quot;</strong> yet. Purchase this eBook to unlock full online reading & downloads.
        </p>
        <div className="flex items-center gap-3">
          <Link href={`/ebook/${ebook.slug}`} className="gold-button px-6 py-3 rounded-xl font-bold text-sm">
            Purchase eBook (${ebook.price})
          </Link>
          <Link href="/ebooks" className="px-5 py-3 rounded-xl border border-surface-border text-slate-300 hover:text-white text-sm">
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Theme container classes
  const getThemeClasses = () => {
    switch (themeMode) {
      case 'sepia':
        return 'bg-[#fbf0d9] text-[#2b261f]';
      case 'light':
        return 'bg-white text-slate-900';
      default:
        return 'bg-background text-slate-200';
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm': return 'text-sm leading-relaxed';
      case 'lg': return 'text-xl leading-relaxed';
      case 'xl': return 'text-2xl leading-loose';
      default: return 'text-base leading-relaxed';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${getThemeClasses()}`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-gold text-background font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg animate-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}

      {/* Header Controls Bar */}
      <header className={`sticky top-0 z-40 border-b px-4 py-3 flex items-center justify-between shadow-sm ${
        themeMode === 'dark' ? 'bg-surface/90 border-surface-border text-white' : 'bg-white/90 border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3">
          <Link href="/library" className="p-2 rounded-lg hover:bg-black/10 transition-colors" title="Back to Library">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setTocOpen(!tocOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-current/20 text-xs font-semibold hover:opacity-80"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Table of Contents</span>
          </button>
        </div>

        <div className="text-center truncate max-w-xs md:max-w-md px-2">
          <span className="font-serif font-bold text-xs sm:text-sm block truncate">{ebook.title}</span>
          <span className="text-[10px] opacity-70 block">{currentChapter.title}</span>
        </div>

        {/* Adjust Controls */}
        <div className="flex items-center gap-2">
          
          {/* Theme Switcher */}
          <div className="flex items-center gap-1 border border-current/20 rounded-lg p-1 text-xs">
            <button
              onClick={() => setThemeMode('dark')}
              className={`p-1 rounded ${themeMode === 'dark' ? 'bg-gold text-background' : 'opacity-60'}`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setThemeMode('sepia')}
              className={`p-1 rounded ${themeMode === 'sepia' ? 'bg-amber-700 text-white' : 'opacity-60'}`}
              title="Sepia Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setThemeMode('light')}
              className={`p-1 rounded ${themeMode === 'light' ? 'bg-slate-900 text-white' : 'opacity-60'}`}
              title="Clean Light"
            >
              <Type className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Font Size Selector */}
          <div className="hidden sm:flex items-center border border-current/20 rounded-lg p-1 text-[11px]">
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-0.5 rounded ${fontSize === 'sm' ? 'font-bold underline' : 'opacity-60'}`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('md')}
              className={`px-2 py-0.5 rounded ${fontSize === 'md' ? 'font-bold underline' : 'opacity-60'}`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-0.5 rounded ${fontSize === 'lg' ? 'font-bold underline' : 'opacity-60'}`}
            >
              A+
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg transition-colors ${bookmarked ? 'text-gold fill-gold' : 'opacity-70 hover:opacity-100'}`}
            title="Bookmark Page"
          >
            <Bookmark className="w-4 h-4" />
          </button>

          {/* Download Link */}
          <a
            href={`/api/ebooks/${ebook.id}/download`}
            download
            className="p-2 rounded-lg opacity-70 hover:opacity-100"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Main Body with Slide-out Table of Contents */}
      <div className="flex-1 flex relative">
        
        {/* Table of Contents Drawer */}
        {tocOpen && (
          <aside className={`w-72 border-r p-4 overflow-y-auto shrink-0 z-30 ${
            themeMode === 'dark' ? 'bg-surface border-surface-border' : 'bg-slate-50 border-slate-200'
          }`}>
            <h4 className="font-serif font-bold text-sm mb-4 uppercase tracking-wider">Chapters</h4>
            <div className="space-y-1">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setCurrentChapterIndex(idx);
                    setTocOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg text-xs font-medium transition-all ${
                    idx === currentChapterIndex
                      ? 'bg-gold/20 text-gold border-l-2 border-gold font-bold'
                      : 'hover:bg-black/5 opacity-80'
                  }`}
                >
                  {ch.title}
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* eBook Content Reading Pane */}
        <main className="flex-1 max-w-3xl mx-auto px-6 py-12 md:py-16 overflow-y-auto">
          <div className="mb-8 pb-4 border-b border-current/10">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              Chapter {currentChapterIndex + 1} of {chapters.length}
            </span>
            <h1 className="font-serif text-3xl font-bold mt-1 leading-tight">{currentChapter.title}</h1>
          </div>

          <div className={`prose max-w-none space-y-6 ${getFontSizeClass()}`}>
            {currentChapter.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed opacity-90">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Bottom Chapter Navigation Controls */}
          <div className="mt-16 pt-8 border-t border-current/10 flex items-center justify-between">
            <button
              onClick={() => setCurrentChapterIndex(Math.max(0, currentChapterIndex - 1))}
              disabled={currentChapterIndex === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-current/20 text-xs font-bold disabled:opacity-30 hover:bg-black/5"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Chapter
            </button>

            <span className="text-xs font-medium opacity-60">
              Page {currentChapterIndex + 1} / {chapters.length}
            </span>

            <button
              onClick={() => setCurrentChapterIndex(Math.min(chapters.length - 1, currentChapterIndex + 1))}
              disabled={currentChapterIndex === chapters.length - 1}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-current/20 text-xs font-bold disabled:opacity-30 hover:bg-black/5"
            >
              Next Chapter <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>

      {/* Progress Footer Bar */}
      <footer className={`border-t px-6 py-2.5 flex items-center justify-between text-xs opacity-75 ${
        themeMode === 'dark' ? 'border-surface-border bg-surface-card' : 'border-slate-200 bg-slate-100'
      }`}>
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-gold" />
          <span>Reading Progress: <strong>{progressPercent}%</strong></span>
        </div>
        <div className="w-32 sm:w-48 bg-current/20 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gold h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
      </footer>

    </div>
  );
}
