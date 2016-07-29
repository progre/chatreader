import * as React from "react";
import Switch from "./switch.tsx";
import TextBoxWithUpdateButton from "./textboxwithupdatebutton.tsx";

export default function FreshSetting(
    props: {
        enable: boolean,
        urlOrProgramId: string,
        updateVisible: boolean,
        onProgramIdChange: (e: React.FormEvent) => void,
        onUpdateClick: (e: React.MouseEvent) => void,
        onEnableClick: (e: React.MouseEvent) => void,
        onDisableClick: (e: React.MouseEvent) => void
    }
) {
    return (
        <div className="row">
            <label className="col-xs-4 form-control-static text-xs-right">
                FRESH! by AbemaTV:
            </label>
            <span className="col-xs-4">
                <TextBoxWithUpdateButton
                    value={props.urlOrProgramId}
                    buttonVisible={props.updateVisible}
                    onChange={e => props.onProgramIdChange(e)}
                    onButtonClick={e => props.onUpdateClick(e)}
                    />
            </span>
            <span className="col-xs-4">
                <Switch
                    enable={props.enable}
                    onEnableClick={e => props.onEnableClick(e)}
                    onDisableClick={e => props.onDisableClick(e)}
                    />
            </span>
        </div>
    );
}
