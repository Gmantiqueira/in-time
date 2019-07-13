import React, { Component } from "react";
import api from "../../services/api";
import io from "socket.io-client";
import moment from 'moment'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container } from "./styles";

class Timer extends Component {
    state = {
        timer: [],
        timeFormated: '',
    };

    intervalID = 0

    registerToSocket = () => {
        const socket = io("http://localhost:3000");

        socket.on("resumeTimer" , (timer) => {
            this.startTimer();
        });
        socket.on("stopTimer" , (timer) => {
            clearInterval(this.intervalID)
        });
    };

    componentDidMount() {
        this.registerToSocket()
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    startTimer = () => {
        this.intervalID = setInterval(async e => {
            if (this.props.timerInfo.isPaused || !this.props.timerInfo.isRunning) {
                clearInterval(this.intervalID);
            } else {
                var endline = moment(this.props.timerInfo.endline);

                var difference = moment(endline).diff(moment.utc().local().format())

                var timeRemaining = Math.floor(difference / 1000)

                this.props.setTotal(this.props.timerInfo.totalTime * 60);
                this.props.setRemaining(timeRemaining);
                this.props.updateStyle();

                let time = timeRemaining;

                let minutes = Math.floor((time % (60 * 60)) / 60);
                let seconds = Math.floor(time % 60);

                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                let format = minutes + ":" + seconds;

                this.setState({timeFormated: format})

                if(time <= 0){
                    await api.put(
                        "/session/" + this.props.timer.sessionID + "/update",
                    );
                    await clearInterval(this.intervalID);
                }
            }
        }, 100);
    };

    pauseResumeTimer = async e => {
        e.preventDefault();
        if (!this.props.timerInfo.isPaused) {
            await api.put(
                "/session/" +
                    this.props.timer.sessionID +
                    "/pause"
            );
        } else {
            await api.put(
                "/session/" +
                    this.props.timer.sessionID +
                    "/resume"
            );

            this.startTimer();
        }
    };

    stopTimer = e => {
        e.preventDefault();

        // this.props.setTotalTime(0);
        // this.props.setEndline(Date.now);

        // this.props.is_Running();
        this.setState({timeRemaining: Math.round((this.props.timer.endline - Date.now) / 1000)})
        this.props.updateStyle();
        clearInterval(this.props.timer.timer);
    };

    render() {
        return (
            <Container
                className="timer"
                onClick={this.pauseResumeTimer}
                circleSection={this.props.timer.circleSection}
                barProgress={this.props.timer.barProgress}
                aboveHalfTime={this.props.timer.aboveHalfTime}
                orientation={this.props.timer.orientation}
                primaryColor={this.props.timer.primaryColor}
                secondaryColor={this.props.timer.secondaryColor}
            >
                <div>
                    <span> {this.state.timeFormated} </span>
                    <div>
                        <button onClick={this.pauseResumeTimer}>
                            {" "}
                            RESUME{" "}
                        </button>
                        <button onClick={this.stopTimer}> STOP </button>
                    </div>
                </div>
                <div className={this.props.timer.orientation} />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    timer: state.timer
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(TimerActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timer);
