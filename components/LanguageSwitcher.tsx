'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        const nextLocale = locale === 'en' ? 'hi' : 'en';
        // Replace the locale in the pathname
        const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`) || `/${nextLocale}`;
        router.push(newPathname);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20 backdrop-blur-sm text-sm font-medium"
        >
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold">
                {locale.toUpperCase()}
            </span>
            {locale === 'en' ? 'हिन्दी' : 'English'}
        </button>
    );
}
