import { combineReducers } from "redux";
import WatcherConductor from "./models/watcherconductor.ts";

let initialState = {
    local: {
        watcherConductor: <WatcherConductor | null>null
    },
    fresh: {
        enable: false,
        programId: -1,
        updateVisible: false
    }
};

export type State = typeof initialState;

function local(state = initialState.local, action: Redux.Action & { payload: any }) {
    switch (action.type) {
        case "SET_WATCHER_CONDUCTOR":
            return { watcherConductor: action.payload.watcherConductor };
        default:
            return state;
    }
}

function fresh(state = initialState.fresh, action: Redux.Action & { payload: any }) {
    switch (action.type) {
        case "SET_PROGRAM_ID":
            return Object.assign({},
                state,
                { programId: action.payload.id });
        case "START":
            return Object.assign({},
                state,
                { enable: true });
        case "STOP":
            return Object.assign({},
                state,
                { enable: false });
        default:
            return state;
    }
}

let reducer = combineReducers({ local, fresh });
export default reducer;
