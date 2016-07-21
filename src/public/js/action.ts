import Speaker from "./models/speaker.ts";

export default {
    setSpeaker: (speaker: Speaker) =>
        ({ type: "SET_SPEAKER", payload: { speaker } }),
    setProgramId: (id: number) =>
        ({ type: "SET_PROGRAM_ID", payload: { id } }),
    enable: () =>
        ({ type: "ENABLE" }),
    disable: () =>
        ({ type: "DISABLE" })
};
