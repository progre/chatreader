import * as React from "react";
import Root from "../components/root.tsx";
import Speaker from "../models/speaker.ts";
import Model from "../models/model.ts";

interface State {
    speaker?: Speaker;
    fresh?: {
        enable: boolean,
        programId: number,
        updateVisible: boolean
    };
}

export default class App extends React.Component<{}, State> {
    private model: Model;

    constructor() {
        super();
        this.state = {
            fresh: {
                enable: false,
                programId: -1,
                updateVisible: true
            }
        };

        (async () => {
            let speaker = await Speaker.create();
            this.model = new Model(speaker);
            this.setState({ speaker });
        })().catch(e => console.error(e.stack || e));
    }

    render() {
        let freshState = this.state.fresh;
        let freshProps = {
            enable: freshState.enable,
            programId: freshState.programId,
            updateVisible: freshState.updateVisible,
            onProgramIdChange: (e: React.FormEvent) =>
                this.setState({
                    fresh: Object.assign({},
                        freshState,
                        { programId: (e.target as HTMLInputElement).value })
                }),
            onUpdateClick: (e: React.MouseEvent) =>
                this.model.startFreshWatch(this.state.fresh.programId),
            onEnableClick: (e: React.MouseEvent) =>
                this.setState({
                    fresh: Object.assign({},
                        freshState,
                        { enable: true })
                }),
            onDisableClick: (e: React.MouseEvent) =>
                this.setState({
                    fresh: Object.assign({},
                        freshState,
                        { enable: false })
                })
        };
        return (
            <Root fresh={freshProps}/>
        );
    }

    componentDidUpdate(prevProps: {}, prevState: State) {
        if (!prevState.fresh.enable && this.state.fresh.enable) {
            this.model.startFreshWatch(this.state.fresh.programId);
        }
        if (prevState.fresh.enable && !this.state.fresh.enable) {
            this.model.stopFreshWatch();
        }
    }
}
