import { combineReducers } from "redux";
import WatcherConductor from "./models/watcherconductor.ts";

let initialState = {
    local: {
        watcherConductor: <WatcherConductor | null>null
    },
    fresh: {
        workingProgramId: -1,
        urlOrProgramId: ""
    },
    twitch: {
        workingChannel: "",
        urlOrChannel: ""
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
        case "SET_FRESH_URL_OR_PROGRAM_ID":
            return Object.assign({},
                state,
                { urlOrProgramId: action.payload.urlOrProgramId });
        case "START_FRESH_SUCCEEDED":
            return Object.assign({},
                state,
                {
                    workingProgramId: action.payload.programId
                });
        case "STOP_FRESH":
            return Object.assign({},
                state,
                {
                    workingProgramId: -1
                });
        default:
            return state;
    }
}

function twitch(state = initialState.twitch, action: Redux.Action & { payload: any }) {
    switch (action.type) {
        case "SET_TWITCH_URL_OR_CHANNEL":
            return Object.assign({},
                state,
                { urlOrChannel: action.payload.urlOrChannel });
        case "START_TWITCH_SUCCEEDED":
            return Object.assign({},
                state,
                {
                    workingChannel: action.payload.channel
                });
        case "STOP_TWITCH":
            return Object.assign({},
                state,
                {
                    workingChannel: ""
                });
        default:
            return state;
    }
}

let reducer = combineReducers({ local, fresh, twitch });
export default reducer;
