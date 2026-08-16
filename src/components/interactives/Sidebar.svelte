<script lang="ts">
    import { getLangFromPath, useTranslations } from "../../i18n/utils";
    import { interactiveSettings } from "./interactiveSettings";

    const lang = getLangFromPath(window.location.pathname);
    const t = useTranslations(lang);

    let collapsed = $state(true);

    const cursorTypes = [
        "", "classic", "familiarsword", "pika"
    ];

    function onCursorChange(newType: string) {
        if(cursorTypes.findIndex((type) => type === newType) < 0) return;

        const oldType = $interactiveSettings.cursorType;
        if(oldType === newType) return;

        interactiveSettings.update(s => ({
            ...s,
            cursorType: newType
        }));

        // Hide/show system cursor if custom cursor is active/inactive
        if(oldType.length === 0) {
            document.documentElement.classList.add("hide-cursor");
        } else if(newType.length === 0) {
            document.documentElement.classList.remove("hide-cursor");
        }


    }
</script>

<div class="h-[50vh] bg-surface0 drop-shadow-lg drop-shadow-gray-900">
    <button
        class="w-full bg-surface1 hover:bg-surface2"
        onclick={() => collapsed = !collapsed}
        aria-label="Collapse"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path 
                fill="currentColor"
                d= { collapsed
                    ? "M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z"
                    : "M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z"
                }
                
            />
        </svg>
    </button>

    <!-- Note to self: Cannot animate between "width: 0" and "width: auto" -->
    <div class={`flex flex-col items-center m-2 overflow-x-hidden transition-[max-width] duration-500 ease-in-out ${collapsed ? "max-w-0" : "max-w-xs"}`}>

        <p class="text-sm">{t("interactives.sidebar.customcursors")}</p>
        <div class="grid grid-cols-3 gap-1 p-1 border-2 border-surface1 rounded-sm">
            {#each cursorTypes as cursorType}
                <button 
                    class={`${cursorType === $interactiveSettings.cursorType ? "bg-lavender" : "bg-overlay0 hover:bg-overlay2"}`}
                    onclick={() => onCursorChange(cursorType)}
                >
                    {#if cursorType.length > 0}
                    <img
                        class="image-pixelated"
                        src={`/cursors/${cursorType}.webp`}
                        width=32
                        height=32
                        alt="Cursor"
                    />
                    {/if}
                </button>
            {/each}
        </div>

    </div>
</div>


