<script lang="ts">
    interface Props {
        value: number;
        id?: string;
        className?: string;
        min?: number;
        max?: number;
    }

    let {
        value = $bindable(),
        id,
        className,
        min,
        max
    }: Props = $props();

    let prevVal = value;

    function oninput(elem: HTMLInputElement) {
        let val = elem.valueAsNumber;

        if(Number.isNaN(val)) {
            value = prevVal;
            return;
        }

        if(min && val < min) {
            val = min;
        } else if(max && val > max) {
            val = max;
        }

        prevVal = val;
        value = val;
    }
</script>

<!--
    @component
    An element &lt;input type="number"&gt; that enforces integer-only input,
    by ignoring inputs that are a non-numeric char, or numeric inputs that would cross the minmax-bound.
-->
<input
    type="number"
    bind:value
    {id}
    class={className}
    {min}
    {max}
    oninput={e => oninput(e.currentTarget)}
/>