<script lang="ts">
    import { useTranslations, getLangFromPath, type Lang} from '../i18n/utils';

    let { lang: langTest } = $props()
    $inspect(langTest)

    let lang: Lang = $state("de");
    let t = $derived(useTranslations(lang));

    interface Link {
        name: string;
        url: string;
    }

    interface Endpoint {
        pathname: string;
        headerIndex: number;
    }

    const endpoints: Endpoint[] = [
        { pathname: "/",                headerIndex: 0 },
        { pathname: "/projects",        headerIndex: 1 },
        { pathname: "/interactives",    headerIndex: 2 },
        { pathname: "/melodies",        headerIndex: 2 },
        { pathname: "/melody-creator",  headerIndex: 2 },
    ];

    let links: Link[] = $state([]);
    let pathname = $state("/");
    let selectedIndex = $derived(findEndpointIndex());

    function findEndpointIndex() {
        const endpoint = endpoints.find(e => pathname.endsWith(e.pathname));
        return endpoint?.headerIndex ?? -1;
    }

    function updatePath() {
        pathname = window.location.pathname;
        lang = getLangFromPath(pathname);
        const langEndpoint = `${(lang === "de" ? "" : "/" + lang)}`;

        const navs = [
            t("nav.home"), t("nav.projects"), t("nav.interactives")
        ];

        links = navs.map((nav, idx) => <Link>{
            name: nav,
            url: `${langEndpoint}${endpoints[idx].pathname}`
        });
    };

    updatePath();
    document.addEventListener("astro:page-load", updatePath);
</script>

<section class="fixed z-10 w-screen bg-crust border-b-2 border-surface0 shadow-xl shadow-surface1">
    <div class="relative grid grid-cols-3 min-w-[25%] w-fit bg-surface0">
        {#if selectedIndex !== -1}
            <div
                class="absolute inset-0 rounded-xs bg-maroon opacity-50 pointer-events-none w-[calc(100%/3)] duration-500"
                style="transform: translateX(calc({selectedIndex * 100}%));"
            ></div>
        {/if}
        {#each links as link, index}
            <a
                class="relative text-center px-2 {selectedIndex === index ? "shadowFakeBold" : "hoverBgSurface2"}"
                onclick={updatePath}
                href={link.url}>
                {link.name}
            </a>
        {/each}
    </div>
</section>