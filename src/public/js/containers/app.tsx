import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Root from "../components/root.tsx";
import FreshWatcher from "../models/freshwatcher.ts";
import TwitchWatcher from "../models/twitchwatcher.ts";
import action from "../action.ts";
import { State } from "../reducer.ts";

type Props = State & typeof action;

class App extends React.Component<Props, {}> {
    componentWillMount() {
        this.props.init();
    }

    render() {
        let fresh = this.props.fresh;
        let freshEnable = fresh.workingProgramId >= 0;
        let freshProps = {
            enable: freshEnable,
            urlOrProgramId: fresh.urlOrProgramId,
            updateVisible: (
                freshEnable
                && (fresh.workingProgramId
                    !== FreshWatcher.parseURLOrProgramId(fresh.urlOrProgramId))
            ),
            onURLOrProgramIdChange: (e: React.FormEvent) =>
                this.props.setFreshURLOrProgramId(
                    (e.target as HTMLInputElement).value),
            onUpdateClick: (e: React.MouseEvent) =>
                this.props.startFresh(),
            onEnableClick: (e: React.MouseEvent) =>
                this.props.startFresh(),
            onDisableClick: (e: React.MouseEvent) =>
                this.props.stopFresh()
        };
        let twitch = this.props.twitch;
        let twitchEnable = twitch.workingChannel.length > 0;
        let twitchProps = {
            enable: twitchEnable,
            urlOrChannel: twitch.urlOrChannel,
            updateVisible: (
                twitchEnable
                && (twitch.workingChannel
                    !== TwitchWatcher.parseURLOrChannel(twitch.urlOrChannel))
            ),
            onURLOrChannelChange: (e: React.FormEvent) =>
                this.props.setTwitchURLOrChannel(
                    (e.target as HTMLInputElement).value),
            onUpdateClick: (e: React.MouseEvent) =>
                this.props.startTwitch(),
            onEnableClick: (e: React.MouseEvent) =>
                this.props.startTwitch(),
            onDisableClick: (e: React.MouseEvent) =>
                this.props.stopTwitch()
        };
        return (
            <Root fresh={freshProps} twitch={twitchProps}/>
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
