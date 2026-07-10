import React from "react";

export const metadata = {
  title: "Terms of Service | Verified Global Life Sciences Directory",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-16 border border-slate-200 shadow-sm prose prose-slate max-w-none">
          <h1 className="text-4xl font-black text-slate-900 mb-8">Terms of Service</h1>
          <p className="text-slate-500 font-medium mb-12">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using our directory, you agree to be bound by these Terms. If you do not agree to these Terms, do not access or use our services.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Data Usage and Accuracy</h2>
          <p>
            The company information, including clinical trial data, FDA approvals, and manufacturing facilities, is provided &quot;as is&quot; and is aggregated from public sources. While we strive for accuracy, we make no guarantees regarding the completeness, reliability, or accuracy of this information.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Prohibited Activities</h2>
          <p>
            You agree not to scrape, systematically extract, or commercially exploit the data in our directory without explicit written consent. Automated querying of our endpoints without authorization is strictly prohibited.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Intellectual Property</h2>
          <p>
            The layout, design, and proprietary aggregation algorithms of this platform are protected by intellectual property laws. Company logos, trademarks, and branding belong to their respective owners.
          </p>
        </div>
      </div>
    </div>
  );
}
