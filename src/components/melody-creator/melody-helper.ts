const sharpsToFlats: Map<string, string> = new Map([
    ["C#", "Db"],
    ["D#", "Eb"],
    ["F#", "Gb"],
    ["G#", "Ab"],
    ["A#", "Bb"]
]);


/**
 * @param fullNoteStr Full note with sharp-accidental, including the octave (e.g. C#3).
 * @returns Flat-equivalent note from the sharp note, or undefined if no conversion exists.
 */
export function getFlatFromSharpNote(fullNoteStr: string): string | undefined {
    const converted = sharpsToFlats.get(fullNoteStr.substring(0, 2));
    return (converted) ? converted + fullNoteStr.charAt(2) : undefined;
}

/**
 * @param fullNoteStr Full note with flat-accidental, including the octave (e.g. Db3).
 * @returns Sharp-equivalent note from the flat note, or undefined if no conversion exists.
 */
export function getSharpFromFlatNote(fullNoteStr: string): string | undefined {
    const base = fullNoteStr.charAt(0);
    const accidental = fullNoteStr.charAt(1);
    const octave = fullNoteStr.charAt(2);
    for(const [key, value] of sharpsToFlats.entries()) {
        if(value === base + accidental) {
            return key + octave;
        }
    }

    return undefined;
}