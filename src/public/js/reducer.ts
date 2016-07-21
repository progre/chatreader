import { combineReducers } from "redux";

import Speaker from "./models/speaker.ts";

let initialLocal = {
    speaker: <Speaker | null>null
};

function local(state = initialLocal, action: Redux.Action & { payload: any }) {
    switch (action.type) {
        case "SET_SPEAKER":
            return { speaker: action.payload.speaker };
        default:
            return state;
    }
}

let initialFresh = {
    available: false,
    programId: -1,
    updateVisible: false
};

function fresh(state = initialFresh, action: Redux.Action & { payload: any }) {
    switch (action.type) {
        case "SET_PROGRAM_ID":
            return Object.assign({},
                state,
                { programId: action.payload.id });
        case "ENABLE":
            return Object.assign({},
                state,
                { availability: true });
        case "DISABLE":
            return Object.assign({},
                state,
                { availability: false });
        default:
            return state;
    }
}

let reducer = combineReducers({ local, fresh });
export default reducer;
