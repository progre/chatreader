/// <reference path="../../../typings/index.d.ts" />
import "babel-polyfill";
import { EventEmitter } from "events";
const fetch: typeof _fetch.fetch = require("node-fetch");

async function main() {
    let speaker = await Speaker.create();
    let watcher = new AbemaWatcher(21898);
    watcher.on("comment", (data: any[]) => {
        for (let datum of data) {
            speaker.speak(datum.comment);
        }
    });
    watcher.watch();
    speaker.speak(`番組ID ぺけぺけ の読み上げを開始します`);
}

class Speaker {
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

class AbemaWatcher extends EventEmitter {
    private latestMillisecond = -1;
    private timer: NodeJS.Timer;

    constructor(private programId: number) {
        super();
    }

    async watch() {
        let comments = await getComments(this.programId);
        this.latestMillisecond = comments[0].millisecond;
        this.timer = setInterval(
            async () => {
                try {
                    console.log("新着コメントを確認...");
                    let comments = (await getComments(this.programId))
                        .filter(x => x.millisecond > this.latestMillisecond);
                    if (comments.length <= 0) {
                        console.log("新着なし");
                        return;
                    }
                    console.log(`新着 ${comments.length} 件`);
                    this.latestMillisecond = comments[0].millisecond;
                    super.emit("comment", comments.reverse());
                } catch (e) {
                    console.error(e.stack || e);
                }
            },
            7 * 1000);
    }

    clear() {
        clearInterval(this.timer);
    }
}

async function getComments(programId: number) {
    let res = await fetch(
        `https://abemafresh.tv/proxy/Comment;`
        + `count=50;`
        + `order=desc;`
        + `programId=${programId}`);
    let json = await res.json();
    return <any[]>json.data;
}

main().catch(e => console.error(e.stack || e));
