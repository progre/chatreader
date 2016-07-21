import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Root from "../components/root.tsx";
import Speaker from "../models/speaker.ts";
import Model from "../models/model.ts";
import action from "../action.ts";

interface Props {
    local: {
        speaker?: Speaker;
    };
    fresh: {
        availability: boolean;
        programId: number;
        updateVisible: boolean;
    };
    setSpeaker(speaker: Speaker): void;
    setProgramId(id: number): void;
    enable(): void;
    disable(): void;
}

class App extends React.Component<Props, {}> {
    private model: Model;

    constructor() {
        super();

        (async () => {
            let speaker = await Speaker.create();
            this.model = new Model(speaker);
            this.props.setSpeaker(speaker);
        })().catch(e => console.error(e.stack || e));
    }

    render() {
        let freshState = this.props.fresh;
        let freshProps = {
            enable: freshState.availability,
            programId: freshState.programId,
            updateVisible: freshState.updateVisible,
            onProgramIdChange: (e: React.FormEvent) =>
                this.props.setProgramId(
                    Number.parseInt((e.target as HTMLInputElement).value)),
            onUpdateClick: (e: React.MouseEvent) =>
                this.model.startFreshWatch(freshState.programId),
            onEnableClick: (e: React.MouseEvent) =>
                this.props.enable(),
            onDisableClick: (e: React.MouseEvent) =>
                this.props.disable()
        };
        return (
            <Root fresh={freshProps}/>
        );
    }

    componentDidUpdate(prevProps: Props) {
        if (!prevProps.fresh.availability && this.props.fresh.availability) {
            this.model.startFreshWatch(this.props.fresh.programId);
        }
        if (prevProps.fresh.availability && !this.props.fresh.availability) {
            this.model.stopFreshWatch();
        }
    }
}

function mapStateToProps(state: any) {
    return state;
}

function mapDispatchToProps(dispatch: Redux.Dispatch<{}>) {
    return bindActionCreators(action, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
