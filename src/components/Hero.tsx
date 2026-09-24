import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Cpu, 
  Activity, 
  Network,
  ArrowRight
} from 'lucide-react';
import { TechLogosTicker } from './TechLogosTicker';

interface HeroProps {
  isPreloaderDone?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isPreloaderDone = false }) => {
  const [activeTab, setActiveTab] = useState<'topology' | 'telemetry'>('topology');
  const [activeNode, setActiveNode] = useState<number>(0);
  const [telemetryTicks, setTelemetryTicks] = useState({
    tokensPerSec: 14820,
    activeAgents: 42,
    p99Latency: 34.2,
    verifiedPass: 99.85,
  });

  // Staged entrance states for layered reveal sequence
  const [bgRevealed, setBgRevealed] = useState(false);
  const [headingLine1Revealed, setHeadingLine1Revealed] = useState(false);
  const [headingLine2Revealed, setHeadingLine2Revealed] = useState(false);
  const [paraRevealed, setParaRevealed] = useState(false);
  const [btn1Revealed, setBtn1Revealed] = useState(false);
  const [btn2Revealed, setBtn2Revealed] = useState(false);
  const [proofBarRevealed, setProofBarRevealed] = useState(false);

  // Scroll parallax state (tracked using requestAnimationFrame for 60fps)
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger staged layered entrance once preloader completes
  useEffect(() => {
    if (isPreloaderDone) {
      // 1. First fade in hero background with subtle scale-down (t = 40ms)
      const t0 = setTimeout(() => setBgRevealed(true), 40);

      // 2. Main heading line-by-line staggered fade-up reveal (t = 420ms & 580ms)
      const t1 = setTimeout(() => setHeadingLine1Revealed(true), 420);
      const t2 = setTimeout(() => setHeadingLine2Revealed(true), 580);

      // 3. Supporting paragraph subtle fade-up transition (t = 760ms)
      const t3 = setTimeout(() => setParaRevealed(true), 760);

      // 4. CTA buttons with upward movement & staggered opacity reveal (t = 940ms & 1060ms)
      const t4 = setTimeout(() => setBtn1Revealed(true), 940);
      const t5 = setTimeout(() => setBtn2Revealed(true), 1060);

      // 5. Proof Bar / metrics ticker reveal (t = 1220ms)
      const t6 = setTimeout(() => setProofBarRevealed(true), 1220);

      return () => {
        clearTimeout(t0);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
        clearTimeout(t6);
      };
    } else {
      // Direct mount fallback
      const fallback = setTimeout(() => {
        setBgRevealed(true);
        setHeadingLine1Revealed(true);
        setHeadingLine2Revealed(true);
        setParaRevealed(true);
        setBtn1Revealed(true);
        setBtn2Revealed(true);
        setProofBarRevealed(true);
      }, 3400);
      return () => clearTimeout(fallback);
    }
  }, [isPreloaderDone]);

  // Dynamic telemetry live drift for realistic engineering vibe
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryTicks(() => ({
        tokensPerSec: Math.floor(14500 + Math.random() * 800),
        activeAgents: 42 + (Math.random() > 0.5 ? 1 : 0),
        p99Latency: Number((33.8 + Math.random() * 1.8).toFixed(1)),
        verifiedPass: Number((99.82 + Math.random() * 0.05).toFixed(2)),
      }));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const agentNodes = [
    {
      name: 'Agent Kavacha (Supervisor)',
      role: 'Deterministic Plan & Guardrail Orchestrator',
      status: 'Active (Ray Cluster #04)',
      tokens: '3,412 /s',
      latency: '18ms',
      verification: 'Passed (ISO 42001)',
      color: 'border-blue-500 text-blue-400',
    },
    {
      name: 'Sparse-Dense Retriever',
      role: 'Milvus / Qdrant Hybrid Knowledge Mesh',
      status: 'In-Memory Cache (Warm)',
      tokens: '8,210 /s',
      latency: '24ms',
      verification: 'Zero Hallucination Verified',
      color: 'border-slate-800 text-slate-900',
    },
    {
      name: 'Sovereign Triton Node',
      role: 'Air-Gapped Llama-3-70B Finetune Engine',
      status: 'NVIDIA H100 SXM5 x8',
      tokens: '12,940 /s',
      latency: '31ms',
      verification: '0-Egress VPC Lock',
      color: 'border-blue-500 text-blue-400',
    },
    {
      name: 'Formal Verification Sentry',
      role: 'Deterministic Semantic Constraint Validator',
      status: 'Sub-millisecond Check',
      tokens: '1,100 /s',
      latency: '4ms',
      verification: '100% Policy Conformity',
      color: 'border-emerald-600 text-emerald-600',
    },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
      history.pushState(null, '', `#${id}`);
    }
  };

  // Scroll parallax calculations for 60fps performance
  const contentParallaxY = Math.min(scrollY * 0.26, 140);
  const contentOpacity = Math.max(0, 1 - scrollY / 520);
  const bgParallaxY = Math.min(scrollY * 0.12, 90);

  return (
    <section id="home" className="relative w-full overflow-hidden bg-white">
      
      {/* ========================================================================= */}
      {/* 1. Full-Screen Edge-to-Edge Sky-Blue Photographic Hero Section            */}
      {/* ========================================================================= */}
      <div
        className="relative w-full min-h-screen min-h-[100dvh] pt-16 flex flex-col justify-center overflow-hidden"
        style={{
          backgroundColor: '#0284c7',
        }}
      >
        {/* Parallax Container for Full-Bleed Sky-Blue Background Image & Continuous Motion */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            transform: `translate3d(0, ${bgParallaxY}px, 0)`,
            willChange: scrollY > 0 ? 'transform' : 'auto',
          }}
        >
          <div
            className={`absolute inset-0 bg-cover bg-no-repeat transition-all duration-1000 ease-premium ${
              bgRevealed ? 'opacity-100 scale-100 animate-hero-subtle' : 'opacity-0 scale-[1.06]'
            }`}
            style={{
              backgroundImage: 'url("/hero-bg.jpg")',
              backgroundPosition: 'right 20% center',
            }}
          />

          {/* Atmosphere Gradient Wash for Optimal High-Contrast Typography & Sky Brightness */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/50 via-sky-900/25 to-transparent lg:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/50 via-transparent to-transparent sm:hidden" />
        </div>

        {/* Hero Content Container inside full width with Scroll Parallax */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16 sm:py-24"
          style={{
            transform: `translate3d(0, -${contentParallaxY}px, 0)`,
            opacity: contentOpacity,
            willChange: scrollY > 0 ? 'transform, opacity' : 'auto',
          }}
        >
          <div className="max-w-2xl lg:max-w-3xl">
            
            {/* Large White Headline: “Take Control of Autonomous AI” with Staggered Line-by-Line Reveal */}
            <h1 className="hero-title select-none drop-shadow-sm">
              <div className="overflow-hidden py-1">
                <span
                  className={`inline-block transition-all duration-700 ease-premium ${
                    headingLine1Revealed
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  Take Control of
                </span>
              </div>
              <div className="overflow-hidden py-1">
                <span
                  className={`inline-block text-white transition-all duration-700 ease-premium ${
                    headingLine2Revealed
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                >
                  Autonomous AI
                </span>
              </div>
            </h1>

            {/* Short Supporting Description with subtle fade-up transition */}
            <p
              className={`text-base sm:text-lg lg:text-xl text-white/95 max-w-xl font-normal leading-relaxed mt-5 sm:mt-6 drop-shadow-xs transition-all duration-700 ease-premium ${
                paraRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Safe, deterministic, and sovereign multi-agent swarms all in one unified mesh. Sub-45ms latency with zero data egress.
            </p>

            {/* Two Pill-Shaped CTAs with Upward Movement, Hover Lift, Scale, Shadow & Smooth Color Transitions */}
            <div className="pt-8 sm:pt-10 flex flex-wrap items-center gap-4">
              {/* Dark Pill CTA: “Explore Capabilities” */}
              <button
                type="button"
                onClick={() => handleScrollTo('capabilities')}
                className={`group px-8 py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-slate-950 hover:bg-slate-900 shadow-md hover:shadow-xl hover:shadow-slate-950/25 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.99] active:translate-y-0 cursor-pointer border border-slate-800/80 flex items-center gap-2 ${
                  btn1Revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <span>Explore Capabilities</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
              </button>

              {/* Crisp White Pill CTA: “Book Enterprise Demo” with smooth non-abrupt color transition */}
              <button
                type="button"
                onClick={() => handleScrollTo('contact')}
                className={`group px-8 py-3.5 rounded-full text-sm sm:text-base font-bold text-slate-950 bg-white hover:bg-slate-950 hover:text-white shadow-md hover:shadow-xl transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.99] active:translate-y-0 cursor-pointer border border-transparent hover:border-slate-800 flex items-center gap-2 ${
                  btn2Revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <span>Book Enterprise Demo</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. Seamless Flow into Proof Bar, Telemetry Sandbox, and Tech Stack        */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Proof Bar / High-Performance Metrics Ticker */}
        <div
          className={`pt-4 border-t border-slate-200/90 transition-all duration-700 ease-premium ${
            proofBarRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-slate-950">
                $1.4B<span className="text-blue-600">+</span>
              </div>
              <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                Monthly Autonomous Flow
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                Financial &amp; Core Settlement
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-blue-600">
                &lt; 38ms
              </div>
              <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                Inference &amp; Decision Latency
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                Sub-millisecond verification
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-slate-950">
                99.8<span className="text-blue-600">%</span>
              </div>
              <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                Verification Precision Rate
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                Deterministic guardrail layer
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-slate-950">
                0 <span className="text-blue-600">Egress</span>
              </div>
              <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                Sovereign Private Deployments
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                Air-gapped on-premise &amp; VPC
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Autonomous Multi-Agent Swarm Telemetry Sandbox */}
        <div className="mt-12 rounded-3xl bg-midnight-900 border border-slate-800 shadow-2xl overflow-hidden text-slate-300">
          {/* Top Terminal Bar */}
          <div className="bg-midnight-950 px-5 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5 pl-2">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                mesh://cluster-production-alpha.tokenwave.internal
              </span>
            </div>

            {/* View switcher tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-full border border-slate-800 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('topology')}
                className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                  activeTab === 'topology'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Swarm Topology
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('telemetry')}
                className={`px-3 py-1 rounded-full transition-colors cursor-pointer ${
                  activeTab === 'telemetry'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Live Telemetry
              </button>
            </div>
          </div>

          {/* Interactive Topology Sandbox Content */}
          <div className="p-6 lg:p-8 bg-gradient-to-b from-midnight-900 to-midnight-950">
            {activeTab === 'topology' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Agent Node Selector Buttons */}
                <div className="lg:col-span-5 space-y-2.5">
                  <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                    <Network className="w-3.5 h-3.5 text-blue-400" />
                    Autonomous Swarm Nodes (Click to Inspect)
                  </div>
                  {agentNodes.map((node, idx) => (
                    <button
                      key={node.name}
                      type="button"
                      onClick={() => setActiveNode(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                        activeNode === idx
                          ? 'bg-slate-800/90 border-blue-500 shadow-[0_0_15px_rgba(2,132,199,0.25)]'
                          : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/40 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${activeNode === idx ? 'bg-blue-500 animate-ping' : 'bg-slate-600'}`} />
                          {node.name}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          {node.role}
                        </div>
                      </div>
                      <div className="text-right font-mono text-xs shrink-0 pl-2">
                        <div className="text-emerald-400">{node.latency}</div>
                        <div className="text-[10px] text-slate-500">{node.tokens}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Live Node Inspection Matrix */}
                <div className="lg:col-span-7 bg-midnight-850 p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Cpu className="w-32 h-32 text-blue-500" />
                  </div>

                  <div className="pb-4 border-b border-slate-800">
                    <h4 className="text-lg font-bold text-white font-heading">
                      {agentNodes[activeNode].name}
                    </h4>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 font-mono text-xs">
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400">Node Status</div>
                      <div className="text-white font-semibold mt-1">{agentNodes[activeNode].status}</div>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400">Throughput</div>
                      <div className="text-blue-400 font-semibold mt-1">{agentNodes[activeNode].tokens}</div>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400">P99 Loop Latency</div>
                      <div className="text-emerald-400 font-semibold mt-1">{agentNodes[activeNode].latency}</div>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <div className="text-slate-400">Compliance &amp; Custody</div>
                      <div className="text-white font-semibold mt-1">{agentNodes[activeNode].verification}</div>
                    </div>
                  </div>

                  {/* Architecture Log Stream */}
                  <div className="mt-5 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-1.5">
                    <div className="text-slate-500 uppercase tracking-wider text-[10px]">
                      // Real-time deterministic execution trace
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="text-blue-400">&gt;</span>
                      <span>[Orchestrator] Dispatched sub-goal: vector index lookup with 512-dim embedding</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="text-emerald-500">✓</span>
                      <span>[Guardrail] Evaluated against OWASP LLM-01 &amp; ISO 42001 constraint set in 1.4ms</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="text-blue-400">&gt;</span>
                      <span>[Ray Cluster] Zero socket leakage. Local IPC transfer finished in 0.8ms</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Telemetry Mode */
              <div className="space-y-6 font-mono">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400">Active Token Stream</div>
                    <div className="text-2xl font-bold text-blue-400 mt-1">
                      {telemetryTicks.tokensPerSec.toLocaleString()} <span className="text-xs font-normal text-slate-400">tok/s</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1">▲ 4.2% nominal load</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400">Concurrent Swarm Agents</div>
                    <div className="text-2xl font-bold text-white mt-1">
                      {telemetryTicks.activeAgents} <span className="text-xs font-normal text-slate-400">workers</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Deterministic sync active</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400">P99 Swarm Latency</div>
                    <div className="text-2xl font-bold text-emerald-400 mt-1">
                      {telemetryTicks.p99Latency} <span className="text-xs font-normal text-slate-400">ms</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1">SLA guarantee &lt;45ms</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400">Evaluation Accuracy</div>
                    <div className="text-2xl font-bold text-white mt-1">
                      {telemetryTicks.verifiedPass}%
                    </div>
                    <div className="text-[10px] text-blue-400 mt-1">Zero semantic drift</div>
                  </div>
                </div>

                <div className="bg-midnight-850 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                    <span className="font-bold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-400" />
                      Live Multi-Tenant Pipeline Heartbeat
                    </span>
                    <span className="text-emerald-400 text-[11px]">All 6 Global Clusters Operational</span>
                  </div>
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="text-slate-400">[08:42:19.402] TRITON_CLUSTER_US_WEST: batch_size=64, kv_cache_util=48.2%, p99=31.4ms</div>
                    <div className="text-slate-400">[08:42:19.418] MILVUS_SHARD_EU_CENTRAL: hybrid_dense_sparse_query time=14.2ms hits=128</div>
                    <div className="text-emerald-400">[08:42:19.431] GUARDRAIL_VALIDATOR: deterministic JSON schema conformance 100.0%</div>
                    <div className="text-slate-400">[08:42:19.444] PRIVATE_VPC_INGRESS: mutual TLS handshake established (SHA-384 / TLS 1.3)</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tech Stack Logo Ticker */}
        <TechLogosTicker />

      </div>
    </section>
  );
};
