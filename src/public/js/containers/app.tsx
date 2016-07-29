import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Root from "../components/root.tsx";
import FreshWatcher from "../models/freshwatcher.ts";
import action from "../action.ts";
import { State } from "../reducer.ts";

type Props = State & typeof action;

class App extends React.Component<Props, {}> {
    componentWillMount() {
        this.props.init();
    }

    render() {
        let fresh = this.props.fresh;
        let enable = fresh.workingProgramId >= 0;
        let freshProps = {
            enable,
            urlOrProgramId: fresh.urlOrProgramId,
            updateVisible: (
                enable
                && fresh.workingProgramId !== FreshWatcher.parseURLOrProgramId(fresh.urlOrProgramId)
            ),
            onURLOrProgramIdChange: (e: React.FormEvent) =>
                this.props.setURLOrProgramId(
                    (e.target as HTMLInputElement).value),
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
