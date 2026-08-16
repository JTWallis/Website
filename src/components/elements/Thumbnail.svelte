<script lang="ts">

    interface Props {
        imgSrc: string;
        animatedSrc?: string;
        coverImg?: boolean;
    }

    let props: Props = $props();

// hoverScale hover:scale-110 hover:object-fill hover:aspect-video transition-transform delay-100 ease-in-out
</script>

<div class="grid grid-cols-1 grid-rows-1">
    <img 
        src={props.imgSrc}
        width=672 height=630
        loading="lazy"
        alt="thumbnail"
        class={`
            col-start-1 row-start-1 
            bg-mantle overflow-hidden rounded-t-lg max-h-95 h-95 ${props.coverImg ? "object-cover" : "object-contain"}
            ${!props.animatedSrc ? "" :
                `first:opacity-100 thumbnailStaticHoverSticky
                transition-opacity duration-500` 
            }
        `}
    >

    {#if props.animatedSrc}
        <img 
            src={props.animatedSrc}
            width=672 height=630
            loading="lazy"
            alt="thumbnail"
            class="col-start-1 row-start-1
            overflow-hidden rounded-t-lg max-h-95 h-95 bg-mantle object-fill aspect-video border-2 border-maroon/50
            last:opacity-0 thumbnailAnimatedHoverSticky
            [transition:opacity_500ms_0ms,scale_400ms_600ms]"
        >
    {/if}
</div>