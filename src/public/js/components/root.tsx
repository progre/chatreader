import * as React from "react";
import FreshSetting from "./freshsetting.tsx";

export default function Root(
    props: {
        fresh: {
            enable: boolean,
            urlOrProgramId: string,
            updateVisible: boolean,
            onURLOrProgramIdChange: (e: React.FormEvent) => void,
            onUpdateClick: (e: React.MouseEvent) => void,
            onEnableClick: (e: React.MouseEvent) => void,
            onDisableClick: (e: React.MouseEvent) => void
        }
    }
) {
    let fresh = props.fresh;
    return (
        <div className="container-fluid">
            <FreshSetting
                enable={fresh.enable}
                urlOrProgramId={fresh.urlOrProgramId}
                updateVisible={fresh.updateVisible}
                onURLOrProgramIdChange={e => fresh.onURLOrProgramIdChange(e) }
                onUpdateClick={e => fresh.onUpdateClick(e) }
                onEnableClick={e => fresh.onEnableClick(e) }
                onDisableClick={e => fresh.onDisableClick(e) }
                />
        </div>
    );
}
