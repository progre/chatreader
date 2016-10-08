import * as React from "react";

export default function TextBoxWithUpdateButton(
    props: {
        value: string;
        buttonVisible: boolean;
        buttonDisabled: boolean;
        placeHolder: string;
        onButtonClick: (e: React.MouseEvent) => void;
        onChange: (e: React.FormEvent) => void;
    }
) {
    return (
        <div className={
            props.buttonVisible
                ? "input-group"
                : ""
        }
            >
            <input
                type="text"
                className="form-control"
                value={props.value}
                onChange={e => props.onChange(e)}
                placeholder={props.placeHolder}
                />
            <span
                className="input-group-btn"
                style={
                    props.buttonVisible
                        ? {}
                        : { display: "none" }
                }
                >
                <button
                    className="btn"
                    disabled={props.buttonDisabled}
                    onClick={e => props.onButtonClick(e)}
                    >
                    ↻
                </button>
            </span>
        </div>
    );
}
