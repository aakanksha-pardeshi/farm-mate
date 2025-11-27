import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 to-primary-900/90"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-800/50 border border-primary-700 mb-8 backdrop-blur-sm">
            <span className="animate-pulse h-2 w-2 rounded-full bg-accent-500"></span>
            <span className="text-sm font-medium text-primary-100">Trusted by 10,000+ Farmers</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white">
            Cultivate <span className="text-primary-400">Partnerships</span>,<br />
            Grow <span className="text-accent-500">Together</span>.
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            The most trusted platform connecting landowners with skilled farmers.
            Maximize yield, ensure sustainable land use, and build lasting agricultural relationships.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/listings/lands"
              className="bg-primary-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-400 transition shadow-lg hover:shadow-primary-500/25 flex items-center justify-center gap-2"
            >
              <span>Find Land</span>
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
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-800">50k+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">Acres Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-800">10k+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">Farmers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-800">₹2Cr+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">Value Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-800">98%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

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
                icon: "👤",
                title: "Create Verified Profile",
                desc: "Sign up as a landowner or farmer. Our verification process ensures a safe community for everyone."
              },
              {
                icon: "📋",
                title: "List or Browse",
                desc: "Post detailed land listings with soil data and climate info, or browse opportunities that match your expertise."
              },
              {
                icon: "🤝",
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
