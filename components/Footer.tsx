import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('Common')

  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                FM
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">FarmMate</span>
            </div>
            <p className="text-primary-200 text-sm mb-6">
              Connecting farmers with land owners for a sustainable and prosperous future.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition cursor-pointer">X</div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition cursor-pointer">in</div>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition cursor-pointer">fb</div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-primary-200">
              <li><Link href="/listings/lands" className="hover:text-white transition">{t('listings')}</Link></li>
              <li><Link href="/listings/farmers" className="hover:text-white transition">Find Farmers</Link></li>
              <li><Link href="/login" className="hover:text-white transition">Login</Link></li>
              <li><Link href="/profile/create" className="hover:text-white transition">Sign Up</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-primary-200">
              <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition">Safety Guidelines</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-300 text-sm">
            © {new Date().getFullYear()} FarmMate. All rights reserved.
          </p>
          <p className="text-primary-300 text-sm flex items-center gap-1">
            Made with code for Indian Agriculture
          </p>
        </div>
      </div>
    </footer>
  )
}
