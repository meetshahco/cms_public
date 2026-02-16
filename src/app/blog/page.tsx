'use client';

import Link from 'next/link';
import { Home, FileText, BookOpen, Mail, ArrowLeft } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Work', href: '/#work', icon: FileText },
  { label: 'Papers', href: '/papers', icon: BookOpen },
  { label: 'Contact', href: '/#contact', icon: Mail },
];

interface BlogPost {
  date: string;
  title: string;
  excerpt: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    date: 'Jan 2026',
    title: 'Building Inspector: An AI IDE for Front-End Development',
    excerpt: 'Why we started Inspector and how we\'re rethinking the way developers build user interfaces.',
    slug: 'building-inspector',
  },
  {
    date: 'Dec 2025',
    title: 'What I Learned Interning at Character.AI',
    excerpt: 'Reflections on my summer working on both engineering and marketing.',
    slug: 'character-ai-internship',
  },
  {
    date: 'Oct 2025',
    title: 'RAG Debugging: Making AI Systems Easier to Fix',
    excerpt: 'Our research on interactive debugging for RAG pipelines.',
    slug: 'rag-debugging',
  },
  {
    date: 'Aug 2025',
    title: 'Helping Small Businesses Use AI',
    excerpt: 'Insights from our research on how small business owners adopt generative AI tools.',
    slug: 'small-business-ai',
  },
];

export default function BlogPage() {
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
            Blog
          </h1>
          <p className="text-[var(--text-secondary)] mb-12">
            Thoughts on building, research, and AI.
          </p>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group">
                <div className="flex items-start gap-4">
                  <span className="text-sm text-[var(--text-muted)] tabular-nums w-16 flex-shrink-0 pt-0.5">
                    {post.date}
                  </span>
                  <div className="flex-1 min-w-0">
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent)] transition-colors mb-1">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-[var(--text-secondary)]">{post.excerpt}</p>
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
