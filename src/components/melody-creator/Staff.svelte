<script lang="ts">
    import SvgPathFlat from "../../assets/svgs/music/flat.svgpath?raw";
    import SvgPathSharp from "../../assets/svgs/music/sharp.svgpath?raw";
    import SvgPathNote from "../../assets/svgs/music/note.svgpath?raw";
    import SvgPathPlay from "../../assets/svgs/music/play.svgpath?raw";
    import SvgPathStop from "../../assets/svgs/music/stop.svgpath?raw";
    import Svg from "../elements/Svg.svelte";
    import IntegerInput from '../elements/IntegerInput.svelte';
    import type { Note } from './note';
    import type { AudioManager } from './audio-manager';
    import { on } from 'svelte/events';
    import { getLangFromPath, useTranslations } from "../../i18n/utils";
    import { getFlatFromSharpNote } from "./melody-helper";
    
    // Enum
    const PlaybackState = {
        STOPPED: 0,
        PLAYING: 1,
        PAUSED: 2
    } as const;
    type PlaybackState = (typeof PlaybackState)[keyof typeof PlaybackState];

    const keyPlaybackPause = "1";
    const keyPlaybackStop = "2";
    const keyPlaybackLeft = "ArrowLeft";
    const keyPlaybackRight = "ArrowRight";

    const baseNotes = ["C", "D", "E", "F", "G", "A", "B"];

    const maxOctave = 6;
    const notesInOctave = 7;
    const minBpm = 1;
    const maxBpm = 720;
    const beatsInStaff = 16;
    const beatPercentage = 100.0 / beatsInStaff;

    const playbackIncrMs = 50;
    const playbackIncr = 0.0052;

    const lang = getLangFromPath(window.location.pathname);
    const t = useTranslations(lang);

    interface Props {
        audioManager: AudioManager;
        storedNotes: Note[];
        title: string;
        author: string;
        bpm: number;
        isModeSharps: boolean;
        isEditable: boolean;
    }

    let { 
        audioManager,
        storedNotes = $bindable(),
        title = $bindable(),
        author = $bindable(),
        bpm = $bindable(),
        isModeSharps = $bindable(),
        isEditable
     }: Props = $props();

    if(!bpm) bpm = 120;

    let staffCount = $state(1);
    let playbackStaffPos = $state(0);
    let playbackBarLeftPercent: number = $state(0);
    let playbackState: number = $state(PlaybackState.STOPPED);

    let currentBeat = 1;
    let playbackInterval: NodeJS.Timeout | null = null;
    let playbackNotes: Note[] = [];

    // Startup
    if(storedNotes.length > 0) {
        const highestBeat = Math.max.apply(Math, storedNotes.map(note => note.beat));
        staffCount = Math.ceil(highestBeat / beatsInStaff);
    }

    export function getCurrentBeat() {
        return currentBeat;
    }

    function advanceBeat(newStaffOnLastBeat: boolean) {
        let relativeBeat = currentBeat % beatsInStaff;
        if(!newStaffOnLastBeat && relativeBeat === 0) {
            relativeBeat = beatsInStaff;
        }
        
        setPlaybackBar(relativeBeat);
        currentBeat++;

        if(newStaffOnLastBeat) {
            checkIncrementStaffCount();
        }
    }

    export function onAddNotes(haltPlaybackAdvance: boolean) {
        if(haltPlaybackAdvance) return;
        advanceBeat(false);
    }

    export function onAddRest() {
        // Set playback bar to next beat of the beat this rest was placed on.
        // Unlike addNote, last beat in a staff does add a new staff here.
        advanceBeat(true);
    }

    export function discardAllNotes() {
        stopPlayback();
        storedNotes.length = 0;
        staffCount = 1;
    }

    function copyNotes(startBeat?: number) {
        storedNotes.sort((a, b) => a.beat - b.beat);
        const startIndex = (startBeat && startBeat > 1) ? storedNotes.findIndex(note => note.beat >= startBeat) - 1 : 0;

        if(startIndex < 0) return [];

        console.log("CopyNotes", startBeat);
        const copy = storedNotes.slice(startIndex);

        // Remove leading notes when selecting rest (marker with no note)
        if(startBeat) {
            while(copy.length > 0 && copy[0].beat < startBeat) copy.shift();
        }
        return copy;
    }

    function startPlayback() {
        if(playbackState === PlaybackState.PLAYING) return;

        if(playbackState === PlaybackState.STOPPED) {
            playbackNotes = copyNotes(currentBeat);
        }

        playbackState = PlaybackState.PLAYING;

        playbackInterval = setInterval(() => {
            playbackBarLeftPercent += bpm * playbackIncr;
            const playbackStaffPercent = playbackBarLeftPercent + 100.0 * playbackStaffPos;
            const beat = (playbackStaffPercent + beatPercentage) / beatPercentage;

            // Check if playback bar passed a beat with notes to play
            while(playbackNotes.length > 0) {
                const frontNote = playbackNotes[0];
                if(beat >= frontNote.beat) {
                    playbackNotes.shift();
                    const note = (frontNote.note.charAt(1) === "#")
                        ? getFlatFromSharpNote(frontNote.note)
                        : frontNote.note;

                    if(!note) {
                        console.warn("Could not find sound for note", frontNote.note);
                        continue;
                    }

                    console.log("Playing Note", note);
                    audioManager.playSound(note);
                } else {
                    break;
                }
            }

            if(playbackBarLeftPercent > 100.0) {
                playbackStaffPos++;
                playbackBarLeftPercent = 0;
                if(playbackStaffPos >= staffCount) {
                    stopPlayback();
                    return;
                }
            }
        }, playbackIncrMs);
    }

    function pausePlayback() {
        if(playbackInterval !== null) {
            clearTimeout(playbackInterval);
            playbackState = PlaybackState.PAUSED;
        }
    }

    function stopPlayback() {
        if(playbackInterval !== null) {
            clearTimeout(playbackInterval);
            playbackInterval = null;
        }
        playbackStaffPos = 0;
        playbackBarLeftPercent = 0;
        currentBeat = 1;
        playbackState = PlaybackState.STOPPED;
    }

    function setPlaybackBar(columnIndex: number) {
        if(columnIndex < 0) playbackBarLeftPercent = 0;
        else if(columnIndex > beatsInStaff) playbackBarLeftPercent = 100;
        else playbackBarLeftPercent = columnIndex * 100.0 / beatsInStaff;
    }

    function onPlaybackMarkerClick(columnIdx: number, staffIdx: number) {
        const relativeBeat = columnIdx + 1;
        playbackStaffPos = staffIdx;
        currentBeat = relativeBeat + staffIdx * beatsInStaff;
        setPlaybackBar(columnIdx)
    }

    export function checkIncrementStaffCount() {
        if(currentBeat > staffCount * beatsInStaff) {
            staffCount++;
            playbackStaffPos = staffCount-1;
        }
    }

    function removeNote(note: Note) {
        const index = storedNotes.findIndex(n => n.beat === note.beat && n.note === note.note);
        if(index < 0) return;
        storedNotes.splice(index, 1);
    }

    function rowFromNote(note: Note): number {
        const noteStr = note.note;
        const key = noteStr[0];
        const octave = Number.parseInt(noteStr[noteStr.length-1]);
        const row = (baseNotes.length - baseNotes.indexOf(key)) + ((maxOctave - octave) * notesInOctave);
        return row;
    }

    function onKeydownLeft() {
        if(currentBeat <= 1) return;
        currentBeat--;
        setPlaybackBar((currentBeat-1) % beatsInStaff);
        if(currentBeat <= playbackStaffPos * beatsInStaff) {
            playbackStaffPos--;
        }
    }

    function onKeydownRight() {
        if(currentBeat >= beatsInStaff * staffCount) return;
        setPlaybackBar(currentBeat % beatsInStaff);
        currentBeat++;
        if(currentBeat > (playbackStaffPos+1) * beatsInStaff) {
            playbackStaffPos++;
        }
    }

    function togglePause() {
        playbackState === PlaybackState.PLAYING ? pausePlayback() : startPlayback()
    }

    $effect(() => {
        const cleanupKeydown = on(window, "keydown", (e) => {
            if(e.target instanceof HTMLInputElement) return;
            if(e.key === keyPlaybackLeft) onKeydownLeft();
            else if(e.key === keyPlaybackRight) onKeydownRight();
            else if(e.key === keyPlaybackPause) togglePause();
            else if(e.key === keyPlaybackStop) stopPlayback();
        });
        
        return () => {
            stopPlayback();
            cleanupKeydown();
        }
    })
