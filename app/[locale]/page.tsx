import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function Home() {
  const t = useTranslations('Index')

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-primary-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Farm background" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-10 leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/listings/lands" 
                className="bg-primary-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-700 transition shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2"
              >
                <span>{t('getStarted')}</span>
                <span>→</span>
              </Link>
              <Link 
                href="/profile/create" 
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition flex items-center justify-center gap-2"
              >
                <span>Join as Partner</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FarmMate?</h2>
            <p className="text-gray-600">We make it simple to connect, lease, and grow. Our platform is designed specifically for the needs of Indian agriculture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Connections</h3>
              <p className="text-gray-600">Connect directly with land owners or farmers. No middlemen, no hidden fees. Just transparent partnerships.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fair Pricing</h3>
              <p className="text-gray-600">Negotiate fair terms for land leases, crop sharing, or labor contracts. We help you find the best value.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Listings</h3>
              <p className="text-gray-600">Browse detailed profiles and listings with verified location data to ensure you're making safe decisions.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <section className="py-24 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-primary-600 font-semibold tracking-wide uppercase mb-3">How It Works</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple steps to your next harvest
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;ve streamlined the process of finding the perfect agricultural match, ensuring transparency and trust at every step.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                ),
                title: "Create Verified Profile",
                desc: "Sign up as a landowner or farmer. Our verification process ensures a safe community for everyone."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                ),
                title: "List or Browse",
                desc: "Post detailed land listings with soil data and climate info, or browse opportunities that match your expertise."
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                ),
                title: "Connect & Grow",
                desc: "Start conversations, negotiate terms, and build mutually beneficial partnerships that last."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 group">
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-900 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to transform your agricultural journey?</h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Join thousands of forward-thinking farmers and landowners today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/profile/create?type=landowner"
              className="bg-white text-primary-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition shadow-lg"
            >
              I Own Land
            </Link>
            <Link
              href="/profile/create?type=farmer"
              className="bg-primary-700 text-white px-8 py-4 rounded-xl font-bold border border-primary-600 hover:bg-primary-600 transition shadow-lg"
            >
              I&apos;m a Farmer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
