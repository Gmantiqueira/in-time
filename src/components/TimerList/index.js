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
        timerList: []
    };

    getTimerList = async e => {
        await this.props.setSession(this.props.location.pathname.split("/")[1]);

        const { data: timer } = await api.get(
            "/session/" + this.props.timer.sessionName
        );

        await this.props.setSessionID(timer._id);

        await this.setState({
            timerList: timer.timerList
        });
    };

    componentDidMount() {
        this.registerToSocket();
        this.getTimerList();
    }

    registerToSocket = () => {
        const socket = io("http://localhost:3000");

        socket.on("addTimer", timer => {
            this.setState({ timerList: timer.timerList });
        });

        socket.on("removeTimer", timer => {
            this.setState({ timerList: timer.timerList });
        });
    };

    createTimer = async e => {
        e.preventDefault();

        await api.post(
            "/session/" +
                this.props.timer.sessionID +
                "/timerlist/" +
                this.state.timerInput
        );

        this.setState({ timerInput: "" });
    };

    removeTimer = e => {
        e.preventDefault();

        let value = e.target.value;
        let timers = document.getElementsByClassName("timer-btn");
        for (let i = 0; i < timers.length; i++) {
            if (value === timers[i].value) {
                timers[i].closest("div").classList.add("deleted");
            }
        }

        setTimeout(async e => {
            await api.delete(
                "/session/" + this.props.timer.sessionID + "/timerlist/" + value
            );
        }, 600);
    };

    render() {
        return (
            <Wrapper
                primaryColor={this.props.timer.primaryColor}
                secondaryColor={this.props.timer.secondaryColor}
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
