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
                className="form-control"
                value={props.value}
                onChange={e => props.onChange(e) }
                />
            <span className="input-group-btn">
                <button
                    className="btn btn-primary"
                    style={{ display: (props.buttonVisible ? "" : "none") }}
                    onClick={e => props.onButtonClick(e) }
                    >
                    Update
                </button>
            </span>
        </div>
    );
}
