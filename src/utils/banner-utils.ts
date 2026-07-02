export interface BannerSettings {
	posX: number;
	posY: number;
	scale: number;
	panX: number;
	panY: number;
}

export const DEFAULT_BANNER_SETTINGS: BannerSettings = {
	posX: 50,
	posY: 50,
	scale: 100,
	panX: 0,
	panY: 0,
};

const STORAGE_KEY = "bannerSettings";

export function getBannerSettings(): BannerSettings {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return { ...DEFAULT_BANNER_SETTINGS, ...JSON.parse(stored) };
		}
	} catch {
		// ignore invalid stored value
	}
	return { ...DEFAULT_BANNER_SETTINGS };
}

export function setBannerSettings(settings: BannerSettings): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
	applyBannerSettings(settings);
}

export function applyBannerSettings(settings?: BannerSettings): void {
	const s = settings ?? getBannerSettings();
	const img = document.querySelector("#banner img") as HTMLImageElement | null;
	if (!img) return;

	img.style.objectPosition = `${s.posX}% ${s.posY}%`;
	img.style.transform = `scale(${s.scale / 100}) translate(${s.panX}%, ${s.panY}%)`;
	img.style.transformOrigin = `${s.posX}% ${s.posY}%`;
}

export function resetBannerSettings(): BannerSettings {
	localStorage.removeItem(STORAGE_KEY);
	applyBannerSettings(DEFAULT_BANNER_SETTINGS);
	return { ...DEFAULT_BANNER_SETTINGS };
}

export function isDefaultBannerSettings(settings: BannerSettings): boolean {
	return (
		settings.posX === DEFAULT_BANNER_SETTINGS.posX &&
		settings.posY === DEFAULT_BANNER_SETTINGS.posY &&
		settings.scale === DEFAULT_BANNER_SETTINGS.scale &&
		settings.panX === DEFAULT_BANNER_SETTINGS.panX &&
		settings.panY === DEFAULT_BANNER_SETTINGS.panY
	);
}
