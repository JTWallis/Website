<script lang="ts">
    const text = "Catppuccin";

    // Need to add text- prefix, otherwise (tailwind?) won't lazy-load style if not existing at startup.
    const colors = [ "text-red", "text-maroon", "text-peach", "text-yellow", "text-green", "text-teal", "text-sky", "text-sapphire", "text-blue", "text-mauve", "text-pink" ];

    let offset = $state(0);

    $effect(() => {
        const cycleOffset = setInterval(() => {
            offset = (offset + 1) % colors.length;
        }, 180);

        return () => {
            clearInterval(cycleOffset);
        };
    });
</script>

<span class="font-bold">
    {#each text as char, idx}
        <span class={`${colors[(idx + offset) % colors.length]}`}>{char}</span>
    {/each}
</span>