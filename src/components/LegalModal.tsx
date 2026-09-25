import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, Cpu, ExternalLink } from 'lucide-react';
import type { LegalModalType, CaseStudy } from '../types';

interface LegalModalProps {
  modalType: LegalModalType;
  selectedCaseStudy: CaseStudy | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  modalType,
  selectedCaseStudy,
  onClose,
}) => {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (modalType) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalType, onClose]);

  if (!modalType) return null;

  const renderContent = () => {
    switch (modalType) {
      case 'privacy':
        return (
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed text-justify">
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero-Data-Retention &amp; Zero-Telemetry Egress Guaranteed</span>
            </div>
            <h4 className="text-base font-bold text-slate-900">1. Sovereign Data Custody</h4>
            <p>
              TokenWave AI Limited ("TokenWave") adheres to a strict zero-custody architecture. Any data, customer prompts, contextual embeddings, or fine-tuning datasets processed via TokenWave AI agent meshes remain exclusively within the customer's designated sovereign perimeter (e.g. AWS VPC, Azure Confidential Compute, or on-premise air-gapped hardware).
            </p>
            <h4 className="text-base font-bold text-slate-900">2. No Public Model Training</h4>
            <p>
              Under no circumstances does TokenWave utilize enterprise client inputs, outputs, or telemetry to train, retrain, or improve public models or third-party foundation weights. All model weights and adapters derived from client engagement belong irrevocably to the client.
            </p>
            <h4 className="text-base font-bold text-slate-900">3. Global Regulatory Alignment</h4>
            <p>
              Our architectures are independently audited and compliant with EU GDPR (Regulation EU 2016/679), California CCPA/CPRA, HIPAA Security Rule (45 CFR Part 160/164), and ISO/IEC 42001 (Artificial Intelligence Management System).
            </p>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed text-justify">
            <h4 className="text-base font-bold text-slate-900">1. Enterprise Pilot Engagements</h4>
            <p>
              All TokenWave AI production pilots and proofs-of-concept are governed by signed Master Services Agreements (MSA) and bilateral Mutual Non-Disclosure Agreements (M-NDA).
            </p>
            <h4 className="text-base font-bold text-slate-900">2. Intellectual Property Rights</h4>
            <p>
              Clients retain full, exclusive ownership of all proprietary data, industry knowledge graphs, custom agent persona definitions, and fine-tuned parameter weights created during any engagement.
            </p>
            <h4 className="text-base font-bold text-slate-900">3. Service Level Agreements &amp; Latency Guarantees</h4>
            <p>
              Production clusters deployed on qualified NVIDIA H100/A100 hardware are backed by 99.99% uptime availability and guaranteed P99 inference latencies (&lt;45ms) specified in the pilot deployment schedule.
            </p>
          </div>
        );

      case 'accessibility':
        return (
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed text-justify">
            <h4 className="text-base font-bold text-slate-900">Commitment to Digital Accessibility</h4>
            <p>
              TokenWave AI is committed to ensuring digital accessibility for people of all abilities. We continually improve the user experience for everyone and apply the relevant accessibility standards, conforming to <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
            </p>
            <h4 className="text-base font-bold text-slate-900">Key Accessibility Provisions</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>High-contrast text ratios compliant with AAA and AA thresholds.</li>
              <li>Full keyboard navigation support across all modals, drawers, and form elements.</li>
              <li>ARIA semantic labeling and role descriptors on interactive multi-agent graphs.</li>
              <li>Respect for reduced motion system preferences (<span className="font-mono text-xs">prefers-reduced-motion</span>).</li>
            </ul>
          </div>
        );

      case 'cookies':
        return (
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed text-justify">
            <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono">
              Strictly Essential Telemetry Only — Zero Ad Trackers
            </div>
            <h4 className="text-base font-bold text-slate-900">Cookie Notice &amp; Telemetry Policy</h4>
            <p>
              We believe in minimal digital footprints. The TokenWave AI enterprise site employs strictly essential session tokens to preserve active navigation state, form completion progress, and load balancing routing.
            </p>
            <p>
              We do not employ third-party advertising cookies, behavioral tracking pixels, or cross-site data brokers. You may disable cookies in your browser settings at any time without impacting fundamental site access.
            </p>
          </div>
        );

      case 'case_study':
        if (!selectedCaseStudy) return null;
        return (
          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-600 font-bold">
                {selectedCaseStudy.industry}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-700 font-semibold">{selectedCaseStudy.client}</span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-950 font-heading">
                {selectedCaseStudy.title}
              </h3>
              <p className="mt-2 text-slate-600 leading-relaxed text-justify">
                {selectedCaseStudy.summary}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              {selectedCaseStudy.metrics.map((m, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-mono font-extrabold text-blue-600">
                    {m.value}
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {m.label}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {m.detail}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">
                Architecture Breakdown
              </h4>
              <div className="p-4 rounded-xl bg-slate-900 text-slate-300 font-mono text-xs space-y-2">
                <div className="text-blue-400 font-bold">// Production Deployment Blueprint</div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-slate-400" />
                  <span>Deployment Stack: {selectedCaseStudy.stack.join(' • ')}</span>
                </div>
                <div className="text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Zero Data Egress: Hardware-Enforced TLS 1.3 &amp; Enclave Memory</span>
                </div>
              </div>
            </div>

            {selectedCaseStudy.quote && selectedCaseStudy.quote.text && (
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs italic text-amber-950">
                "{selectedCaseStudy.quote.text}"
                <div className="mt-2 font-mono not-italic font-bold text-slate-900">
                  — {selectedCaseStudy.quote.author}, {selectedCaseStudy.quote.title}
                </div>
              </div>
            )}

            {selectedCaseStudy.link && (
              <div className="pt-2">
                <a
                  href={selectedCaseStudy.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Explore Full Case Study Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (modalType) {
      case 'privacy':
        return 'Global Enterprise Privacy & Sovereign Data Policy';
      case 'terms':
        return 'Enterprise Terms of Use & Service Commitments';
      case 'accessibility':
        return 'Accessibility Conformance Statement';
      case 'cookies':
        return 'Cookie & Telemetry Disclosure';
      case 'case_study':
        return 'Executive Engineering Brief';
      default:
        return 'Document';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-blue-600" />
            <h3 id="modal-title" className="text-base font-bold text-slate-900 font-heading">
              {getTitle()}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto" data-lenis-prevent>
          {renderContent()}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs font-mono text-slate-500">
          <span>TokenWave AI Governance Framework 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-sans font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
