import * as React from "react";
import Switch from "./switch.tsx";
import TextBoxWithUpdateButton from "./textboxwithupdatebutton.tsx";
import TwitchWatcher from "../models/twitchwatcher.ts";

export default function TwitchSetting(
    props: {
        enable: boolean,
        urlOrChannel: string,
        updateVisible: boolean,
        onURLOrChannelChange: (e: React.FormEvent) => void,
        onUpdateClick: (e: React.MouseEvent) => void,
        onEnableClick: (e: React.MouseEvent) => void,
        onDisableClick: (e: React.MouseEvent) => void
    }
) {
    let valid = TwitchWatcher.parseURLOrChannel(props.urlOrChannel) != null;
    return (
        <div className="row">
            <label className="col-xs-4 form-control-static text-xs-right">
                Twitch:
            </label>
            <span className="col-xs-4">
                <TextBoxWithUpdateButton
                    value={props.urlOrChannel}
                    buttonVisible={props.updateVisible}
                    buttonDisabled={!valid}
                    onChange={e => props.onURLOrChannelChange(e)}
                    onButtonClick={e => props.onUpdateClick(e)}
                    />
            </span>
            <span className="col-xs-4">
                <Switch
                    enable={props.enable}
                    disabled={!valid}
                    onEnableClick={e => props.onEnableClick(e)}
                    onDisableClick={e => props.onDisableClick(e)}
                    />
            </span>
        </div>
    );
}
