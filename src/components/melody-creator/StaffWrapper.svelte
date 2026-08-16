<script lang="ts">
    import type { MelodyDto } from "../../models/melody-dto";
    import { AudioManager } from "./audio-manager";
    import Staff from "./Staff.svelte";

    interface Props {
        melody: MelodyDto;
    }

    let { melody }: { melody: MelodyDto } = $props();

    const audioManager = new AudioManager("/audio/notes/");

</script>


<Staff 
    audioManager={audioManager} 
    storedNotes={melody.notes}
    title={melody.title}
    author={melody.author}
    bpm={melody.bpm}
    isModeSharps={melody.modeSharps}
    isEditable={false}
/>