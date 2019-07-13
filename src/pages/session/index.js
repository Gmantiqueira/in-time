import React, { Component } from "react";
import api from "../../services/api";
import io from "socket.io-client";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container } from "./styles";
import Timer from "../../components/Timer";
import TimerList from "../../components/TimerList";
import Nav from "../../components/Nav";

class Session extends Component {
    state = {
        timer: [],
        timerList: []
    };

    intervalID = 0

    infoGet = async e => {
        await this.props.setSession(this.props.location.pathname.split("/")[1]);

        const { data: timer } = await api.get(
            "/session/" + this.props.timer.sessionName
        );

        await this.props.setSessionID(timer._id);

        if(timer.isPaused){
            await api.put(
                "/session/" +
                    this.props.timer.sessionID +
                    "/resume"
            );
        }

        await this.setState({
            timer: timer
        });

    };

    registerToSocket = () => {
        const socket = io("http://localhost:3000");

        socket.on("setTimer" , async (timer) => {
            await this.setState({ timer: timer });
        });

        socket.on("pauseTimer" , async (timer) => {
            var elem = document.getElementsByClassName('timer')
            await this.setState({ timer: timer });
            if(elem[0]){
                elem[0].classList.add("paused");
            }
        });

        socket.on("resumeTimer" , async (timer) => {
            var elem = document.getElementsByClassName('timer')
            await this.setState({ timer: timer });
            if(elem[0]){
                elem[0].classList.remove("paused");
            }
        });

        socket.on("updateTimer" , async (timer) => {
            this.setState({ timer: timer });
        });

        socket.on("stopTimer" , async (timer) => {
            this.setState({ timer: timer });
        });
    };

    componentWillMount() {
        this.registerToSocket()
        this.infoGet();
    }

    handleStartTimer = async e => {
        e.persist()

        await api.put(
            "/session/" + this.props.timer.sessionID + "/set", {
                "totalTime": e.target.value
            }
        );

        this.props.updateStyle();
    };

    render() {
        return this.state.timer.isRunning === false ? (
            <Container secondaryColor={this.props.timer.secondaryColor}>
                <TimerList
                    location={this.props.location}
                    startTimer={this.handleStartTimer}
                    timerList={this.state.timer}
                />
                <Nav location={this.props.location} />
            </Container>
        ) : (
            <Container>
                <Timer location={this.props.location} timerInfo={this.state.timer} />
                <Nav location={this.props.location} />
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
)(Session);
