import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FarmMate</h3>
            <p className="text-gray-400">
              Connecting farmers and landowners for sustainable agricultural partnerships.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/listings/lands" className="hover:text-white transition">Land Listings</Link></li>
              <li><Link href="/listings/farmers" className="hover:text-white transition">Farmer Profiles</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Get Started</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/profile/create?type=landowner" className="hover:text-white transition">For Land Owners</Link></li>
              <li><Link href="/profile/create?type=farmer" className="hover:text-white transition">For Farmers</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FarmMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

