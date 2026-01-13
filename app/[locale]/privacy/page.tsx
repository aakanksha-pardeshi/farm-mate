'use client'

import React from 'react';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
  const t = useTranslations('Common');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

        <div className="space-y-6 text-gray-700">
          <p className="text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Welcome to FarmMate. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you as to how we look after your personal data when you visit our website
              and tell you about your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p>
              We collect and process the following data when you list land or create a profile:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Identity Data: Name.</li>
              <li>Contact Data: Email address and telephone numbers.</li>
              <li>Property Data: Details about the land you list (location, size, characteristics).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p>
              The primary purpose of collecting your email and phone number is to <strong>facilitate connections</strong> between landowners and farmers.
              By listing your land or expressing interest, you consent to us sharing your contact details with potential matches on the platform
              to enable direct communication.
            </p>
            <p className="mt-2">
              We do not sell your personal data to third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
