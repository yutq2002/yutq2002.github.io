import { siteConfig } from "@/config";
import type I18nKey from "@/i18n/i18nKey";
import { getTranslation } from "@/i18n/translation";
import {
	getHtmlLang,
	getLocalizedBio,
	getLocalizedSubtitle,
	getStoredLang,
	type SiteLanguage,
} from "./language-utils";

export function applyLanguage(lang?: SiteLanguage): void {
	const activeLang = lang ?? getStoredLang();
	const translation = getTranslation(activeLang);

	document.documentElement.lang = getHtmlLang(activeLang);

	document.querySelectorAll<HTMLElement>("[data-i18n-key]").forEach((el) => {
		const key = el.dataset.i18nKey as I18nKey;
		if (key && translation[key]) {
			el.textContent = translation[key];
		}
	});

	document.querySelectorAll<HTMLInputElement>("[data-i18n-placeholder]").forEach(
		(el) => {
			const key = el.dataset.i18nPlaceholder as I18nKey;
			if (key && translation[key]) {
				el.placeholder = translation[key];
			}
		},
	);

	document.querySelectorAll<HTMLElement>("[data-lang-panel]").forEach((el) => {
		el.classList.toggle("hidden", el.dataset.langPanel !== activeLang);
	});

	const bioEl = document.querySelector<HTMLElement>("[data-i18n-bio]");
	if (bioEl) {
		bioEl.textContent = getLocalizedBio(activeLang);
	}

	const subtitleEl = document.querySelector<HTMLElement>("[data-i18n-subtitle]");
	if (subtitleEl) {
		subtitleEl.textContent = getLocalizedSubtitle(activeLang);
	}

	const titleKey = document.querySelector<HTMLElement>(
		"[data-page-i18n-title]",
	)?.dataset.pageI18nTitle as I18nKey | undefined;

	if (titleKey && translation[titleKey]) {
		document.title = `${translation[titleKey]} - ${siteConfig.title}`;
	} else {
		document.title = `${siteConfig.title} - ${getLocalizedSubtitle(activeLang)}`;
	}
}
