'use client'

import React from 'react';
import { useTranslations } from 'next-intl';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>

                <div className="space-y-6 text-gray-700">
                    <p className="text-lg">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">1. Nature of Service</h2>
                        <p>
                            FarmMate is exclusively a <strong>discovery platform</strong>. Our service is limited to connecting landowners with farmers.
                            We provide the platform for you to list availability and find opportunities, but we do not manage or operate any properties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">2. No Legal Involvement</h2>
                        <p>
                            <strong>Important:</strong> We are not a party to any agreement or contract formed between users.
                            FarmMate has <strong>no legal involvement</strong> in the transactions or relationships formed through this platform.
                            We do not verify the legal ownership of lands listed nor the credentials of farmers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">3. User Responsibilities</h2>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>You are solely responsible for verifying the identity and claims of other parties before entering into any agreement.</li>
                            <li>We strongly recommend seeking independent legal advice before signing any agreements.</li>
                            <li>You agree to provide accurate and truthful information in your listings and profile.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">4. Limitation of Liability</h2>
                        <p>
                            To the fullest extent permitted by law, FarmMate shall not be liable for any direct, indirect, incidental,
                            special, consequential, or exemplary damages, including but not limited to damages for loss of profits,
                            goodwill, use, data, or other intangible losses resulting from the use of or inability to use the service.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
