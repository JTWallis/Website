<script lang="ts">
    import SvgPathFlat from "../../assets/svgs/music/flat.svgpath?raw";
    import SvgPathSharp from "../../assets/svgs/music/sharp.svgpath?raw";
    import SvgPathSilent from "../../assets/svgs/music/silent.svgpath?raw";
    import SvgPathAngleUp from "../../assets/svgs/icons/angleup.svgpath?raw";
    import SvgPathAngleDown from "../../assets/svgs/icons/angledown.svgpath?raw";
    import SvgPathArrowUp from "../../assets/svgs/icons/arrowup.svgpath?raw";
    import SvgPathTrash from "../../assets/svgs/icons/trash.svgpath?raw";
    import Svg from "../elements/Svg.svelte";
    import Staff from "./Staff.svelte";
    import { URL_BACKEND } from "../../constants/urls";
    import { on } from "svelte/events";
    import { AudioManager } from "./audio-manager";
    import type { MelodyDto } from "../../models/melody-dto";
    import { getLangFromPath, useTranslations } from "../../i18n/utils";
    import type { Note } from "./note";
    import { getSharpFromFlatNote } from "./melody-helper";

    const urlUpload = URL_BACKEND + "/melody/create";

    // TODO:
    // - Disallow same flat+sharp note

    const audioManager = new AudioManager("/audio/notes/");
    let staff: Staff;

    const keyToggleTreble = "Q";
    const keyAddRest = "W";
    const keyToggleAccidentals = "3";
    const keysToNotes: Map<string, string> = new Map([
        ["Y", "C6"],
        ["X", "D6"],
        ["C", "E6"],
        ["V", "F6"],
        ["B", "G6"],
        ["N", "A6"],
        ["M", "B6"],

        ["S", "Db6"],
        ["D", "Eb6"],
        ["G", "Gb6"],
        ["H", "Ab6"],
        ["J", "Bb6"],

        ["R", "C5"],
        ["T", "D5"],
        ["Z", "E5"],
        ["U", "F5"],
        ["I", "G5"],
        ["O", "A5"],
        ["P", "B5"],

        ["5", "Db5"],
        ["6", "Eb5"],
        ["8", "Gb5"],
        ["9", "Ab5"],
        ["0", "Bb5"],
    ]);

    const whiteKeys = [
        "C5", "D5", "E5", "F5", "G5", "A5", "B5",
        "C6", "D6", "E6", "F6", "G6", "A6", "B6"
    ];

    // Probably easiest way to get the black keys aligned on the grid with an offset.
    // Could probably do some col-start-[index] math without the need of these null values,
    //  but Tailwind posed problems when dynamically building such styles.
    const blackKeys = [
        null, null, "Db5", null, "Eb5", null, null, null, null, "Gb5", null, "Ab5", null, "Bb5", null, null,
        null, null, "Db6", null, "Eb6", null, null, null, null, "Gb6", null, "Ab6", null, "Bb6"
    ];

    const lang = getLangFromPath(window.location.pathname);
    const t = useTranslations(lang);

    let isTreble = $state(true);
    let isModeSharps = $state(false);

    let storedNotes: Note[] = $state([]);
    let bpm = $state(120);
    let title = $state("");
    let author = $state("");
    let errorMessage = $state("");
    let uploadButton: HTMLButtonElement;

    let haltPlaybackAdvance = false;

    let collectedNotes: string[] = [];
    const collectCooldownMs = 200;
    let collectTimeout: NodeJS.Timeout | null = null;

    async function onNote(note: string) {
        if(!whiteKeys.includes(note) && !blackKeys.includes(note)) return;

        if(!isTreble) {
            let octaveValue = Number.parseInt(note.charAt(note.length-1));
            octaveValue -= 2;
            note = note.substring(0, note.length-1) + octaveValue;
        }

        collectNote(note);
        audioManager.playSound(note);
    }

    function collectNote(note: string) {
        if(collectedNotes.includes(note)) return;
        collectedNotes.push(note);

        cleanupTimeout();

        collectTimeout = setTimeout(() => {
            addNotes(haltPlaybackAdvance, ...collectedNotes);
            collectedNotes.length = 0;
            collectTimeout = null;
        }, collectCooldownMs);

    }

    function addNotes(haltPlaybackAdvance: boolean, ...notes: string[]) {
        staff.checkIncrementStaffCount();

        const currentBeat = staff.getCurrentBeat();

        for(let note of notes) {
            if(!note || note.length === 0) continue;

            if(isModeSharps && note.charAt(1) === "b") {
                const converted = getSharpFromFlatNote(note);
                note = converted ?? note;
            }

            if(!storedNotes.find(n => n.beat === currentBeat && n.note === note)) {
                storedNotes.push({
                    beat: currentBeat,
                    note: note
                });
            }
        }

        staff.onAddNotes(haltPlaybackAdvance);
    }

    function onKeydown(e: KeyboardEvent) {
        if(e.repeat) return;
        if(e.target instanceof HTMLInputElement) return;

        let key = e.key.toUpperCase();

        if(key === keyToggleTreble) {
            toggleTreble();
            return;
        } else if(key === keyToggleAccidentals) {
            toggleMode();
            return;
        } else if(key === keyAddRest) {
            addRest();
            return;
        }

        setHaltPlaybackAdvance(e);

        let note = keysToNotes.get(key);
        if(!note) return;

        onNote(note);

        const elem = document.getElementById(note) as HTMLDivElement;
        elem.style.backgroundColor = `var(--color-gray-${note.includes("b") ? "700" : "300"})`;
        setTimeout(() => elem.style.background = "", 100);
    }

    function setHaltPlaybackAdvance(e: KeyboardEvent) {
        haltPlaybackAdvance = e.getModifierState("Shift") || e.getModifierState("CapsLock");
    }

    function addRest() {
        staff.onAddRest();
    }

    function toggleTreble() {
        isTreble = !isTreble;
    }

    function toggleMode() {
        isModeSharps = !isModeSharps;
    }

    function discardNotes() {
        staff.discardAllNotes();
        errorMessage = "";
    }

    function cleanupTimeout() {
        if(collectTimeout !== null) {
            clearTimeout(collectTimeout);
        }
    }

    function triggerError(message: string) {
        errorMessage = message;
        uploadButton.style.backgroundColor = "var(--color-red)";
        setTimeout(() => uploadButton.style.backgroundColor = "", 1000);
    }

    async function upload() {
        const trimmedTitle = title.trim();
        if(trimmedTitle.length === 0) {
            triggerError(t("error.melody.title"));
            return;
        }

        if(storedNotes.length === 0) {
            triggerError(t("error.melody.notes"));
            return;
        }

        errorMessage = "";

        const body = {
            notes: storedNotes,
            title: trimmedTitle,
            author: author.trim().length > 0 ? author : "Anon",
            bpm: bpm,
            modeSharps: isModeSharps,
        } as MelodyDto;

        try {
            const response = await fetch(urlUpload, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if(!response.ok) {
                throw new Error(`Could not upload melody: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Upload response:", result);
        } catch(err: any) {
            console.error(err.message);
            triggerError(t("error.melody.upload"));
        }

    }

    $effect(() => {
        const cleanupKeydown = on(document, "keydown", onKeydown);
        const cleanupKeyup = on(document, "keyup", (e) => setHaltPlaybackAdvance(e));

        return () => {
            cleanupKeydown();
            cleanupKeyup();
            cleanupTimeout();
        }
    });
</script>

<div class="flex flex-col w-screen items-center">
    <div class="sticky w-full top-8 z-1">
        <div class="flex w-full justify-center">
            <!-- Piano keys -->
            <div class="max-w-4xl max-h-60 w-[80%] ml-8 aspect-8/3 bg-red grid grid-cols-1 grid-rows-1 border-2 border-surface2 drop-shadow-md drop-shadow-gray-800">
                <div class="grid grid-cols-14 col-start-1 row-start-1">
                    {#each whiteKeys as key}
                        <div id={key} class={`h-full bg-white border-x border-gray-300 hover:bg-gray-300`}>
                            <button
                                class="w-full h-full"
                                onclick={() => onNote(key)}
                                aria-label="note"
                            >
                            </button>
                        </div>
                    {/each}
                </div>

                <div class="grid grid-cols-42 col-start-1 row-start-1 pointer-events-none">
                        {#each blackKeys as key}
                        <div id={key} class={`${key ? "h-[60%] col-span-2 bg-black hover:bg-gray-700 pointer-events-auto" : ""}`}>
                            {#if key}
                                <button
                                    class="w-full h-full"
                                    onclick={() => onNote(key)}
                                    aria-label="note"
                                >
                                </button>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>

            <div class="flex flex-col justify-between">
                <button
                    class="svgButton"
                    onclick={addRest}
                    aria-label="rest"
                >
                    <Svg path={SvgPathSilent} className="svg" />
                </button>

                <div class="flex flex-col gap-2">
                    <button
                        class="svgButton"
                        onclick={toggleMode}
                        aria-label="accidental mode"
                    >
                        <Svg path={isModeSharps ? SvgPathSharp : SvgPathFlat} className="svg" />
                    </button>
                    <button 
                        class="svgButton"
                        onclick={toggleTreble}
                        aria-label="octave"
                    >
                        <Svg path={isTreble ? SvgPathAngleUp : SvgPathAngleDown} className="svg" />
                    </button>
                </div>
            </div>

        </div>
    </div>

    <Staff 
        audioManager={audioManager} 
        bind:storedNotes
        bind:this={staff}
        bind:bpm
        bind:title
        bind:author
        bind:isModeSharps
        isEditable={true}
    />

    <hr class="w-[80%] max-w-4xl border-surface2 mt-8">

    <div class="w-[80%] max-w-4xl flex justify-between mt-4">
        <button
            class="svgButton flex py-0.5 pr-1"
            onclick={discardNotes}
            aria-label="discard"
        >
            <Svg path={SvgPathTrash} />
            <span>{t("melody-creator.misc.delete")}</span>
        </button>
        <button
            class="svgButton flex py-0.5 pr-1"
            onclick={upload}
            aria-label="discard"
            bind:this={uploadButton}
        >
            <Svg path={SvgPathArrowUp} />
            <span>{t("melody-creator.misc.upload")}</span>
        </button>
    </div>

    {#if errorMessage}
        <span class="text-red font-bold">{errorMessage}</span>
    {/if}
</div>