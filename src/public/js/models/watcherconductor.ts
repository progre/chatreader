import FreshWatcher from "./freshwatcher.ts";
import Speaker from "./speaker.ts";

export default class WatcherConductor {
    private freshWatcher: FreshWatcher;

    constructor(private speaker: Speaker) {
    }

    startFreshWatch(programId: number) {
        this.stopFreshWatch();
        this.freshWatcher = new FreshWatcher(programId);
        this.freshWatcher.on("comment", (data: any[]) => {
            for (let datum of data) {
                this.speaker.speak("フレッシュバイアベーマティーブイ。" + datum.comment);
            }
        });
        this.freshWatcher.watch();
        this.speaker.speak(`番組ID ${programId} の読み上げを開始します`);
    }

    stopFreshWatch() {
        if (this.freshWatcher != null) {
            this.freshWatcher.clear();
        }
    }
}
