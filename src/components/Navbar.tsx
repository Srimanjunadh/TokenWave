import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Globe, Check } from 'lucide-react';
import type { NavItem } from '../types';

const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'ABOUT US', href: '#about' },
  { id: 'capabilities', label: 'CAPABILITIES', href: '#capabilities' },
  { id: 'industries', label: 'INDUSTRIES', href: '#industries' },
  { id: 'insights', label: 'INSIGHTS', href: '#insights' },
  { id: 'careers', label: 'CAREERS', href: '#careers' },
  { id: 'contact', label: 'CONTACT US', href: '#contact' },
];

const SEARCH_ITEMS = [
  { title: 'Deterministic Orchestrator (Agent Kavacha)', section: 'capabilities', category: 'Capabilities' },
  { title: 'Air-Gapped Sovereign Triton Node', section: 'capabilities', category: 'Capabilities' },
  { title: 'Billion-Scale Vector Knowledge Mesh', section: 'capabilities', category: 'Capabilities' },
  { title: 'Banking Kavacha — Autonomous Core Settlement', section: 'industries', category: 'Industries' },
  { title: 'Healthcare Arogya — HIPAA Diagnostic Agents', section: 'industries', category: 'Industries' },
  { title: 'Telecom Astra — Self-Healing Sub-40ms Network', section: 'industries', category: 'Industries' },
  { title: 'Energy Urja — Grid-Edge Swarms', section: 'industries', category: 'Industries' },
  { title: 'Governed Intelligence & Three Pillars', section: 'about', category: 'About Us' },
  { title: 'Apex Global Financial Settlement Case Study', section: 'insights', category: 'Insights' },
  { title: 'MedGlobal Autonomous Radiology Case Study', section: 'insights', category: 'Insights' },
  { title: 'EnergyCore Grid Load Balancing Case Study', section: 'insights', category: 'Insights' },
  { title: 'Careers — Principal Distributed Systems Engineer', section: 'careers', category: 'Careers' },
  { title: 'Careers — RL & Formal Guardrails Engineer', section: 'careers', category: 'Careers' },
  { title: 'Schedule Technical Pilot / Contact Us', section: 'contact', category: 'Contact' },
];

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ja', label: '日本語' },
  { code: 'fr', label: 'Français' },
];

interface NavbarProps {
  activeSection: string;
  onSelectSection?: (id: string) => void;
  onReplayIntro?: () => void;
  isPreloaderDone?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  onSelectSection, 
  onReplayIntro, 
  isPreloaderDone = false 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [isNavbarRevealed, setIsNavbarRevealed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Staged entrance animation when preloader completes
  useEffect(() => {
    if (isPreloaderDone) {
      const timer = setTimeout(() => setIsNavbarRevealed(true), 180);
      return () => clearTimeout(timer);
    } else {
      const fallback = setTimeout(() => setIsNavbarRevealed(true), 3200);
      return () => clearTimeout(fallback);
    }
  }, [isPreloaderDone]);

  // Track scroll position for sticky elevated backdrop blur state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Shortcut Ctrl+K / Cmd+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setLangMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCloseSearch = () => {
    setSearchModalOpen(false);
    setSearchQuery('');
  };

  // Focus search input when modal opens
  useEffect(() => {
    if (searchModalOpen) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [searchModalOpen]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    handleCloseSearch();

    if (onSelectSection) {
      onSelectSection(targetId);
    }

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState(null, '', '#home');
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      history.pushState(null, '', `#${targetId}`);
    }
  };

  const filteredSearchResults = searchQuery.trim() === ''
    ? SEARCH_ITEMS.slice(0, 6)
    : SEARCH_ITEMS.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          isNavbarRevealed
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        } ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)]'
            : 'bg-white/95 backdrop-blur-xs border-b border-slate-100/80 shadow-none'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* ========================================================================= */}
          {/* Left Side: Clean TokenWave Logo Wordmark                                  */}
          {/* ========================================================================= */}
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, 'home')}
              className="text-2xl sm:text-[26px] font-sans font-extrabold text-slate-950 tracking-tight hover:opacity-90 transition-opacity select-none"
              aria-label="TokenWave AI - Return to top"
            >
              TokenWave
            </a>
          </div>

          {/* ========================================================================= */}
          {/* Right Side: Exact Sequence (ABOUT US, CAPABILITIES, INDUSTRIES,           */}
          {/* INSIGHTS, CAREERS, CONTACT US) + Search Icon + Divider + Language Pill     */}
          {/* ========================================================================= */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {/* Primary Navigation Links with Horizontal Expanding Underline */}
            <nav className="flex items-center gap-6 xl:gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.id)}
                    className={`group relative py-1 text-[12px] xl:text-[13px] font-bold tracking-wider uppercase transition-colors duration-300 ${
                      isActive ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600'
                    }`}
                    style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-full transition-transform duration-300 origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                      style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Quick Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="p-1.5 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
              aria-label="Search site"
              title="Search (Ctrl+K)"
            >
              <Search className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Subtle Vertical Divider */}
            <div className="h-4 w-px bg-slate-300" />

            {/* Language Selector Box */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="border border-slate-200 hover:border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 bg-white flex items-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-xs transition-all"
                aria-label="Select Language"
                aria-expanded={langMenuOpen}
              >
                <Globe className="w-3.5 h-3.5 text-slate-600" />
                <span className="font-medium text-[11px] sm:text-xs">{selectedLang}</span>
                <span className="text-[8px] text-slate-800 leading-none select-none font-sans font-bold">▼</span>
              </button>

              {/* Language Dropdown Menu */}
              {langMenuOpen && (
                <div className="absolute right-0 mt-1.5 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setSelectedLang(lang.label);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                        selectedLang === lang.label ? 'text-blue-600 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.label}</span>
                      {selectedLang === lang.label && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right Controls: Search, Language, Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              className="p-1.5 text-slate-700 hover:text-slate-950 rounded-md"
              aria-label="Search site"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 bg-white flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-slate-600" />
              <span className="text-[10px] font-medium">{selectedLang}</span>
              <span className="text-[7px] text-slate-800 leading-none">▼</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors ml-1"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Over Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-3 shadow-xl">
            <nav className="flex flex-col space-y-2.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleSmoothScroll(e, item.id)}
                    className={`py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-800 hover:text-blue-600'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              {onReplayIntro && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="w-full py-2 text-xs font-mono text-slate-500 hover:text-slate-900 text-left cursor-pointer"
                >
                  ↺ Replay Intro Animation
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* Quick Search Palette Modal (Ctrl+K)                                       */}
      {/* ========================================================================= */}
      {searchModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search TokenWave AI"
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/40 backdrop-blur-xs"
          onClick={handleCloseSearch}
        >
          <div
            className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search capabilities, industries, case studies, roles..."
                className="w-full text-sm outline-none text-slate-900 placeholder:text-slate-400 bg-transparent"
              />
              <button
                type="button"
                onClick={handleCloseSearch}
                className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded font-mono hover:bg-slate-200 cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredSearchResults.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">
                  No matching results found for "{searchQuery}".
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredSearchResults.map((result, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => handleSmoothScroll(e, result.section)}
                      className="w-full px-3 py-2.5 rounded-lg text-left hover:bg-slate-50 flex items-center justify-between text-xs transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:scale-125 transition-transform" />
                        <span className="font-medium text-slate-800 group-hover:text-slate-950">{result.title}</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-500 group-hover:bg-slate-200">
                        {result.category}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Navigation Footer */}
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Navigate with click or arrow keys</span>
              <span>TokenWave AI Quick Index</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
