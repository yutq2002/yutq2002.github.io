<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { getTranslation } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { siteConfig } from "@/config";
import {
	getBannerSettings,
	isDefaultBannerSettings,
	resetBannerSettings,
	setBannerSettings,
} from "@utils/banner-utils";
import { getStoredLang } from "@utils/language-utils.ts";
import { getDefaultHue, getHue, setHue } from "@utils/setting-utils";

let hue = getHue();
const defaultHue = getDefaultHue();
const t = getTranslation(getStoredLang());
const showTheme = !siteConfig.themeColor.fixed;
const showBanner = siteConfig.banner.enable;

const initialBanner = getBannerSettings();
let posX = initialBanner.posX;
let posY = initialBanner.posY;
let scale = initialBanner.scale;
let panX = initialBanner.panX;
let panY = initialBanner.panY;

function resetHue() {
	hue = getDefaultHue();
}

function resetBanner() {
	const defaults = resetBannerSettings();
	posX = defaults.posX;
	posY = defaults.posY;
	scale = defaults.scale;
	panX = defaults.panX;
	panY = defaults.panY;
}

$: if (hue || hue === 0) {
	setHue(hue);
}

$: if (showBanner) {
	setBannerSettings({ posX, posY, scale, panX, panY });
}

$: bannerIsDefault = isDefaultBannerSettings({ posX, posY, scale, panX, panY });
</script>

<div id="display-setting" class="float-panel float-panel-closed absolute transition-all w-80 right-4 px-4 py-4 max-h-[70vh] overflow-y-auto hide-scrollbar">
    {#if showTheme}
        <div class="flex flex-row gap-2 mb-3 items-center justify-between">
            <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
                before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
                before:absolute before:-left-3 before:top-[0.33rem]"
            >
                <span data-i18n-key={I18nKey.themeColor}>{t[I18nKey.themeColor]}</span>
                <button aria-label="Reset to Default" class="btn-regular w-7 h-7 rounded-md active:scale-90 will-change-transform"
                        class:opacity-0={hue === defaultHue} class:pointer-events-none={hue === defaultHue} on:click={resetHue}>
                    <div class="text-[var(--btn-content)]">
                        <Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
                    </div>
                </button>
            </div>
            <div class="flex gap-1">
                <div id="hueValue" class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
                font-bold text-sm items-center text-[var(--btn-content)]">
                    {hue}
                </div>
            </div>
        </div>
        <div class="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none mb-4">
            <input aria-label={t[I18nKey.themeColor]} type="range" min="0" max="360" bind:value={hue}
                   class="slider" id="colorSlider" step="5" style="width: 100%">
        </div>
    {/if}

    {#if showBanner}
        <div class="flex flex-row gap-2 mb-3 items-center justify-between">
            <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
                before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
                before:absolute before:-left-3 before:top-[0.33rem]"
            >
                <span data-i18n-key={I18nKey.bannerSettings}>{t[I18nKey.bannerSettings]}</span>
                <button aria-label={t[I18nKey.reset]} class="btn-regular w-7 h-7 rounded-md active:scale-90 will-change-transform"
                        class:opacity-0={bannerIsDefault} class:pointer-events-none={bannerIsDefault}
                        on:click={resetBanner}>
                    <div class="text-[var(--btn-content)]">
                        <Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
                    </div>
                </button>
            </div>
        </div>

        <div class="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
            <label class="block">
                <div class="flex justify-between mb-1">
                    <span data-i18n-key={I18nKey.bannerPosX}>{t[I18nKey.bannerPosX]}</span>
                    <span>{posX}%</span>
                </div>
                <input type="range" min="0" max="100" bind:value={posX} class="slider w-full">
            </label>
            <label class="block">
                <div class="flex justify-between mb-1">
                    <span data-i18n-key={I18nKey.bannerPosY}>{t[I18nKey.bannerPosY]}</span>
                    <span>{posY}%</span>
                </div>
                <input type="range" min="0" max="100" bind:value={posY} class="slider w-full">
            </label>
            <label class="block">
                <div class="flex justify-between mb-1">
                    <span data-i18n-key={I18nKey.bannerScale}>{t[I18nKey.bannerScale]}</span>
                    <span>{scale}%</span>
                </div>
                <input type="range" min="100" max="300" bind:value={scale} class="slider w-full">
            </label>
            <label class="block">
                <div class="flex justify-between mb-1">
                    <span data-i18n-key={I18nKey.bannerPanX}>{t[I18nKey.bannerPanX]}</span>
                    <span>{panX}%</span>
                </div>
                <input type="range" min="-50" max="50" bind:value={panX} class="slider w-full">
            </label>
            <label class="block">
                <div class="flex justify-between mb-1">
                    <span data-i18n-key={I18nKey.bannerPanY}>{t[I18nKey.bannerPanY]}</span>
                    <span>{panY}%</span>
                </div>
                <input type="range" min="-50" max="50" bind:value={panY} class="slider w-full">
            </label>
        </div>
    {/if}
</div>

<style lang="stylus">
    #display-setting
      input[type="range"].slider
        -webkit-appearance none
        height 1.25rem
        background-image var(--color-selection-bar)
        transition background-image 0.15s ease-in-out
        border-radius 0.25rem

        &::-webkit-slider-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

        &::-moz-range-thumb
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          border-width 0
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)
</style>
