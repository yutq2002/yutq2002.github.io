import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { LinkPreset, type NavBarLink } from "@/types/config";

export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
	[LinkPreset.Home]: {
		name: i18n(I18nKey.home),
		url: "/",
		i18nKey: I18nKey.home,
	},
	[LinkPreset.About]: {
		name: i18n(I18nKey.about),
		url: "/about/",
		i18nKey: I18nKey.about,
	},
	[LinkPreset.Archive]: {
		name: i18n(I18nKey.archive),
		url: "/archive/",
		i18nKey: I18nKey.archive,
	},
	[LinkPreset.CV]: {
		name: i18n(I18nKey.cv),
		url: "/cv/",
		i18nKey: I18nKey.cv,
	},
	[LinkPreset.Activities]: {
		name: i18n(I18nKey.activities),
		url: "/activities/",
		i18nKey: I18nKey.activities,
	},
	[LinkPreset.Gallery]: {
		name: i18n(I18nKey.gallery),
		url: "/gallery/",
		i18nKey: I18nKey.gallery,
	},
	[LinkPreset.Friends]: {
		name: i18n(I18nKey.friends),
		url: "/friends/",
		i18nKey: I18nKey.friends,
	},
};
