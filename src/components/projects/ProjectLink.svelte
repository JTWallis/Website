<script lang="ts">
    import Svg from "../elements/Svg.svelte";

    interface Props {
        url: string;
        label: string;
        svgPath: string;
        class: string;
    }
    let props: Props = $props();
</script>

<a
    href={props.url}
    class={`pr-2 flex items-center justify-center border-2 border-surface2 rounded-sm text-lg ${props.class}`}
>

    <div class="h-8 w-8 flex items-center">
        <Svg path={props.svgPath} />
    </div>
    {props.label}
</a>
