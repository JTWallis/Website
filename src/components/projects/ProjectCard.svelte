<script lang="ts">
    import SvgPathGit from '../../assets/svgs/tools/git.svgpath?raw';
    import SvgPathInternet from '../../assets/svgs/tools/internet.svgpath?raw';

    import Thumbnail from '../elements/Thumbnail.svelte';
    import ProjectLink from './ProjectLink.svelte';
    import type { ToolWithColor } from '../../models/toolWithColor';
    import Svg from '../elements/Svg.svelte';

    interface Props {
        title: string;
        description: string;
        gitLabel: string;
        gitUrl: string;
        tools: ToolWithColor[];
        imgSrc?: string;
        animatedSrc?: string;
        coverImg?: boolean;
        websiteUrl?: string;
    }

    let props: Props = $props();
</script>

<section class="projectCard hoverBorderMaroon hoverShadow group flex flex-col">

    {#if props.imgSrc}
        <Thumbnail 
            imgSrc={props.imgSrc}
            animatedSrc={props.animatedSrc}
            coverImg={props.coverImg}
        />

        <hr class="border group-hover:border-maroon/50!" />
    {/if}

    <div class="px-4 py-2">
        <h1>{props.title}</h1>
        <p class="text-sm text-subtext1">{props.description}</p>
        
        <div class="mt-4 flex items-center justify-between">
            {#each props.tools as tool}
                <div class="flex items-center gap-1.5">
                    {#if tool.svgPath}
                    <Svg path={tool.svgPath} className={`${tool.color}`} />
                    {:else}
                        <div class={`size-2 rounded-full ${tool.color}`}></div>
                    {/if}
                    <span>{tool.name}</span>
                </div>
            {/each}
        </div>

        <hr class="my-2"/>

        <div class="grid gap-2 {props.websiteUrl ? "grid-cols-2" : "grid-cols-1"}">
            <ProjectLink url={props.gitUrl} label={props.gitLabel} svgPath={SvgPathGit} class="bg-surface1 hover:bg-surface2" />

            {#if props.websiteUrl}
                <ProjectLink url={props.websiteUrl} label="Website" svgPath={SvgPathInternet} class="bg-lavender/50 hover:bg-blue/50" />
            {/if}
        </div>
    </div>

</section>