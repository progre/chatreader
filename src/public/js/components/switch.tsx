import * as React from "react";

export default function Switch(
    props: {
        enable: boolean,
        onEnableClick: (e: React.MouseEvent) => void,
        onDisableClick: (e: React.MouseEvent) => void
    }
) {
    return (
        <div>
            <div className="btn-group">
                <button
                    className={
                        "btn btn-info-outline"
                        + (!props.enable ? " active" : "")
                    }
                    style={{ width: "3em" }}
                    onClick={e => props.onDisableClick(e) }
                    >
                    O
                </button>
                <button
                    className={
                        "btn btn-primary-outline"
                        + (props.enable ? " active" : "")
                    }
                    style={{ width: "3em" }}
                    onClick={e => props.onEnableClick(e) }
                    >
                    I
                </button>
            </div>
        </div>
    );
}
