<script lang="ts">
import { siteConfig } from "@/config";
import {
	getStoredLang,
	setStoredLang,
	type SiteLanguage,
} from "@utils/language-utils.ts";

const labels: Record<SiteLanguage, string> = {
	zh_CN: "中文",
	en: "EN",
};

let mode: SiteLanguage = $state(siteConfig.lang as SiteLanguage);

if (typeof window !== "undefined") {
	mode = getStoredLang();
}

function switchLanguage(lang: SiteLanguage) {
	if (lang === mode) {
		return;
	}
	setStoredLang(lang);
	window.location.reload();
}

function toggleLanguage() {
	const langs = siteConfig.languages as SiteLanguage[];
	const index = langs.indexOf(mode);
	switchLanguage(langs[(index + 1) % langs.length]);
}

function handleClick() {
	if (window.matchMedia("(min-width: 1024px)").matches) {
		showPanel();
	} else {
		toggleLanguage();
	}
}

function showPanel() {
	document.querySelector("#language-panel")?.classList.remove("float-panel-closed");
}

function hidePanel() {
	document.querySelector("#language-panel")?.classList.add("float-panel-closed");
}
</script>

<div class="relative z-50" role="menu" tabindex="-1" onmouseleave={hidePanel}>
    <button
        aria-label="Language"
        role="menuitem"
        class="relative btn-plain scale-animation rounded-lg h-11 min-w-11 px-2 active:scale-90"
        id="language-switch"
        onclick={handleClick}
        onmouseenter={showPanel}
    >
        <span class="text-sm font-bold">{labels[mode]}</span>
    </button>

    <div
        id="language-panel"
        class="hidden lg:block absolute transition float-panel-closed top-11 -right-2 pt-5"
    >
        <div class="card-base float-panel p-2 min-w-[7rem]">
            {#each siteConfig.languages as lang}
                <button
                    class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5 last:mb-0"
                    class:current-theme-btn={mode === lang}
                    onclick={() => switchLanguage(lang as SiteLanguage)}
                >
                    {labels[lang as SiteLanguage]}
                </button>
            {/each}
        </div>
    </div>
</div>
