import { EventEmitter } from "events";
const fetch: typeof _fetch.fetch = require("node-fetch");

export default class AbemaWatcher extends EventEmitter {
    private latestMillisecond = -1;
    private timer: NodeJS.Timer;

    static parseURLOrProgramId(urlOrProgramId: string) {
        let maybeProgramId = parseInt(urlOrProgramId, 10);
        if (!isNaN(maybeProgramId)) {
            return maybeProgramId;
        }
        let m = /https:\/\/abemafresh.tv\/.+\/([0-9]+)/
            .exec(urlOrProgramId);
        if (m == null) {
            return null;
        }
        return parseInt(m[1], 10);
    }

    constructor(private programId: number) {
        super();
    }

    async watch() {
        let comments = await getComments(this.programId);
        this.latestMillisecond = comments[0].millisecond; // TODO: 時刻バラバラなので既読のidを取得数分くらい持っとくのがよさそう
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
