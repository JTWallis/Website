<script lang="ts">
    import { useTranslations, getLangFromPath, type Lang} from '../i18n/utils';

    let lang: Lang = $state("de");
    let t = $derived(useTranslations(lang));

    let pathname = $state("/");
    let links: any[] = $state([]);
    let selectedIndex = $derived(links.findIndex((link) => link.url === pathname));

    function updatePath() {
        pathname = window.location.pathname;
        lang = getLangFromPath(pathname);

        links = [
            { name: t("footer.lang.de"), url: (lang === "de" ? pathname : (pathname.substring("/en".length)))},
            { name: t("footer.lang.en"), url: (lang === "en" ? pathname : ("/en" + pathname))}
        ];
    }

    function scrollAndUpdatePath() {
        updatePath();

        // Must use timeout for scroll to work
        setTimeout(() => { 
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }, 10);
    }

    updatePath();
    document.addEventListener("astro:page-load", updatePath);
</script>

<footer class="bg-crust gap-2 w-screen mt-auto border-t-2 border-surface0">
    <div class="relative grid grid-cols-2 gap-2 min-w-[25%] w-fit m-auto">
        {#if selectedIndex !== -1}
            <div
                class="absolute inset-0 rounded-xs bg-maroon opacity-50 pointer-events-none w-[calc(50%)] duration-500"
                style="transform: translateX(calc({selectedIndex * 100}%));"
            ></div>
        {/if}
        {#each links as link, index}
            <a
                class="relative text-center px-2 {selectedIndex === index ? "shadowFakeBold" : "hoverBgSurface2"}"
                onclick={scrollAndUpdatePath}
                href={link.url}>
                {link.name}
            </a>
        {/each}
    </div>
</footer>