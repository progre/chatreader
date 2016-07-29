import { combineReducers } from "redux";
import WatcherConductor from "./models/watcherconductor.ts";

let initialState = {
    local: {
        watcherConductor: <WatcherConductor | null>null
    },
    fresh: {
        workingProgramId: -1,
        editingURLOrProgramId: ""
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
                { editingProgramId: action.payload.id });
        case "START_SUCCEEDED":
            return Object.assign({},
                state,
                {
                    workingProgramId: state.editingURLOrProgramId
                });
        case "STOP":
            return Object.assign({},
                state,
                {
                    workingProgramId: -1
                });
        default:
            return state;
    }
}

let reducer = combineReducers({ local, fresh });
export default reducer;
