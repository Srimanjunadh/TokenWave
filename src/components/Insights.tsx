import React from 'react';
import { 
  Award, 
  Quote, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';
import type { CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/mockData';

interface InsightsProps {
  onOpenCaseStudyModal: (caseStudy: CaseStudy) => void;
}

export const Insights: React.FC<InsightsProps> = ({ onOpenCaseStudyModal }) => {
  return (
    <section id="insights" className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 block mb-3">
            Insights
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 font-heading tracking-tight">
            Measurable ROI Delivered in Live Production Environments
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Read how global market leaders deploy TokenWave AI sovereign architectures to solve high-complexity engineering challenges with quantifiable business impact.
          </p>
        </div>

        {/* Market Recognition Banner */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 bg-slate-950 text-white border border-slate-800 flex items-center gap-5 shadow-lg relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                Analyst Recognition
              </div>
              <h4 className="text-lg font-bold text-white font-heading mt-0.5">
                Leader in 2026 IDC MarketScape
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Named Worldwide Leader for Enterprise RAG &amp; Sovereign Autonomous Multi-Agent Platforms.
              </p>
            </div>
          </div>

          <div className="rounded-2xl p-6 bg-slate-950 text-white border border-slate-800 flex items-center gap-5 shadow-lg relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                Industry Excellence Award
              </div>
              <h4 className="text-lg font-bold text-white font-heading mt-0.5">
                Catalyst Innovation Award Winner
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Recognized for Breakthrough Air-Gapped Distributed Cloud Mesh &amp; Sub-45ms Deterministic Inference.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Featured Case Studies Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="rounded-2xl bg-slate-50 border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-7">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3">
                  <span className="font-semibold text-blue-600">{study.industry}</span>
                  <span className="bg-white px-2 py-0.5 rounded border border-slate-200">{study.client}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-950 font-heading leading-snug group-hover:text-blue-600 transition-colors">
                  {study.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {study.summary}
                </p>

                {/* Key Metrics */}
                <div className="mt-6 pt-5 border-t border-slate-200/80 space-y-3">
                  {study.metrics.map((m, i) => (
                    <div key={i} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200/60">
                      <span className="text-xs text-slate-600 font-medium">{m.label}</span>
                      <span className="text-sm font-bold font-mono text-blue-600">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Executive Quote */}
                <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200/60 text-xs text-slate-700 italic relative">
                  <Quote className="w-4 h-4 text-blue-500/40 mb-1" />
                  "{study.quote.text}"
                  <div className="mt-2 font-mono not-italic text-[11px] font-bold text-slate-900">
                    — {study.quote.author}, <span className="text-slate-500 font-normal">{study.quote.title}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-4 bg-slate-100/80 border-t border-slate-200 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {study.stack.slice(0, 2).map((s) => (
                    <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                      {s}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onOpenCaseStudyModal(study)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  <span>Read Full Brief</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
