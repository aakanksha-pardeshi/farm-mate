import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌾</span>
              <span className="text-xl font-bold text-white tracking-tight">FarmMate</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              Connecting landowners and farmers to create sustainable agricultural partnerships.
              Building the future of farming, together.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition cursor-pointer">X</div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition cursor-pointer">in</div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition cursor-pointer">fb</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/listings/lands" className="hover:text-primary-400 transition">Browse Lands</Link></li>
              <li><Link href="/listings/farmers" className="hover:text-primary-400 transition">Find Farmers</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition">How it Works</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="#" className="hover:text-primary-400 transition">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition">Safety Guidelines</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} FarmMate. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>🔒 Secure Platform</span>
            <span>•</span>
            <span>✅ Verified Users</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
