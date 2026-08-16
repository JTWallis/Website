<script lang="ts">
    interface Props {
        path: string;
        className?: string;
        width?: string;
        height?: string;
        fill?: string;
    }
    let props: Props = $props();
</script>

<svg
    class={props.className}
    width={props.width ?? "24"}
    height={props.height ?? "24"}
    viewBox={`0 0 ${props.width ?? 24} ${props.height ?? 24}`}
>
    <path
        d={props.path}
        fill={props.fill ?? "currentColor"}
    />
</svg>