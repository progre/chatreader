export default class Speaker {
    static async create() {
        await new Promise((resolve, reject) => {
            speechSynthesis.addEventListener("voiceschanged", resolve);
        });
        let voice = speechSynthesis.getVoices()
            .filter(x => x.lang === "ja-JP")[0];
        return new Speaker(voice);
    }

    constructor(private voice: SpeechSynthesisVoice) {
    }

    speak(text: string) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.voice;
        speechSynthesis.speak(utterance);
    }
}
