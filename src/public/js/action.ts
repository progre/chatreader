import Speaker from "./models/speaker.ts";
import FreshWatcher from "./models/freshwatcher.ts";
import TwitchWatcher from "./models/twitchwatcher.ts";
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

    setFreshURLOrProgramId: (urlOrProgramId: string) =>
        ({ type: "SET_FRESH_URL_OR_PROGRAM_ID", payload: { urlOrProgramId } }),

    setTwitchURLOrChannel: (urlOrChannel: string) =>
        ({ type: "SET_TWITCH_URL_OR_CHANNEL", payload: { urlOrChannel } }),

    startFresh() {
        return async (dispatch: Redux.Dispatch<{}>, getState: () => State) => {
            let state = getState();
            let programId = FreshWatcher.parseURLOrProgramId(
                state.fresh.urlOrProgramId);
            if (programId == null) {
                return dispatch({ type: "START_FRESH_FAILED" });
            }
            state.local.watcherConductor!.startFreshWatch(programId);
            return dispatch({
                type: "START_FRESH_SUCCEEDED",
                payload: { programId }
            });
        };
    },

    stopFresh() {
        return async (dispatch: Redux.Dispatch<{}>, getState: () => State) => {
            let state = getState();
            state.local.watcherConductor!.stopFreshWatch();
            dispatch({ type: "STOP_FRESH" });
        };
    },

    startTwitch() {
        return async (dispatch: Redux.Dispatch<{}>, getState: () => State) => {
            let state = getState();
            let channel = TwitchWatcher.parseURLOrChannel(
                state.twitch.urlOrChannel);
            if (channel == null) {
                return dispatch({ type: "START_TWITCH_FAILED" });
            }
            state.local.watcherConductor!.startTwitchWatch(channel);
            return dispatch({
                type: "START_TWITCH_SUCCEEDED",
                payload: { channel }
            });
        };
    },

    stopTwitch() {
        return async (dispatch: Redux.Dispatch<{}>, getState: () => State) => {
            let state = getState();
            state.local.watcherConductor!.stopTwitchWatch();
            dispatch({ type: "STOP_TWITCH" });
        };
    }
};
