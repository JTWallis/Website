<script lang="ts">
    import { on } from "svelte/events";
    import { interactiveSettings } from "./interactiveSettings";

    let cursor: HTMLImageElement;
    
    let cursorType = $derived($interactiveSettings.cursorType);
    let scrollTop = 0;

    const count = sessionStorage.getItem("count");

    console.log("Count:", count);
    let countIncr;
    if(!count) countIncr = "0";
    else countIncr = Number.parseInt(count) + 1;

    sessionStorage.setItem("count", countIncr.toString());

    function onMouseMove(e: MouseEvent) {
        cursor.style.left = `${e.pageX}px`;
        cursor.style.top = `${e.pageY}px`;
    }

    function onResize(e?: UIEvent) {
        const zoomLevel = window.devicePixelRatio;
        const px = 32 / zoomLevel;

        cursor.style.width = `${px}px`;
        cursor.style.height = `${px}px`;
    }

    function onScroll() {
        const lastScrollTop = scrollTop;
        scrollTop = document.documentElement.scrollTop;

        const cursorTopValue = Number.parseFloat(cursor.style.top.substring(0, cursor.style.top.indexOf("px")));
        const cursorTop = cursorTopValue + (scrollTop - lastScrollTop);
        cursor.style.top = `${cursorTop}px`;
    }

    function onMouseOver(e: MouseEvent) {
        if(isDefault()) return;

        const suffix = (isClickable(e.target as HTMLElement)) 
            ? "-click"
            : "";

        cursor.src = `/cursors/${cursorType}${suffix}.webp`
    }

    function isDefault() {
        return cursorType.length === 0;
    }

    function isClickable(target: HTMLElement | null) {
        const maxDepth = 3;

        let depth = 0;
        do {
            if(target === null) return false;

            const isClickableElem =
                target instanceof HTMLAnchorElement ||
                target instanceof HTMLButtonElement;

            if(isClickableElem) return true;

            target = target.parentElement;
            depth++;
        } while(depth < maxDepth);

        return false;
    }

    $effect(() => {
        const cleanupMouseMove = on(document, "mousemove", onMouseMove);
        const cleanupResize = on(window, "resize", onResize);
        const cleanupScroll = on(document, "scroll", onScroll);
        const cleanupMouseOver = on(document, "mouseover", onMouseOver);
        onResize();
        scrollTop = document.documentElement.scrollTop;

        return () => {
            cleanupMouseMove();
            cleanupResize();
            cleanupScroll();
            cleanupMouseOver();
        }
    });

</script>

<img
    id="cursor"
    class={`absolute left-0 top-0 z-100 pointer-events-none image-pixelated ${isDefault() ? "hidden" : ""}`}
    src={isDefault() ? "" : `/cursors/${cursorType}.webp`}
    width=32
    height=32
    alt=""
    bind:this={cursor}
/>