</script>

<div class="flex flex-col w-[80%] max-w-4xl mt-8 gap-2">

    <div class="flex justify-between">
        {#if isEditable}
            <div class="flex flex-col">
                <label for="staffTitle">{t("melody.title")}:</label>
                <input id="staffTitle" type="text" class="bg-surface0 border border-surface2" bind:value={title}>
            </div>
            <div class="flex flex-col">
                <label for="staffTitle">{t("melody.author")}:</label>
                <input id="staffTitle" type="text" class="bg-surface0 border border-surface2" bind:value={author}>
            </div>
        {:else}
            <span class="flex-[70%] overflow-hidden text-ellipsis whitespace-nowrap">{title}</span>
            <span class="flex-[30%] overflow-hidden text-ellipsis whitespace-nowrap text-end">{author}</span>
        {/if}
    </div>


    <hr class="border-surface2">

    <div class="w-full flex justify-between">
        <div class="flex gap-2">
            <button class="svgButton" onclick={togglePause}>
                <Svg path={playbackState === PlaybackState.PLAYING ? SvgPathStop : SvgPathPlay} className="svg" />
            </button>

            <button class="svgButton" onclick={stopPlayback}>
                <Svg path={SvgPathStop} className="svg" />
            </button>
        </div>

        <div>
            <label for=inputBpm>BPM:</label>
            <IntegerInput id="inputBpm" min={minBpm} max={maxBpm} bind:value={bpm} className="bg-surface0 border-2 border-surface2"/>
        </div>
    </div>

    {#each { length: staffCount }, staffIdx }
        <div class="relative w-full">
            {#if staffIdx === playbackStaffPos}
                <div
                    class="absolute w-px h-full bg-red"
                    style={`left: ${playbackBarLeftPercent}%`}
                >
                </div>
            {/if}

            <div id={`staff-${staffIdx+1}`} class="w-full px-1 aspect-4/1 grid grid-rows-31 grid-cols-16 bg-white">
                <!-- Bar dividers -->
                <div class="w-px col-start-1 col-span-1 row-start-5 row-end-25  bg-gray-700"></div>
                <div class="w-px col-start-5 col-span-1 row-start-5 row-end-25  bg-gray-700"></div>
                <div class="w-px col-start-9 col-span-1 row-start-5 row-end-25  bg-gray-700"></div>
                <div class="w-px col-start-13 col-span-1 row-start-5 row-end-25  bg-gray-700"></div>
                <div class={`${staffIdx+1 === staffCount ? "w-1" : "w-px"} col-start-25 col-span-1 row-start-5 row-end-25  bg-gray-700`}></div>

                <!-- Treble lines -->
                <div class="h-px row-start-5 row-span-1 col-start-1 col-span-full bg-gray-700"></div>
                <div class="h-px row-start-7 row-span-1 col-start-1 col-span-full bg-gray-700"></div>
                <div class="h-px row-start-9 row-span-1 col-start-1 col-span-full bg-gray-700"></div>
                <div class="h-px row-start-11 row-span-1 col-start-1 col-span-full bg-gray-700"></div>
                <div class="h-px row-start-13 row-span-1 col-start-1 col-span-full bg-gray-700"></div>

                <!-- Bass lines -->
                <div class="h-px row-start-17 row-span-1 col-start-1 col-span-full bg-gray-700"></div>
                <div class="h-px row-start-19 row-span-1 col-start-1 col-span-full bg-gray-700"></div>
                <div class="h-px row-start-21 row-span-1 col-start-1 col-span-full bg-gray-700"></div>
                <div class="h-px row-start-23 row-span-1 col-start-1 col-span-full bg-gray-700"></div>
                <div class="h-px row-start-25 row-span-1 col-start-1 col-span-full bg-gray-700"></div>

                {#each { length: beatsInStaff }, i }
                    <button 
                        class={`flex self-center justify-center h-[200%] w-[60%] row-start-31 col-start-${i+1}`}
                        onclick={(e) => onPlaybackMarkerClick(i, staffIdx)}
                        aria-label="playback marker"
                    >
                        <div class="h-[80%] aspect-square bg-gray-700"></div>
                    </button>
                {/each}

                {#each storedNotes as note}
                    {#if note.beat > (staffIdx) * beatsInStaff && note.beat <= (staffIdx+1) * beatsInStaff}
                        <div
                            class="flex h-[250%] w-full justify-center"
                            style={`
                                grid-column-start: ${((note.beat-1) % beatsInStaff)+1};
                                grid-row-start: ${rowFromNote(note)}
                            `}

                        >
                            {#if note.note.charAt(1) === "b" || note.note.charAt(1) === "#"}
                                <Svg
                                    fill="black"
                                    className="h-full w-[25%] aspect-square"
                                    path={note.note.charAt(1) === "b" ? SvgPathFlat : SvgPathSharp}
                                />
                            {/if}

                            {#if isEditable}
                                <button onmousedown={() => isEditable ? removeNote(note) : {}} aria-label="note" class="flex h-full w-[50%]">
                                    <Svg path={SvgPathNote} fill="black" className="h-full aspect-square" />
                                </button>
                            {:else}
                                <div class="flex h-full w-[50%]">
                                    <Svg path={SvgPathNote} fill="black" className="h-full aspect-square" />
                                </div>
                            {/if}
                        </div>
                    {/if}
                {/each}
            </div>

        </div>
    {/each}
</div>