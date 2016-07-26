import * as React from "react";

export default function TextBoxWithUpdateButton(
    props: {
        value: number,
        buttonVisible: boolean,
        onButtonClick: (e: React.MouseEvent) => void,
        onChange: (e: React.FormEvent) => void
    }
) {
    return (
        <div className="input-group">
            <input
                type="number"
                min="0"
                className="form-control"
                value={props.value}
                onChange={e => props.onChange(e)}
                />
            <span className="input-group-btn">
                <button
                    className={"btn " + (
                        props.buttonVisible
                            ? "btn-primary"
                            : "btn-secondary")}
                    disabled={!props.buttonVisible}
                    onClick={e => props.onButtonClick(e)}
                    >
                    ↻
                </button>
            </span>
        </div>
    );
}
