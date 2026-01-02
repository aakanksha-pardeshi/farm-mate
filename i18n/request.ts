import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
    console.log('i18n request locale:', locale);
    // Fallback to 'en' if locale is undefined or not supported
    const supportedLocales = ['en', 'hi', 'mr'];
    const finalLocale = locale && supportedLocales.includes(locale) ? locale : 'en';

    return {
        locale: finalLocale,
        messages: (await import(`../messages/${finalLocale}.json`)).default
    };
});
