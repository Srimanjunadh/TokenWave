import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send, 
  Lock, 
  AlertCircle,
  Globe2,
  Copy,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GLOBAL_OFFICES } from '../data/mockData';

interface ContactProps {
  selectedServicePreset: string;
  onClearPreset: () => void;
}

export const Contact: React.FC<ContactProps> = ({ selectedServicePreset, onClearPreset }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    service: 'Autonomous Multi-Agent Swarms',
    deployment: 'Private Cloud VPC',
    message: '',
    ndaRequested: true,
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [currentTime, setCurrentTime] = useState<Record<string, string>>({});

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

  // Live office time display
  useEffect(() => {
    const updateTimes = () => {
      const times: Record<string, string> = {};
      GLOBAL_OFFICES.forEach((office) => {
        try {
          times[office.city] = new Intl.DateTimeFormat('en-US', {
            timeZone: office.timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }).format(new Date());
        } catch {
          times[office.city] = '--:--';
        }
      });
      setCurrentTime(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pilots@tokenwaveai.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
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
      newErrors.message = 'Please briefly describe your pilot scope or role interest';
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
      service: 'Autonomous Multi-Agent Swarms',
      deployment: 'Private Cloud VPC',
      message: '',
      ndaRequested: true,
    });
    setSubmitSuccess(false);
    onClearPreset();
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 font-heading tracking-tight">
            Schedule an Applied AI Pilot with Our Principal Architects
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Directly connect with our systems engineering team. We guarantee a formal architectural response under mutual non-disclosure within 4 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Consultation & Global Presence */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Channel Card */}
            <div className="p-7 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-xl font-bold font-heading text-white">
                Enterprise Pilot Fast-Track
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Skip vendor sales tiers. Your brief goes straight to a Principal AI Systems Architect with 10+ years in distributed high-throughput MLOps.
              </p>

              <div className="mt-6 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="font-mono text-xs sm:text-sm text-slate-200 truncate">
                    pilots@tokenwaveai.com
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-xs font-mono text-white transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
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

              <div className="mt-4 flex items-center gap-3 text-xs font-mono text-slate-400">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Guaranteed SLA Response: &lt; 4 Hours</span>
              </div>
            </div>

            {/* Global Offices with Live Local Time */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-900 flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-blue-600" />
                  Global Engineering Hubs
                </h4>
                <span className="text-[10px] font-mono text-slate-500">Live Timezones</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GLOBAL_OFFICES.map((off) => (
                  <div
                    key={off.city}
                    className="p-3 rounded-xl bg-white border border-slate-200/70 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-blue-600" />
                        {off.city}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-blue-600">
                        {currentTime[off.city] || '--:--'}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-1">
                      {off.address}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {off.phone}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Intake Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-50 border border-slate-200 shadow-xl p-6 sm:p-8 lg:p-10 relative">
              {submitSuccess ? (
                /* Success State with Reference ID */
                <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
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
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="text-xl font-bold text-slate-950 font-heading">
                        Enterprise Pilot Consultation
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Confidential intake protected under mutual NDA
                      </p>
                    </div>
                    <span className="text-xs font-mono text-emerald-600 font-semibold flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      TLS 1.3 Encrypted
                    </span>
                  </div>

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
                        placeholder="e.g. Fortune 500 Bank or MedTech"
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
                        <option value="Autonomous Multi-Agent Swarms">Autonomous Multi-Agent Swarms</option>
                        <option value="Enterprise RAG Knowledge Mesh">Enterprise RAG Knowledge Mesh</option>
                        <option value="Sovereign MLOps & High-Throughput Inference">Sovereign MLOps &amp; Triton Stack</option>
                        <option value="Edge AI & Computer Vision">Edge AI &amp; Computer Vision</option>
                        <option value="Core Cloud Modernization & AI SREs">Core Cloud Modernization &amp; AI SREs</option>
                        <option value="Custom Sovereign Foundation Models">Custom Sovereign Foundation Models</option>
                        <option value="Careers / Talent Acquisition">Careers / Open Engineering Role</option>
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
                          className={`p-2.5 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
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
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline target transaction throughput, existing stack (e.g. AWS/Azure, Triton, vLLM), regulatory constraints, or candidate background..."
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
                      Send standard bilateral Mutual Non-Disclosure Agreement (M-NDA) ahead of technical consultation call.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
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
                      Strict Zero Egress: Your form submission is never stored or utilized for model training.
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
