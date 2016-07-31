import { EventEmitter } from "events";
const Client = require("tmi.js").client;
import { Watcher } from "./watcher.ts";

export default class TwitchWatcher extends EventEmitter implements Watcher {
    private client: any | null;

    static parseURLOrChannel(urlOrChannel: string) {
        let urlMatcher = /https:\/\/www\.twitch\.tv\/(\S+)\/?/.exec(urlOrChannel);
        if (urlMatcher != null) {
            return `#${urlMatcher[1]}`;
        }
        let channelMatcher = /^#?(\S+)$/.exec(urlOrChannel);
        if (channelMatcher != null) {
            return `#${channelMatcher[1]}`;
        }
        return null;
    }

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

