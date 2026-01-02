'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLanguage = () => {
        let nextLocale = 'en';
        if (locale === 'en') nextLocale = 'hi';
        else if (locale === 'hi') nextLocale = 'mr';
        else if (locale === 'mr') nextLocale = 'en';

        // Replace the locale in the pathname
        const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`) || `/${nextLocale}`;
        router.push(newPathname);
    };

    const getLabel = () => {
        if (locale === 'en') return 'हिन्दी';
        if (locale === 'hi') return 'मराठी';
        return 'English';
    }

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all border border-gray-200 backdrop-blur-sm text-sm font-medium"
        >
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary-600 text-white text-[10px] font-bold">
                {locale.toUpperCase()}
            </span>
            {getLabel()}
        </button>
    );
}
