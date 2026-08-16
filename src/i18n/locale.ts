export const defaultLang = "de";

export const locale = {
    de: {
        "nav.home": "Startseite",
        "nav.projects": "Projekte",
        "nav.interactives": "Interaktives",
        "nav.melody-creator": "Melodie-Gestalter",
        "nav.melody-overview": "Melodien",

        "footer.lang.de": "Deutsch",
        "footer.lang.en": "Englisch",

        "home.legend.greeting": "Über mich",
        "home.legend.it": "IT-Kenntnisse",
        "home.legend.website": "Website",

        "home.greeting.header": "Hi, ich bin Justin Wallis",

        "home.greeting.text0": `
            Ich habe die angewandte Informatik an der Hochschule Hannover studiert (BSc).
            Entsprechend begeistere ich mich für das Programmieren und verbringe einen großen Teil meiner Freizeit damit,
            spaßige kleine Projekte zu erstellen.
            Diese variieren in Bereichen wie:
        `,

        "home.greeting.text1": `
            Game-Development, Desktop- und Mobilanwendungen,
            Webanwendungen oder low-level Software, z.b. für ESP32.
            Dabei ist es mir wichtig, stets Neues zu erlernen.
        `,

        "home.greeting.text2": "Wenn ich gerade mal nicht programmiere,",
        "home.greeting.text3": " (oder den Haushalt mache) ",
        "home.greeting.text4": "spiele ich gerne am Keyboard, an der Bassgitarre, mache Videospiele oder Sport.",

        "home.it.title.languages": "Sprachen",
        "home.it.title.frameworks": "Frameworks / Bibliotheken",
        "home.it.title.tools": "Werkzeuge",

        "home.website.text0": "Diese Website habe ich mit Astro, Svelte und Tailwind geschrieben.",
        "home.website.text1": "Für das Farbschema wird ",
        "home.website.text2": " verwendet.",
        "home.website.text3": `
            Über den Tab "Projekte" sind einige Quelltexte meiner Anwendungen veröffentlicht.
            Der Tab "Interaktives" führt Webanwendungen vor, die nativ im Browser funktionieren.
        `,

        "projects.misc.git": "Quelle",
        "projects.legend.pretext": "Vorwort",

        "projects.pretext.text0": `
            Dieser Tab führt sämtliche Projekte vor, die auf meinem Github-Profil veröffentlicht sind.
        `,

        "projects.pretext.hover": `
            Um ein animiertes Beispiel eines Projekts zu sehen, bewege den Mauszeiger über das dazugehörige Bild 
            (ein Klick funktioniert auch, falls dein Gerät touch-basiert ist).
        `,

        "projects.pretext.note": "Anmerkung: ",

        "projects.pretext.ai0": `
            Die hier vorgeführten Projekte wurden ohne Verwendung eines KI-Coding-Agenten
            (z.B. Claude Code) programmiert.
            KI wurde lediglich für die Zusammenfassung von Dokumentationen verwendet.
        `,

        "projects.description.pictochat": `
            Browser-Chatprogramm mit Zeichnen-Funktion.
            Diente als Lernerfahrung für React und der Kommunikation mit Spring Boot via Websockets.
        `,

        "projects.description.plaincontainers": `
            Mini-Logistik Android App, die bei der Organisation im Haushalt hilft.
        `,

        "projects.description.hati": `
            Jump-n-run Browser-Minispiel.
            Sammle so viele Punkte wie möglich, ohne ein Hindernis zu berühren!
        `,

        "projects.description.website": `
            Meine Portfolio-Website.
            Falls du es nicht bemerkst hast: Genau dort befindest du dich gerade!
        `,

        "projects.description.homeserver": `
            Das Backend meines Servers. Stellt mir Funktionen zur Verfügung,
            wie z.B. APIs für andere Projekte oder eine kleine private Cloud.
        `,

        "projects.description.melodycreator": `
            Erstelle einfache Melodien und veröffentliche sie auf dieser Website.
        `,

        "interactives.sidebar.customcursors": "Individuelle Zeiger:",

        "melody.title": "Titel",
        "melody.author": "Autor",

        "melody-creator.pretext.title0": "Erklärung",
        "melody-creator.pretext.title1": "Steuerung",

        "melody-creator.pretext.text0": `
            Klicke auf die Pianotasten oder benutze deine Tastatur, um einfache Melodien zu spielen.
            Gespielte Noten werden in das Notensystem geschrieben, welches dir ermöglicht,
            deine Melodie von einer bestimmten Position abzuspielen.
        `,

        "melody-creator.pretext.text1": `
            Mit dem Button oben-rechts vom Piano springt die Wiedergabe auf den nächsten Taktschlag,
            um deiner Melodie eine Pause hinzuzufügen.`,

        "melody-creator.pretext.text2": "Mit den Buttons unten-rechts vom Piano wechselst du:",
        "melody-creator.pretext.text3": "1. Das Versetzungszeichen von neuen Noten zwischen Kreuz(♯) und B(♭).",
        "melody-creator.pretext.text4": "2. Die Oktave von neuen Noten zwischen Treble und Bass.",

        "melody-creator.pretext.text5": "Die Buttons oben-links vom Notensystem starten, pausieren und stoppen die Wiedergabe.",
        "melody-creator.pretext.text6": `
            Oben-rechts vom Notensystem kannst du eine Zahl zwischen 1 und 720 eingeben,
            um die BPM-Zahl und somit die Geschwindigkeit der Wiedergabe zu beeinflussen.
        `,
        "melody-creator.pretext.text7": `
            In der Fußzeile jedes Notensystems befinden sich anklickbare Markierungen,
            womit die Wiedergabe auf den jeweiligen Taktschlag springt.
        `,
        "melody-creator.pretext.text8": "Anschließend lassen sich Noten im Notensystem anklicken, um sie zu löschen.",

        "melody-creator.pretext.text9": `
            Anstelle von Mausklicks kann auch die Tastatur verwendet werden.
            Hierbei wird vom QWERTZ-Tastaturlayout ausgegangen.
            Um Noten zu spielen, benutze die folgenden Tastaturreihen:
        `,
        
        "melody-creator.pretext.text10": "[Y - M] und [S - J]: Untere Hälfte des Pianos.",
        "melody-creator.pretext.text11": "[R - P] und [5 - 0]: Obere Hälfte des Pianos.",
        "melody-creator.pretext.text12": "(das Tastaturlayout ist den schwarzen Pianotasten angeglichen)",

        "melody-creator.pretext.text13": "Für weitere Funktionen, benutze die folgenden Tasten:",
        "melody-creator.pretext.text14": "[1]: Wiedergabe starten/pausieren.",
        "melody-creator.pretext.text15": "[2]: Wiedergabe stoppen.",
        "melody-creator.pretext.text16": "[3]: Versetzungszeichen wechseln zwischen Kreuz(♯) und B(♭).",
        "melody-creator.pretext.text17": "[Q]: Oktave wechseln zwischen Treble und Bass.",
        "melody-creator.pretext.text18": "[W]: Pause hinzufügen.",
        "melody-creator.pretext.text19": `
            [Shift] oder aktiviertes [CapsLock]: Beim Spielen von Noten bleibt die Wiedergabe
            auf den momentanen Taktschlag stehen (nützlich, um Akkorde zu erstellen).
        `,
        "melody-creator.pretext.text20": "[Linke Pfeiltaste] oder [Rechte Pfeiltaste]: Wiedergabe springt rückwärts/vorwärts.",

        "melody-creator.misc.delete": "Löschen",
        "melody-creator.misc.upload": "Hochladen",

        "error.melody.title": "Titel darf nicht leer sein!",
        "error.melody.notes": "Noten dürfen nicht leer sein!",
        "error.melody.upload": "Fehler beim Hochladen!",
    },

    en: {
        "nav.home": "Homepage",
        "nav.projects": "Projects",
        "nav.interactives": "Interactives",
        "nav.melody-creator": "Melody creator",
        "nav.melody-overview": "Melodies",

        "footer.lang.de": "German",
        "footer.lang.en": "English",

        "home.legend.greeting": "About me",
        "home.legend.it": "IT knowledge",
        "home.legend.website": "Website",

        "home.greeting.header": "Hi, I'm Justin Wallis",

        "home.greeting.text0": `
            At the University of Applied Sciences and Arts of Hannover, I completed my bachelor's degree in computer science.
            I am enthusiastic about programming and spend a big portion of my free time coding fun, little projects.
            These vary in different areas:
        `,

        "home.greeting.text1": `
            From game development, to desktop- and mobile applications,
            to web apps or low-level software, e.g. for ESP32.
            Adding to that, it's important to me to keep learning new things.
        `,

        "home.greeting.text2": "When I'm not coding at the moment,",
        "home.greeting.text3": " (or doing house chores) ",
        "home.greeting.text4": "I like to play on the keyboard, the bass guitar, videogames, or I simply work out.",

        "home.it.title.languages": "Languages",
        "home.it.title.frameworks": "Frameworks / Libraries",
        "home.it.title.tools": "Tools",

        "home.website.text0": "This website was written with Astro, Svelte and Tailwind.",
        "home.website.text1": "Regarding the color scheme, ",
        "home.website.text2": " is being used.",
        "home.website.text3": `
            Via the above tab "Projects", some repositories of my applications are made public.
            The tab "Interactives" showcases some web-apps, that are usable directly in the browser.
        `,

        "projects.misc.git": "Source",
        "projects.legend.pretext": "Pretext",

        "projects.pretext.text0": `
            This tab showcases several projects, that are public on my Github.
        `,

        "projects.pretext.hover": `
            To view an animated example of a project, move the mouse cursor over the associated image
            (a click also works, if your device is touch-based).
        `,

        "projects.pretext.note": "Note: ",

        "projects.pretext.ai0": `
            All showcased projects were programmed without the use of an AI coding agent (e.g. Claude Code).
            AI was merely used for generic chat prompts, to explain parts of a framework
            (as in the summarization of documentation).
        `,

        "projects.pictochat.title": "PictoChat recreation",
        "projects.description.pictochat": `
            Web-recreation of the chat program "PictoChat".
            Served as a learning experience for React and the communication with Spring Boot via websockets.
        `,

        "projects.description.plaincontainers": `
            Android App, that helps with organisation of items within the household.
        `,

        "projects.description.hati": `
            Browser minigame, that is playable on this website.
        `,

        "projects.description.website": `
            My portfolio website.
            In case you didn't notice: You're on it right now!
        `,

        "projects.description.homeserver": `
            Selfhosted backend, that provides APIs for my frontends.
            Additionally, it serves me other functionalities, such as a small, private cloud.
        `,

        "projects.description.melodycreator": `
            Create simple melodies and make them public on this website.
        `,

        "interactives.sidebar.customcursors": "Custom cursors:",

        "melody.title": "Title",
        "melody.author": "Author",

        "melody-creator.pretext.title0": "Explanation",
        "melody-creator.pretext.title1": "Controls",

        "melody-creator.pretext.text0": `
            Click on the piano keys or use your keyboard to play simple melodies.
            Played notes are written on the staff, which allows you to play your melody from a specific position.
        `,

        "melody-creator.pretext.text1": `
            With the button to the top-right of the piano, the playback will jump to the next beat,
            adding a rest to your melody.
        `,

        "melody-creator.pretext.text2": "With the buttons to the bottom-right of the piano, you can toggle:",
        "melody-creator.pretext.text3": "1. The accidentals of new notes between sharps(♯) and flats(♭).",
        "melody-creator.pretext.text4": "2. The octave of new notes between treble and bass.",

        "melody-creator.pretext.text5": "The buttons to the top-left of the staff will start, pause and stop the playback.",
        "melody-creator.pretext.text6": `
            To the top-right of the staff, you can input a number between 1 and 720,
            to influence the bpm value and thus the the tempo of the playback.
        `,
        "melody-creator.pretext.text7": `
            At the footer of every staff there are clickable markers,
            that set the playback to the respective beat.
        `,
        "melody-creator.pretext.text8": "Lastly, notes can be clicked within the staff to delete them.",

        "melody-creator.pretext.text9": `
            Instead of mouse clicks, the keyboard can be used.
            A QWERTZ keyboard layout is assumed.
            To play notes, use the following keyboard rows:
        `,
        
        "melody-creator.pretext.text10": "[Y - M] and [S - J]: Lower half of the piano.",
        "melody-creator.pretext.text11": "[R - P] and [5 - 0]: Upper half of the piano.",
        "melody-creator.pretext.text12": "(the keyboard layout is aligned to the black piano keys)",

        "melody-creator.pretext.text13": "For more functions, use the following keys:",
        "melody-creator.pretext.text14": "[1]: Start/pause the playback.",
        "melody-creator.pretext.text15": "[2]: Stop the playback.",
        "melody-creator.pretext.text16": "[3]: Toggle accidentals between sharps(♯) and flats(♭).",
        "melody-creator.pretext.text17": "[Q]: Toggle octaves between treble and bass.",
        "melody-creator.pretext.text18": "[W]: Add a rest.",
        "melody-creator.pretext.text19": `
            [Shift] or activated [CapsLock]: While playing notes, the playback stays on the current beat
            (useful to create chords).
        `,
        "melody-creator.pretext.text20": "[Left arrow-key] or [Right arrow-key]: Playback jumps backward/forward.",

        "melody-creator.misc.delete": "Delete",
        "melody-creator.misc.upload": "Upload",

        "error.melody.title": "Title cannot be empty!",
        "error.melody.notes": "Notes cannot be empty!",
        "error.melody.upload": "Error on upload!",
    }
} as const;