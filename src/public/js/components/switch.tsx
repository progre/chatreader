import * as React from "react";

export default function Switch(
    props: {
        enable: boolean,
        disabled: boolean,
        onEnableClick: (e: React.MouseEvent) => void,
        onDisableClick: (e: React.MouseEvent) => void
    }
) {
    return (
        <div className="btn-group">
            <button
                className={
                    "btn"
                    + (props.enable
                        ? " btn-primary active"
                        : " btn-primary-outline")
                }
                style={{ width: "3em" }}
                disabled={!props.enable && props.disabled}
                onClick={e => props.onEnableClick(e)}
                >
                I
            </button>
            <button
                className={
                    "btn"
                    + (!props.enable
                        ? " btn-primary active"
                        : " btn-primary-outline")
                }
                style={{ width: "3em" }}
                onClick={e => props.onDisableClick(e)}
                >
                O
            </button>
        </div>
    );
}
