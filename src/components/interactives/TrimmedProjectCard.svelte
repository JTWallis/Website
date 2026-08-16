<script lang="ts">
    import Thumbnail from '../elements/Thumbnail.svelte';

    interface Props {
        title: string;
        description: string;
        websiteUrl: string;
        thumbnailSrc: string;
        animatedSrc: string;
    }

    let props: Props = $props();
</script>


<section class="projectCard hoverShadow flex flex-col">
    <Thumbnail 
        imgSrc={props.thumbnailSrc}
        animatedSrc={props.animatedSrc}
        coverImg={true}
    />
    <hr class="border" />

    <div class="px-4 py-2">
        <a href={props.websiteUrl}>
            <h1 class="hyperlink">{props.title}</h1>
        </a>
        <p class="text-sm text-subtext1">{props.description}</p>
    </div>

</section>