export class AudioManager {

    private readonly audioDir: string; 
    private audioContext: AudioContext | null = null;
    private audioBuffers: Map<string, AudioBuffer> = new Map();

    /**
     * The AudioManager is responsible for fetching, caching and playing mp3 files
     * from the given audio directory.
     * @param audioDir /public subdirectory that contains all the mp3 files
     */
    constructor(audioDir: string) {
        if(!audioDir.endsWith("/")) audioDir += "/";
        this.audioDir = audioDir;
    }

    /**
     * Caches and plays an mp3 file from the audio directory.
     * @param name Filename of the sound, without a path or file extension.
     */
    public async playSound(name: string) {
        let buffer = this.audioBuffers.get(name);

        // Fetch and cache audio data for the note mp3.
        if(!buffer) {
            const response = await fetch(`${this.audioDir}${name}.mp3`);
            if(!response.ok) {
                console.warn(`Could not fetch audio for ${name}: ${response.statusText}`);
                return;
            }

            try {
                const audioData = await response.arrayBuffer();

                if(!this.audioContext) this.audioContext = new AudioContext();
                const audioBuffer = await this.audioContext.decodeAudioData(audioData);

                this.audioBuffers.set(name, audioBuffer);
                buffer = audioBuffer;
            } catch(err) {
                console.warn("Could not get audio context:", err);
                return;
            }
        }
        
        this.playAudio(buffer);
    }

    private playAudio(buffer: AudioBuffer) {
        const source = this.audioContext!.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext!.destination);
        source.start();
    }
}