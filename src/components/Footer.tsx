import React from 'react';
import { ArrowUp } from 'lucide-react';
import type { LegalModalType } from '../types';

interface FooterProps {
  onOpenLegalModal: (type: LegalModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.pushState(null, '', '#home');
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
      history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <footer className="bg-[#0B1313] text-slate-400 border-t border-slate-900 text-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-16 sm:pt-20 pb-16">
        
        {/* ========================================================================= */}
        {/* 1. Giant Brand Header: TokenWave (styled after reference layout)          */}
        {/* ========================================================================= */}
        <div className="pb-8 sm:pb-12 border-b border-white/10 select-none overflow-hidden">
          <h2 className="text-[clamp(3.6rem,11.2vw,9.8rem)] font-serif font-bold tracking-[-0.035em] leading-[0.9] flex items-baseline">
            <span className="text-white">Token</span>
            <span className="text-blue-500">Wave</span>
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* 2. Four Link Columns (Products, Industries, Resources, Company)           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-14 pt-12 sm:pt-14 pb-16 text-xs sm:text-[13px]">
          
          {/* Column 1: Products */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 sm:mb-6 tracking-wide">
              Products
            </h3>
            <ul className="space-y-3 sm:space-y-3.5 text-slate-400 font-normal">
              <li>
                <a href="#capabilities" onClick={(e) => handleSmoothScroll(e, 'capabilities')} className="hover:text-white transition-colors">
                  Digital Banking
                </a>
              </li>
              <li>
                <a href="#capabilities" onClick={(e) => handleSmoothScroll(e, 'capabilities')} className="hover:text-white transition-colors">
                  Personal Accounts
                </a>
              </li>
              <li>
                <a href="#capabilities" onClick={(e) => handleSmoothScroll(e, 'capabilities')} className="hover:text-white transition-colors">
                  Business Accounts
                </a>
              </li>
              <li>
                <a href="#capabilities" onClick={(e) => handleSmoothScroll(e, 'capabilities')} className="hover:text-white transition-colors">
                  Mobile App
                </a>
              </li>
              <li>
                <a href="#capabilities" onClick={(e) => handleSmoothScroll(e, 'capabilities')} className="hover:text-white transition-colors">
                  Instant Transfers
                </a>
              </li>
              <li>
                <a href="#capabilities" onClick={(e) => handleSmoothScroll(e, 'capabilities')} className="hover:text-white transition-colors">
                  Bill Pay
                </a>
              </li>
              <li>
                <a href="#capabilities" onClick={(e) => handleSmoothScroll(e, 'capabilities')} className="hover:text-white transition-colors">
                  International Payments
                </a>
              </li>
              <li>
                <a href="#capabilities" onClick={(e) => handleSmoothScroll(e, 'capabilities')} className="hover:text-white transition-colors">
                  Savings Goals
                </a>
              </li>
              <li>
                <a href="#capabilities" onClick={(e) => handleSmoothScroll(e, 'capabilities')} className="hover:text-white transition-colors">
                  Virtual Cards
                </a>
              </li>
              <li>
                <a href="#capabilities" onClick={(e) => handleSmoothScroll(e, 'capabilities')} className="hover:text-white transition-colors">
                  Debit Management
                </a>
              </li>
              <li>
                <a href="#capabilities" onClick={(e) => handleSmoothScroll(e, 'capabilities')} className="hover:text-white transition-colors">
                  Credit &amp; Rights
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Industries We Serve */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 sm:mb-6 tracking-wide">
              Industries We Serve
            </h3>
            <ul className="space-y-3 sm:space-y-3.5 text-slate-400 font-normal">
              <li>
                <a href="#industries" onClick={(e) => handleSmoothScroll(e, 'industries')} className="hover:text-white transition-colors">
                  Freelancers
                </a>
              </li>
              <li>
                <a href="#industries" onClick={(e) => handleSmoothScroll(e, 'industries')} className="hover:text-white transition-colors">
                  Small Businesses
                </a>
              </li>
              <li>
                <a href="#industries" onClick={(e) => handleSmoothScroll(e, 'industries')} className="hover:text-white transition-colors">
                  Online Sellers
                </a>
              </li>
              <li>
                <a href="#industries" onClick={(e) => handleSmoothScroll(e, 'industries')} className="hover:text-white transition-colors">
                  Agencies
                </a>
              </li>
              <li>
                <a href="#industries" onClick={(e) => handleSmoothScroll(e, 'industries')} className="hover:text-white transition-colors">
                  Retail Stores
                </a>
              </li>
              <li>
                <a href="#industries" onClick={(e) => handleSmoothScroll(e, 'industries')} className="hover:text-white transition-colors">
                  Travel &amp; Hospitality
                </a>
              </li>
              <li>
                <a href="#industries" onClick={(e) => handleSmoothScroll(e, 'industries')} className="hover:text-white transition-colors">
                  Health &amp; Wellness
                </a>
              </li>
              <li>
                <a href="#industries" onClick={(e) => handleSmoothScroll(e, 'industries')} className="hover:text-white transition-colors">
                  Finance &amp; Legal
                </a>
              </li>
              <li>
                <a href="#industries" onClick={(e) => handleSmoothScroll(e, 'industries')} className="hover:text-white transition-colors">
                  Education Providers
                </a>
              </li>
              <li>
                <a href="#industries" onClick={(e) => handleSmoothScroll(e, 'industries')} className="hover:text-white transition-colors">
                  NGOs &amp; Donors
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 sm:mb-6 tracking-wide">
              Resources
            </h3>
            <ul className="space-y-3 sm:space-y-3.5 text-slate-400 font-normal">
              <li>
                <a href="#insights" onClick={(e) => handleSmoothScroll(e, 'insights')} className="hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#insights" onClick={(e) => handleSmoothScroll(e, 'insights')} className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#insights" onClick={(e) => handleSmoothScroll(e, 'insights')} className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#insights" onClick={(e) => handleSmoothScroll(e, 'insights')} className="hover:text-white transition-colors">
                  Security Guide
                </a>
              </li>
              <li>
                <a href="#insights" onClick={(e) => handleSmoothScroll(e, 'insights')} className="hover:text-white transition-colors">
                  Fees &amp; Limits
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-white transition-colors">
                  Download App
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-white transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('terms')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Terms Glossary
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 sm:mb-6 tracking-wide">
              Company
            </h3>
            <ul className="space-y-3 sm:space-y-3.5 text-slate-400 font-normal">
              <li>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" onClick={(e) => handleSmoothScroll(e, 'careers')} className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-white transition-colors">
                  Partnerships
                </a>
              </li>
              <li>
                <a href="#insights" onClick={(e) => handleSmoothScroll(e, 'insights')} className="hover:text-white transition-colors">
                  Press &amp; Media
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-white transition-colors">
                  Investors
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-white transition-colors">
                  Social Impact
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal('privacy')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Legal Policies
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. Subtle Bottom Copyright Bar & Scroll to Top                            */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <p>© 2026 TokenWave AI. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
