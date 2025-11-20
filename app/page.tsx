import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Connect Farmers with Land Owners
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            FarmMate brings together landowners and farmers to create sustainable agricultural partnerships. 
            Find the perfect match for your land or farming expertise.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/listings/lands" 
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Browse Land Listings
            </Link>
            <Link 
              href="/listings/farmers" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition"
            >
              Browse Farmer Profiles
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-green-50">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up as a landowner or farmer. Build your profile with your experience, requirements, and preferences.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-green-50">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">List or Browse</h3>
              <p className="text-gray-600">
                Landowners can list their available land. Farmers can browse opportunities or create their own profile.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-green-50">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Make Connections</h3>
              <p className="text-gray-600">
                Connect with the right match. Start conversations and build mutually beneficial partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of farmers and landowners today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/profile/create?type=landowner" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              I'm a Land Owner
            </Link>
            <Link 
              href="/profile/create?type=farmer" 
              className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold border-2 border-white hover:bg-primary-800 transition"
            >
              I'm a Farmer
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

