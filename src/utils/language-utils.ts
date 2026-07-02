import { localizedSiteConfig, siteConfig } from "@/config";

export type SiteLanguage = "zh_CN" | "en";

export const SUPPORTED_LANGUAGES: SiteLanguage[] =
	siteConfig.languages?.length === 2
		? (siteConfig.languages as SiteLanguage[])
		: ["zh_CN", "en"];

const LANG_STORAGE_KEY = "lang";

export function getStoredLang(): SiteLanguage {
	if (typeof localStorage === "undefined") {
		return siteConfig.lang as SiteLanguage;
	}

	const stored = localStorage.getItem(LANG_STORAGE_KEY);
	if (stored === "zh_CN" || stored === "en") {
		return stored;
	}

	return siteConfig.lang as SiteLanguage;
}

export function setStoredLang(lang: SiteLanguage): void {
	localStorage.setItem(LANG_STORAGE_KEY, lang);
}

export function getHtmlLang(lang: SiteLanguage): string {
	return lang.replace("_", "-");
}

export function getLocalizedSubtitle(lang: SiteLanguage): string {
	return localizedSiteConfig[lang].subtitle;
}

export function getLocalizedBio(lang: SiteLanguage): string {
	return localizedSiteConfig[lang].bio;
}
