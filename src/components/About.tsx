import React from 'react';
import { 
  GraduationCap, 
  HeartHandshake, 
  CheckCircle2, 
  XCircle, 
  Award,
  Globe2
} from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      number: '01',
      title: 'Zero-Data-Retention & Sovereign Custody',
      desc: 'No client data, confidential prompts, or vector embeddings ever train public models or leave your sovereign perimeter. We guarantee zero telemetry egress through cryptographic isolation.',
      tags: ['Air-Gapped VPC', 'Client Key Custody', 'Strict Zero-Logging']
    },
    {
      number: '02',
      title: 'Deterministic Verification Layers',
      desc: 'Replacing generative hallucinations with formal mathematical constraints. Every agent plan and tool invocation is pre-validated by AST grammar engines before execution.',
      tags: ['Formal Logic AST', 'Semantic Guardrails', 'Sub-millisecond Check']
    },
    {
      number: '03',
      title: 'Human-in-the-Loop Orchestration',
      desc: 'Autonomous swarms know their confidence boundaries. Ambiguous or high-consequence state mutations automatically escalate to authorized human stakeholders with complete context logs.',
      tags: ['Tiered Escalation', 'Auditable Decision Trees', 'Dual-Key Authorization']
    },
  ];

  const comparisonRows = [
    {
      feature: 'Data Sovereignty & Model Training',
      generic: 'Prompts potentially retained or used for public foundation model retraining',
      tokenWave: 'Zero data retention. 100% Sovereign VPC custody; strictly client-owned weights.',
    },
    {
      feature: 'Hallucination & Policy Risk',
      generic: 'Probabilistic black-box output; high vulnerability to jailbreaks and prompt injection',
      tokenWave: 'Deterministic AST verification & formal evaluation layers intercept 100% of schema drift.',
    },
    {
      feature: 'Latency SLA (P99)',
      generic: '800ms - 3,500ms dependent on public multi-tenant cloud load',
      tokenWave: 'Sub-38ms local Triton / Ray inference with dedicated GPU reservation.',
    },
    {
      feature: 'Enterprise Compliance Certification',
      generic: 'Self-attested generic cloud terms of service',
      tokenWave: 'SOC2 Type II, ISO 42001 (AI Management), HIPAA BAA, and FedRAMP High Ready.',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-offwhite relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 font-heading tracking-tight">
            Governed Intelligence: Precision AI You Can Audit and Trust
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            We reject the dogma that enterprises must surrender proprietary data or accept black-box hallucinations to harness cutting-edge multi-agent intelligence.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="rounded-2xl bg-white p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="absolute top-6 right-6 font-mono text-4xl font-extrabold text-slate-100 group-hover:text-blue-500/15 transition-colors">
                {pillar.number}
              </div>

              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-mono font-bold text-sm mb-6">
                  P{pillar.number}
                </div>

                <h3 className="text-xl font-bold text-slate-950 font-heading leading-snug group-hover:text-blue-600 transition-colors">
                  {pillar.title}
                </h3>

                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Comparative Governance Matrix */}
        <div className="rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden mb-20">
          <div className="bg-slate-900 text-white px-6 sm:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-heading">
                Governed Intelligence vs. Generic Cloud LLM APIs
              </h3>
            </div>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-mono text-xs uppercase">
                  <th className="p-4 sm:p-5 w-1/3">Evaluation Metric</th>
                  <th className="p-4 sm:p-5 w-1/3 text-slate-400">Generic Public Cloud LLM</th>
                  <th className="p-4 sm:p-5 w-1/3 text-blue-600 font-bold bg-blue-50/50">TokenWave Governed Swarms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{row.generic}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-900 bg-blue-50/30">
                      <div className="flex items-start gap-2 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.tokenWave}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Impact & Academic Initiatives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Initiative 1: Foundation */}
          <div className="rounded-2xl p-8 bg-gradient-to-br from-white to-slate-50 border border-slate-200/90 shadow-md flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                Corporate Social Responsibility
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-heading mt-1">
                TokenWave AI Innovation Foundation
              </h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                We dedicate 1.5% of annual cloud compute resources to non-profit global research institutions fighting climate collapse, developing open-source rare disease diagnostics, and promoting equitable STEM education.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-500">
                <Globe2 className="w-4 h-4 text-blue-600" />
                <span>Active grants in 14 countries • 100% open-access publications</span>
              </div>
            </div>
          </div>

          {/* Initiative 2: Institute */}
          <div className="rounded-2xl p-8 bg-gradient-to-br from-white to-slate-50 border border-slate-200/90 shadow-md flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7 text-blue-400" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                Talent &amp; Applied Research
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-heading mt-1">
                TokenWave AI Institute &amp; Academy
              </h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Co-incubating next-generation AI systems engineers alongside top university CS departments (Stanford, Cambridge, IISc, NUS). Our fellows publish breakthrough research in multi-agent game theory and deterministic verification.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-500">
                <Award className="w-4 h-4 text-blue-600" />
                <span>350+ PhD &amp; Master fellows trained • 24 Tier-1 conference papers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
