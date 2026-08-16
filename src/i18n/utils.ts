import { locale, defaultLang } from './locale';

export type Lang = keyof typeof locale;

export function getLangFromPath(pathname: string): Lang {
    const [, lang] = pathname.split("/");
    return lang in locale ? (lang as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
    return function t(key: keyof (typeof locale)[typeof defaultLang]) {
        return locale[lang][key] ?? locale[defaultLang][key];
    }
}