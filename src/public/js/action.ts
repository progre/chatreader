import Speaker from "./models/speaker.ts";
import WatcherConductor from "./models/watcherconductor.ts";
import { State } from "./reducer.ts";

export default {
    init() {
        return async (dispatch: Redux.Dispatch<{}>) => {
            let speaker = await Speaker.create();
            dispatch({ type: "SET_SPEAKER", payload: { speaker } });
            let watcherConductor = new WatcherConductor(speaker);
            dispatch({ type: "SET_WATCHER_CONDUCTOR", payload: { watcherConductor } });
        };
    },

    setProgramId: (id: number) =>
        ({ type: "SET_PROGRAM_ID", payload: { id } }),

    start() {
        return async (dispatch: Redux.Dispatch<{}>, getState: () => State) => {
            let state = getState();
            state.local.watcherConductor!.startFreshWatch(state.fresh.programId);
            dispatch({ type: "START" });
        };
    },

    stop() {
        return async (dispatch: Redux.Dispatch<{}>, getState: () => State) => {
            let state = getState();
            state.local.watcherConductor!.stopFreshWatch();
            dispatch({ type: "STOP" });
        };
    }
};
