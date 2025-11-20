export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-700 dark:text-gray-200">
        <section>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Introduction</h2>
          <p className="leading-relaxed">
            FarmMate ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
          <p className="leading-relaxed mb-4">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Personal information (name, email address, phone number)</li>
            <li>Profile information (experience, skills, location)</li>
            <li>Land details (for landowners)</li>
            <li>Farming preferences and requirements</li>
            <li>Any other information you choose to provide</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
          <p className="leading-relaxed mb-4">We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Create and manage user profiles</li>
            <li>Display listings and profiles to other users</li>
            <li>Facilitate connections between farmers and landowners</li>
            <li>Send you updates and notifications about your account</li>
            <li>Improve our services and user experience</li>
            <li>Respond to your inquiries and provide customer support</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Information Sharing</h2>
          <p className="leading-relaxed">
            We share your information with other users of the platform to facilitate connections. 
            Your profile information and listings will be visible to other registered users. 
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Security</h2>
          <p className="leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal 
            information. However, no method of transmission over the internet is 100% secure, and 
            we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your Rights</h2>
          <p className="leading-relaxed mb-4">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Access your personal information</li>
            <li>Update or correct your information</li>
            <li>Delete your account and associated data</li>
            <li>Opt out of certain communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
          <p className="leading-relaxed">
            If you have questions about this Privacy Policy, please contact us through our platform 
            or via the contact information provided.
          </p>
        </section>
      </div>
    </div>
  )
}

