import * as React from "react";
import Switch from "./switch.tsx";
import TextBoxWithUpdateButton from "./textboxwithupdatebutton.tsx";
import FreshWatcher from "../models/freshwatcher.ts";

export default function FreshSetting(
    props: {
        enable: boolean,
        urlOrProgramId: string,
        updateVisible: boolean,
        onURLOrProgramIdChange: (e: React.FormEvent) => void,
        onUpdateClick: (e: React.MouseEvent) => void,
        onEnableClick: (e: React.MouseEvent) => void,
        onDisableClick: (e: React.MouseEvent) => void
    }
) {
    let valid = FreshWatcher.parseURLOrProgramId(props.urlOrProgramId) != null;
    return (
        <div className="row">
            <label className="col-xs-4 form-control-static text-xs-right">
                FRESH!:
            </label>
            <span className="col-xs-4">
                <TextBoxWithUpdateButton
                    value={props.urlOrProgramId}
                    buttonVisible={props.updateVisible}
                    buttonDisabled={!valid}
                    placeHolder="URL or Program Id"
                    onChange={e => props.onURLOrProgramIdChange(e)}
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
