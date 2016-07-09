import { EventEmitter } from "events";
const fetch: typeof _fetch.fetch = require("node-fetch");

export default class AbemaWatcher extends EventEmitter {
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
