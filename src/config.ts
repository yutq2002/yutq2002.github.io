import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const localizedSiteConfig = {
	zh_CN: {
		subtitle: "射线，啤酒和AI",
		bio: "上海科技大学 · 射线，啤酒和AI · 上海精酿协会会员",
	},
	en: {
		subtitle: "Rays, Beer & AI",
		bio: "ShanghaiTech · Rays, Beer & AI · Shanghai Craft Beer Association Member",
	},
} as const;

export const siteConfig: SiteConfig = {
	title: "于天琪",
	subtitle: localizedSiteConfig.zh_CN.subtitle,
	lang: "zh_CN",
	languages: ["zh_CN", "en"],
	themeColor: {
		hue: 220,
		fixed: false,
	},
	banner: {
		enable: true,
		src: "assets/images/63692738539ae52f5cddddf522cc0860.JPG",
		position: "center",
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	toc: {
		enable: true,
		depth: 2,
	},
	favicon: [],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.About,
		LinkPreset.CV,
		LinkPreset.Activities,
		LinkPreset.Gallery,
		LinkPreset.Friends,
		{
			name: "GitHub",
			url: "https://github.com/yutq2002",
			external: true,
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "https://avatars.githubusercontent.com/u/191070044?v=4",
	name: "于天琪",
	bio: localizedSiteConfig.zh_CN.bio,
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/yutq2002",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};
