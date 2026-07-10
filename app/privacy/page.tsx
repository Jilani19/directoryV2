import React from "react";

export const metadata = {
  title: "Privacy Policy | Verified Global Life Sciences Directory",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-16 border border-slate-200 shadow-sm prose prose-slate max-w-none">
          <h1 className="text-4xl font-black text-slate-900 mb-8">Privacy Policy</h1>
          <p className="text-slate-500 font-medium mb-12">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when you create an account, update your profile, use the interactive areas of our services, or communicate with us. The types of information we may collect include your name, email address, postal address, phone number, and any other information you choose to provide.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Use of Information</h2>
          <p>
            We may use the information we collect to provide, maintain, and improve our services, develop new features, and protect our users. We may also use the information to communicate with you about products, services, offers, promotions, and events.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Public Data and Directory</h2>
          <p>
            The company information displayed in our directory is aggregated from publicly available sources (such as FDA, SEC, GLEIF) and verified user submissions. If you are an executive or representative of a company and wish to update or remove certain public information, please contact us.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Security</h2>
          <p>
            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
          </p>
        </div>
      </div>
    </div>
  );
}
