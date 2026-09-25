import React, { useState, memo } from 'react';
import { 
  Mail, 
  Clock, 
  CheckCircle2, 
  Send, 
  Lock, 
  AlertCircle,
  Copy,
  Check,
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactProps {
  selectedServicePreset: string;
  onClearPreset: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How quickly can an Applied AI pilot or PoC be launched?',
    answer: 'Most enterprise pilots launch within 2 to 4 weeks. We work in rapid sprint cadences: establishing private VPC connectivity in Week 1, deploying baseline model inference pipelines in Week 2, and delivering production benchmark validation by Week 4.',
  },
  {
    question: 'Where is our enterprise data processed and stored?',
    answer: 'Exclusively inside your VPC or on-premises perimeter (AWS, Azure, GCP, or sovereign air-gapped clusters). We enforce a strict Zero-Egress guarantee: your proprietary data is never transmitted to third parties or used for public foundation model training.',
  },
  {
    question: 'Who owns the intellectual property (IP) and custom models?',
    answer: 'You own 100% of the IP. All custom fine-tuned weights, bespoke architectures, data pipelines, integrations, and application code developed during our engagement belong entirely to your enterprise.',
  },
  {
    question: 'Can TokenWave integrate with our legacy databases and ERP systems?',
    answer: 'Yes. Our engineers specialize in enterprise legacy modernization. We build secure hybrid data bridges, custom ETL connectors, and API gateways that connect your existing mainframe, SQL, SAP, Oracle, or proprietary databases directly to modern AI orchestration frameworks.',
  },
  {
    question: 'What post-deployment support and SLAs do you provide?',
    answer: 'We offer enterprise-grade SLA tiers including 24/7/365 telemetry monitoring, automated drift detection, continuous model retraining pipelines, and a guaranteed < 15-minute response time for critical production incidents.',
  },
];

