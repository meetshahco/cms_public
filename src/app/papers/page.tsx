'use client';

import Link from 'next/link';
import { Home, FileText, BookOpen, Mail, ArrowLeft } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Work', href: '/#work', icon: FileText },
  { label: 'Papers', href: '/papers', icon: BookOpen },
  { label: 'Contact', href: '/#contact', icon: Mail },
];

interface Publication {
  year: number;
  title: string;
  authors: string;
  venue: string;
  note?: string;
  link?: string;
}

const publications: Publication[] = [
  {
    year: 2026,
    title: 'Towards Designing for Resilience: Community-Centered Deployment of an AI Business Planning Tool in a Pittsburgh Small Business Center',
    authors: 'Quentin Romero Lauro, Aakash Gautam, Yasmine Kotturi',
    venue: 'CHI 2026',
  },
  {
    year: 2026,
    title: 'RAG Without the Lag: Interactive Debugging for Retrieval-Augmented Generation Pipelines',
    authors: 'Quentin Romero Lauro*, Shreya Shankar*, Sepanta Zeighami, Aditya G. Parameswaran',
    venue: 'CHI 2026',
    note: '* Co-first authors',
    link: 'https://arxiv.org/abs/2504.13587',
  },
  {
    year: 2025,
    title: 'BizChat: Scaffolding AI-Powered Business Planning for Small Business Owners Across Digital Skill Levels',
    authors: 'Quentin Romero Lauro, Aakash Gautam, Yasmine Kotturi',
    venue: 'CHIWORK 2025',
    link: 'https://arxiv.org/abs/2505.08493',
  },
  {
    year: 2024,
    title: 'Exploring the Role of Social Support When Integrating Generative AI in Small Business Workflows',
    authors: 'Quentin Romero Lauro, Jeffrey P. Bigham, Yasmine Kotturi',
    venue: 'CSCW 2024',
    link: 'https://arxiv.org/abs/2407.21404',
  },
];

export default function PapersPage() {
  return (
    <>
      {/* Desktop Navigation */}
      <header className="nav-desktop fixed top-0 left-0 right-0 z-50 bg-[var(--bg-nav)] backdrop-blur-xl border-b border-[var(--border)]">
        <nav className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-medium text-[var(--text-primary)] text-sm tracking-wide">
            QRL
          </Link>
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="nav-mobile">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-1 px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <Icon size={20} strokeWidth={1.5} />
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 pb-32 md:pb-16 pt-8 md:pt-28">
        <div className="section">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
          
          <h1 className="text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            Publications
          </h1>
          <p className="text-[var(--text-secondary)] mb-12">
            Research in HCI, AI systems, and developer tools. Published at CHI, CSCW, and CHIWORK.
          </p>

          <div className="space-y-10">
            {publications.map((pub, i) => (
              <article key={i} className="group">
                <div className="flex items-start gap-4">
                  <span className="text-sm text-[var(--text-muted)] tabular-nums w-10 flex-shrink-0 pt-1">
                    {pub.year}
                  </span>
                  <div className="flex-1 min-w-0">
                    {pub.link ? (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer">
                        <h2 className="text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent)] transition-colors mb-2">
                          {pub.title}
                        </h2>
                      </a>
                    ) : (
                      <h2 className="text-[var(--text-primary)] leading-snug mb-2">
                        {pub.title}
                      </h2>
                    )}
                    <p className="text-sm text-[var(--text-secondary)] mb-1">{pub.authors}</p>
                    {pub.note && <p className="text-xs text-[var(--text-muted)] mb-1">{pub.note}</p>}
                    <p className="text-sm text-[var(--text-muted)]">{pub.venue}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
