import { EventEmitter } from "events";
const Client = require("tmi.js").client;
import { Watcher } from "./watcher.ts";

export default class TwitchWatcher extends EventEmitter implements Watcher {
    private client: any | null;

    constructor(private channel: string) {
        super();
    }

    async watch() {
        this.clear();
        this.client = new Client({ channels: [this.channel] });
        this.client.on(
            "chat",
            (
                channel: string,
                userstate: any,
                message: string,
                self: boolean
            ) => {
                super.emit("comment", [message]);
            });
        await this.client.connect();
    }

    async clear() {
        if (this.client != null) {
            await this.client.disconnect();
        }
    }
}

