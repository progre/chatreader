import Speaker from "./models/speaker.ts";
import FreshWatcher from "./models/freshwatcher.ts";
import WatcherConductor from "./models/watcherconductor.ts";
import { State } from "./reducer.ts";

export default {
    init() {
        return async (dispatch: Redux.Dispatch<{}>) => {
            let speaker = await Speaker.create();
            dispatch({ type: "SET_SPEAKER", payload: { speaker } });
            let watcherConductor = new WatcherConductor(speaker);
            dispatch({
                type: "SET_WATCHER_CONDUCTOR",
                payload: { watcherConductor }
            });
        };
    },

    setURLOrProgramId: (urlOrProgramId: string) =>
        ({ type: "SET_URL_OR_PROGRAM_ID", payload: { urlOrProgramId } }),

    start() {
        return async (dispatch: Redux.Dispatch<{}>, getState: () => State) => {
            let state = getState();
            let programId = FreshWatcher.parseURLOrProgramId(
                state.fresh.urlOrProgramId);
            if (programId == null) {
                return dispatch({ type: "START_FAILED" });
            }
            state.local.watcherConductor!.startFreshWatch(programId);
            return dispatch({
                type: "START_SUCCEEDED",
                payload: { programId }
            });
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
