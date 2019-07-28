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
        timeFormated: ''
    };

    intervalID = 0

    registerToSocket = () => {
        const socket = io("http://localhost:3000");

        socket.on("resumeTimer" , (timer) => {
            this.startTimer();
        });
        socket.on("stopTimer" , (timer) => {
            clearInterval(this.intervalID)
            for (var i = 1; i < this.intervalID; i++){
                window.clearInterval(i);
            }
        });
    };

    componentWillMount() {
        this.registerToSocket()
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
        for (var i = 1; i < this.intervalID; i++){
            window.clearInterval(i);
        }
    }

    startTimer = async e => {

        this.intervalID = await window.setInterval(async e => {
            moment.locale('pt-BR')

            var endline = moment(this.props.timer.session.endline);
            var difference = moment(endline).diff(moment.utc().local().format())
            var timeRemaining = Math.floor(difference / 1000)

            this.props.setTotal(this.props.timer.session.totalTime * 60);
            this.props.setRemaining(timeRemaining);
            this.props.updateStyle();

            let time = timeRemaining;

            let minutes = Math.floor((time % (60 * 60)) / 60);
            let seconds = Math.floor(time % 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            let format = minutes + ":" + seconds;

            if(time === 0){
                format = ''
            }

            console.log(this.props.timer.session.endline)

            this.setState({timeFormated: format})

            if(time <= 0){
                await api.put(
                    "/session/" + this.props.timer.session._id + "/stop",
                );
                clearInterval(this.intervalID);
                for (let i = 1; i < this.intervalID; i++){
                    window.clearInterval(i);
                }
            }

            if(this.props.timer.session.isPaused || !this.props.timer.session.isRunning){
                clearInterval(this.intervalID)
                for (let i = 1; i < this.intervalID; i++){
                    window.clearInterval(i);
                }
            }
        }, 100);
    };

    pauseResumeTimer = async e => {
        e.preventDefault();

        var elem = document.getElementsByClassName('timer')

        if (this.props.timer.session.isPaused === false) {
            await api.put(
                "/session/" +
                    this.props.timer.session._id +
                    "/pause"
            );
            if(elem[0]){
                elem[0].classList.add("paused");
            }
        } else {
            await api.put(
                "/session/" +
                    this.props.timer.session._id +
                    "/resume"
            );
            if(elem[0]){
                elem[0].classList.remove("paused");
            }

            this.startTimer();
        }
    };

    stopTimer = async e => {
        e.preventDefault();
        e.persist();

        clearInterval(this.intervalID)
        for (var i = 1; i < this.intervalID; i++){
            window.clearInterval(i);
        }

        await api.put(
            "/session/" + this.props.timer.session._id + "/stop",
        );
    };

    render() {
        return (
            <Container
                className={'timer ' + this.props.paused}
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
