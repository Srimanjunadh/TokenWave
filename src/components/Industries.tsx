import React, { useState } from 'react';
import { 
  Building2, 
  Stethoscope, 
  Radio, 
  Flame, 
  Activity, 
  ArrowRight,
  Lock
} from 'lucide-react';
import { INDUSTRIES_DATA } from '../data/mockData';

interface IndustriesProps {
  onSelectIndustry?: (industryName: string) => void;
}

export const Industries: React.FC<IndustriesProps> = ({ onSelectIndustry }) => {
  const [activeTab, setActiveTab] = useState<string>(INDUSTRIES_DATA[0].id);

  const current = INDUSTRIES_DATA.find((ind) => ind.id === activeTab) || INDUSTRIES_DATA[0];

  const handlePilotRequest = (indName: string) => {
    if (onSelectIndustry) {
      onSelectIndustry(indName);
    }
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

  const getTabIcon = (id: string) => {
    switch (id) {
      case 'banking':
        return <Building2 className="w-5 h-5" />;
      case 'healthcare':
        return <Stethoscope className="w-5 h-5" />;
      case 'telecom':
        return <Radio className="w-5 h-5" />;
      case 'energy':
        return <Flame className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <section id="industries" className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600 block mb-3">
            Industries
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 font-heading tracking-tight">
            Proven at Scale in High-Stakes Production
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Where downtime costs millions and failure is not an option, TokenWave AI delivers deterministic, air-gapped agent swarms tailored for your regulatory reality.
          </p>
        </div>

        {/* Industry Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {INDUSTRIES_DATA.map((ind) => {
            const isActive = activeTab === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-xl shadow-slate-900/20 ring-2 ring-blue-600'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-slate-200'
                }`}
              >
                <span className={isActive ? 'text-blue-400' : 'text-slate-500'}>
                  {getTabIcon(ind.id)}
                </span>
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-heading leading-snug">
                {current.tagline}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <div className="p-4 rounded-xl bg-white border border-slate-200/70">
                  <div className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold mb-1">
                    The Enterprise Challenge
                  </div>
                  <p>{current.challenge}</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/70">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-1">
                    TokenWave Sovereign Solution
                  </div>
                  <p>{current.solution}</p>
                </div>
              </div>

              {/* Outcomes Ticker */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {current.outcomes.map((out, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 text-center">
                    <div className="text-xl sm:text-2xl font-extrabold font-mono text-blue-600">
                      {out.value}
                    </div>
                    <div className="text-[11px] font-medium text-slate-600 mt-1">
                      {out.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Regulatory Compliance Badges */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase text-slate-500 mb-2 font-medium">
                  Regulatory &amp; Security Compliance
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.compliance.map((comp) => (
                    <span
                      key={comp}
                      className="px-2.5 py-1 rounded-md bg-slate-200/60 text-slate-800 font-mono text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Lock className="w-3 h-3 text-blue-600" />
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => handlePilotRequest(current.name)}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span>Schedule {current.name} Pilot</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Live Simulation Console */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-midnight-950 border border-slate-800 shadow-2xl p-6 text-slate-300 font-mono relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>PRODUCTION AGENT TRACE</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[11px]">
                    STATUS: {current.telemetrySimulation.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 my-4 text-xs">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">VERIFIED LATENCY</span>
                    <span className="text-emerald-400 font-bold text-sm">
                      {current.telemetrySimulation.latency}
                    </span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">POLICY CONFORMANCE</span>
                    <span className="text-white font-bold text-sm">
                      {current.telemetrySimulation.verifiedRate}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-[12px] leading-relaxed">
                  <div className="text-slate-500 uppercase text-[10px] tracking-wider">
                    // Event trace recorded on Sovereign Private Node:
                  </div>
                  {current.telemetrySimulation.eventLog.map((log, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                      <span className="text-blue-400 font-bold shrink-0">{i + 1}.</span>
                      <span className="text-slate-300">{log}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Cryptographic Hardware Key: ACTIVE</span>
                  <span className="text-emerald-400">0 Data Egress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
