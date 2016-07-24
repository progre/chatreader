import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Root from "../components/root.tsx";
import action from "../action.ts";
import { State } from "../reducer.ts";

type Props = State & typeof action;

class App extends React.Component<Props, {}> {
    componentWillMount() {
        this.props.init();
    }

    render() {
        let freshState = this.props.fresh;
        let freshProps = {
            enable: freshState.enable,
            programId: freshState.programId,
            updateVisible: freshState.updateVisible,
            onProgramIdChange: (e: React.FormEvent) =>
                this.props.setProgramId(
                    Number.parseInt((e.target as HTMLInputElement).value)),
            onUpdateClick: (e: React.MouseEvent) =>
                this.props.start(),
            onEnableClick: (e: React.MouseEvent) =>
                this.props.start(),
            onDisableClick: (e: React.MouseEvent) =>
                this.props.stop()
        };
        return (
            <Root fresh={freshProps}/>
        );
    }
}

function mapStateToProps(state: any) {
    return state;
}

function mapDispatchToProps(dispatch: Redux.Dispatch<{}>) {
    return bindActionCreators(action, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
