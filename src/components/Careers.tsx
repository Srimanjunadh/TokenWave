import React from 'react';
import { 
  MapPin, 
  Clock, 
  ArrowRight, 
  Code2
} from 'lucide-react';
import { JOB_ROLES } from '../data/mockData';

interface CareersProps {
  onApplyForRole: (roleTitle: string) => void;
}

export const Careers: React.FC<CareersProps> = ({ onApplyForRole }) => {
  const handleApply = (roleTitle: string) => {
    onApplyForRole(roleTitle);
    const element = document.getElementById('contact');
    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
      history.pushState(null, '', '#contact');
    }
  };

  const cultureValues = [
    {
      title: 'Research-Grade Autonomy',
      desc: 'No bureaucracy or sprint theater. You are given high-stakes technical problems, dedicated compute budgets, and ownership of the solution.'
    },
    {
      title: 'Frontier Compute Access',
      desc: 'Direct access to clusters of NVIDIA H100 SXM5 nodes, private fiber backbones, and bespoke silicon testbeds.'
    },
    {
      title: 'Peer Excellence',
      desc: 'Work alongside ACM contest medalists, ex-FAANG principal engineers, and published AI systems researchers.'
    },
    {
      title: 'Global Sovereign Impact',
      desc: 'Build systems that safeguard critical national financial infrastructure, clinical hospitals, and renewable grids.'
    }
  ];

  return (
    <section id="careers" className="py-20 lg:py-28 bg-offwhite relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 block mb-3">
            Careers
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 font-heading tracking-tight">
            Build Sovereign Intelligence at TokenWave AI
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            We are an elite, research-grade engineering collective of applied scientists, MLOps architects, and system creators pushing the physical boundaries of deterministic AI.
          </p>
        </div>

        {/* Culture Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cultureValues.map((val, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-blue-500/40 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-mono font-bold text-xs mb-4">
                0{idx + 1}
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading mb-2">
                {val.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Open Engineering Roles Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Open Engineering Roles ({JOB_ROLES.length})
            </h3>
            <span className="text-xs font-mono text-slate-500">
              Direct Application • 24hr Engineering Response
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {JOB_ROLES.map((role) => (
              <div
                key={role.id}
                className="rounded-2xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 group"
              >
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wide">
                      {role.department}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {role.location}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {role.type}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading">
                    {role.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {role.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-3">
                  <button
                    onClick={() => handleApply(role.title)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-950 hover:bg-blue-600 text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Culture Callout Banner */}
        <div className="mt-12 rounded-2xl p-6 bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-heading">
                Don't see your specific specialization listed?
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                We always create bespoke positions for exceptional system builders, compiler researchers, and distributed systems hackers.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleApply('General Engineering Fellowship / Speculative')}
            className="shrink-0 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-slate-900 text-xs font-bold transition-colors border border-white/20 cursor-pointer"
          >
            Submit Open Inquiry
          </button>
        </div>
      </div>
    </section>
  );
};