export const ContactComponent: React.FC<ContactProps> = ({ selectedServicePreset, onClearPreset }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    service: 'Applied AI Engineering',
    deployment: 'Private Cloud VPC',
    message: '',
    ndaRequested: true,
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [prevPreset, setPrevPreset] = useState(selectedServicePreset);

  // Sync service preset when selectedServicePreset changes during render
  if (selectedServicePreset !== prevPreset) {
    setPrevPreset(selectedServicePreset);
    if (selectedServicePreset) {
      if (
        selectedServicePreset.toLowerCase().includes('careers') || 
        selectedServicePreset.toLowerCase().includes('engineer') || 
        selectedServicePreset.toLowerCase().includes('lead') || 
        selectedServicePreset.toLowerCase().includes('architect')
      ) {
        setFormData((prev) => ({
          ...prev,
          service: 'Careers / Talent Acquisition',
          message: prev.message || `Applying for role: ${selectedServicePreset}. Please find my portfolio and background attached.`,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          service: selectedServicePreset,
          message: prev.message || `Inquiring about enterprise pilot deployment for ${selectedServicePreset}.`,
        }));
      }
    }
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('operations@tokenwaveai.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.organization.trim()) {
      newErrors.organization = 'Enterprise organization name is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please briefly describe your pilot scope or requirements';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate enterprise intake API dispatch
    setTimeout(() => {
      const generatedRef = `TW-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(generatedRef);
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0284C7', '#2563EB', '#0B0F19', '#FFFFFF'],
      });
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      organization: '',
      service: 'Applied AI Engineering',
      deployment: 'Private Cloud VPC',
      message: '',
      ndaRequested: true,
    });
    setSubmitSuccess(false);
    onClearPreset();
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-200">
      <div id="faq" className="scroll-mt-28" />
      <div className="max-w-[1400px] xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wide bg-blue-50 text-blue-600 border border-blue-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            ENTERPRISE ENGAGEMENT
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 font-heading tracking-tight [text-wrap:balance]">
            Contact Us &amp; Questions &amp; Answers
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto text-center leading-relaxed">
            Directly connect with our Principal AI Systems Architects or explore answers to common enterprise integration and security questions.
          </p>
        </div>

        {/* 2-Column Side-by-Side Layout: Exactly Equal Width & Height */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Side: Contact Us (Form & Direct Channel) */}
          <div className="h-full flex flex-col">
            <div className="rounded-3xl bg-slate-50 border border-slate-200 shadow-xl p-6 sm:p-8 lg:p-9 h-full flex flex-col justify-between relative">
              {submitSuccess ? (
                /* Success State with Reference ID */
                <div className="text-center py-12 my-auto space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-slate-950 font-heading">
                      Pilot Intake Brief Received
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. A Principal AI Systems Architect has been assigned to your brief.
                    </p>
                  </div>

                  <div className="max-w-xs mx-auto p-4 rounded-xl bg-white border border-slate-200 shadow-sm font-mono text-xs text-left space-y-1.5">
                    <div className="text-slate-400 text-[10px]">PILOT REFERENCE NUMBER</div>
                    <div className="text-lg font-bold text-blue-600">{referenceId}</div>
                    <div className="text-slate-500 text-[11px] pt-1">
                      Organization: <span className="text-slate-900">{formData.organization}</span>
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      SLA Target: <span className="text-emerald-600 font-semibold">Under 4 Hours</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Submit Another Pilot Request
                    </button>
                  </div>
                </div>
              ) : (
                /* Intake Form */
                <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between space-y-5" noValidate>
                  {/* Top Header & Security Badges */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 mb-4">
                      <div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-blue-100 text-blue-800 mb-1">
                          <Send className="w-3 h-3 text-blue-600" />
                          Direct Channel
                        </span>
                        <h3 className="text-2xl font-bold text-slate-950 font-heading">
                          Contact Us
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Confidential consultation protected under mutual NDA
                        </p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1">
                        <span className="text-xs font-mono text-emerald-600 font-semibold flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" />
                          TLS 1.3 Encrypted
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-blue-600" />
                          SLA &lt; 4 Hours
                        </span>
                      </div>
                    </div>

                    {/* Fast-Track Direct Email Bar */}
                    <div className="p-3.5 rounded-xl bg-slate-900 text-white flex items-center justify-between border border-slate-800 mb-4">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                        <span className="font-mono text-xs sm:text-sm text-slate-200 truncate">
                          operations@tokenwaveai.com
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                        title="Copy email to clipboard"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[11px] text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-300" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-1.5">
                            Full Name <span className="text-blue-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="e.g. Dr. Jennifer Chen"
                            className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                              errors.fullName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                            }`}
                          />
                          {errors.fullName && (
                            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Work Email */}
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-1.5">
                            Work / Corporate Email <span className="text-blue-600">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="j.chen@enterprise.com"
                            className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                              errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                            }`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Organization */}
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-1.5">
                            Enterprise / Organization <span className="text-blue-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            placeholder="e.g. Fortune 500 Enterprise"
                            className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all ${
                              errors.organization ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                            }`}
                          />
                          {errors.organization && (
                            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.organization}
                            </p>
                          )}
                        </div>

                        {/* Service of Interest */}
                        <div>
                          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-1.5">
                            Service of Interest
                          </label>
                          <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                          >
                            <option value="Applied AI Engineering">Applied AI Engineering</option>
                            <option value="Enterprise Data Engineering">Enterprise Data Engineering</option>
                            <option value="Generative AI Solutions">Generative AI Solutions</option>
                            <option value="Platform Reliability & DevOps">Platform Reliability &amp; DevOps</option>
                            <option value="Software Product Engineering">Software Product Engineering</option>
                          </select>
                        </div>
                      </div>

                      {/* Target Deployment Infrastructure */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-1.5">
                          Target Deployment Perimeter
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'Private Cloud VPC',
                            'On-Prem Air-Gapped',
                            'Sovereign Hybrid',
                            'Edge Cluster'
                          ].map((env) => (
                            <button
                              key={env}
                              type="button"
                              onClick={() => setFormData({ ...formData, deployment: env })}
                              className={`p-2 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
                                formData.deployment === env
                                  ? 'bg-slate-900 text-white border-slate-900 font-bold'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {env}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Project Scope / Message */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono mb-1.5">
                          Project Scope &amp; Technical Requirements <span className="text-blue-600">*</span>
                        </label>
                        <textarea
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Outline target transaction throughput, existing stack (e.g. AWS/Azure, Triton, vLLM), or pilot timeline..."
                          className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all resize-y ${
                            errors.message ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                          }`}
                        />
                        {errors.message && (
                          <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.message}
                          </p>
                        )}
                      </div>

                      {/* NDA Checkbox */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="nda"
                          checked={formData.ndaRequested}
                          onChange={(e) => setFormData({ ...formData, ndaRequested: e.target.checked })}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-600 accent-blue-600 cursor-pointer"
                        />
                        <label htmlFor="nda" className="text-xs text-slate-600 select-none cursor-pointer">
                          Send standard bilateral Mutual Non-Disclosure Agreement (M-NDA) ahead of call.
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button (anchored cleanly at bottom) */}
                  <div className="pt-2 mt-auto">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Routing to Principal Architect...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Pilot Request</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                    <div className="mt-2 text-center text-[11px] text-slate-500 font-mono">
                      Strict Zero Egress: Your submission is never stored or utilized for model training.
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Side: Q / A (Frequently Asked Questions Accordion) */}
          <div className="h-full flex flex-col">
            <div className="rounded-3xl bg-slate-50 border border-slate-200 shadow-xl p-6 sm:p-8 lg:p-9 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-blue-100 text-blue-800 mb-1">
                      <HelpCircle className="w-3 h-3 text-blue-600" />
                      Knowledge Base
                    </span>
                    <h3 className="text-2xl font-bold text-slate-950 font-heading">
                      Questions &amp; Answers (Q/A)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Clear answers regarding enterprise pilots, data privacy, and architecture.
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
                </div>

                {/* Accordion Questions */}
                <div className="space-y-3">
                  {FAQ_ITEMS.map((item, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div
                        key={index}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                          isOpen 
                            ? 'bg-white border-blue-500 shadow-sm ring-1 ring-blue-500/20' 
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(index)}
                          className="w-full py-3.5 px-4 sm:px-5 text-left flex items-center justify-between gap-3 cursor-pointer focus:outline-none"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                              isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {index + 1}
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-slate-900 font-heading">
                              {item.question}
                            </span>
                          </div>
                          <ChevronDown 
                            className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-blue-600' : ''
                            }`} 
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                            <p className="text-justify leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Support Callout (anchored cleanly at bottom) */}
              <div className="mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-0.5">Need a customized architecture review?</span>
                  Submit your brief using the <span className="font-semibold text-blue-700">Contact Us</span> form on the left, or email our engineering team directly at <span className="font-mono font-semibold text-blue-700">operations@tokenwaveai.com</span>.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export const Contact = memo(ContactComponent);
