import FreshWatcher from "./freshwatcher.ts";
import TwitchWatcher from "./twitchwatcher.ts";
import Speaker from "./speaker.ts";

export default class WatcherConductor {
    private freshWatcher: FreshWatcher;
    private twitchWatcher: TwitchWatcher;

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

    startTwitchWatch(channel: string) {
        this.stopTwitchWatch();
        this.twitchWatcher = new TwitchWatcher(channel);
        this.twitchWatcher.on("comment", (data: any[]) => {
            for (let datum of data) {
                this.speaker.speak("ツイッチ。" + datum);
            }
        });
        this.twitchWatcher.watch();
        this.speaker.speak(`チャンネル ${channel} の読み上げを開始します`);
    }

    stopTwitchWatch() {
        if (this.twitchWatcher != null) {
            this.twitchWatcher.clear();
        }
    }
}
