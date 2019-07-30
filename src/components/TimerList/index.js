import React, { Component } from "react";
import api from "../../services/api";
import io from "socket.io-client";

// import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Wrapper, TimerBtn, AddTimer, RemoveTimer } from "./styles";

class TimerList extends Component {
    state = {
        timerInput: "",
        timerList: [],
        valueDeleted: null
    };

    getTimerlist = async e => {
        const { data: timer } = await api.get(
            "/session/" + this.props.timer.session.sessionName
        );

        await this.setState({
            timerList: timer.timerList
        });
    };

    registerToSocket = () => {
        var apiUrl = 'https://in-time-api.herokuapp.com'

        const socket = io(apiUrl);

        socket.on("addTimer", timerList => {
            this.setState({ timerList: timerList });
        });


        socket.on("removeTimer", async (timerList) => {
            var previousTimerlist = this.state.timerList

            let value = previousTimerlist.filter(deleted => !timerList.includes(deleted));
            value = String(value[0])

            let timers = document.getElementsByClassName("timer-btn");

            for (let i = 0; i < timers.length; i++) {
                if (value === timers[i].value) {
                    timers[i].closest("div").classList.add("deleted");
                }
            }

            setTimeout(async e => {
                this.setState({ timerList: timerList });
            }, 600);
        });
    };

    componentWillMount() {
        this.registerToSocket();
        this.getTimerlist();
    }

    createTimer = async e => {
        e.preventDefault();

        await api.post(
            "/session/" +
                this.props.timer.session._id +
                "/timerlist/" +
                this.state.timerInput
        );

        this.setState({ timerInput: "" });
    };

    removeTimer = async e => {
        e.preventDefault();
        e.persist()

        this.setState({valueDeleted: e.target.value}) ;

        await api.delete(
            "/session/" + this.props.timer.session._id + "/timerlist/" + e.target.value
        );
    };

    render() {
        return (
            <Wrapper
                primaryColor={this.props.timer.primaryColor}
                secondaryColor={this.props.timer.secondaryColor}
                timerList={this.props.timerList}
            >
                {this.state.timerList.map(timer => (
                    <div key={timer}>
                        <div key={timer} className="relative">
                            <TimerBtn
                                className="timer-btn"
                                primaryColor={this.props.timer.primaryColor}
                                onClick={this.props.startTimer}
                                value={timer}
                            >
                                {timer}
                            </TimerBtn>

                            <RemoveTimer
                                className="remove-btn"
                                primaryColor={this.props.timer.primaryColor}
                                onClick={this.removeTimer}
                                value={timer}
                            >
                                DELETE
                            </RemoveTimer>
                        </div>
                    </div>
                ))}
                <form onSubmit={this.createTimer}>
                    <AddTimer
                        placeholder="+"
                        value={this.state.timerInput}
                        onChange={e =>
                            this.setState({ timerInput: e.target.value })
                        }
                        primaryColor={this.props.timer.primaryColor}
                    />
                </form>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => ({
    timerList: state.timerList,
    timer: state.timer
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(TimerActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerList);
