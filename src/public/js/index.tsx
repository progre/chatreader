/// <reference path="../../../typings/index.d.ts" />
import "babel-polyfill";
import AbemaWatcher from "./abemawatcher.ts";
import Speaker from "./speaker.ts";
import * as React from "react";
import * as ReactDOM from "react-dom";

class Root extends React.Component<{ speaker: Speaker }, any> {
    private watcher: AbemaWatcher;

    constructor() {
        super();
        this.state = {
            programId: -1
        };
    }

    render() {
        return (
            <div>
                <input
                    type="number"
                    onKeyPress={e => {
                        if (e.key !== "Enter") {
                            return;
                        }
                        e.preventDefault();
                        this.startWatch(parseInt((e.target as HTMLInputElement).value, 10));
                    } }
                    />
            </div>
        );
    }

    startWatch(programId: number) {
        if (this.watcher != null) {
            this.watcher.clear();
        }
        this.watcher = new AbemaWatcher(programId);
        this.watcher.on("comment", (data: any[]) => {
            for (let datum of data) {
                this.props.speaker.speak("フレッシュバイアベーマティーブイ。" + datum.comment);
            }
        });
        this.watcher.watch();
        this.props.speaker.speak(`番組ID ${programId} の読み上げを開始します`);
    }
}

async function main() {
    ReactDOM.render(
        <Root speaker={await Speaker.create() }/>,
        document.getElementById("root"));
}

main().catch(e => console.error(e.stack || e));
