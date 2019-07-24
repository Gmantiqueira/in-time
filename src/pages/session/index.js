import React, { Component } from "react";
import api from "../../services/api";
import io from "socket.io-client";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container } from "./styles";
import Timer from "../../components/Timer";
import User from "../../components/User";
import TimerList from "../../components/TimerList";
import Nav from "../../components/Nav";

class Session extends Component {
    state = {
        timerList: [],
        timer: [],
        paused: '',
        userProfileOpen: true
    };

    intervalID = 0

    infoGet = async e => {
        await api.get(
            "/session/" + this.props.location.pathname.split("/")[1]
        ).then(response => {
            this.props.setSession(response.data);
            this.props.updateStyle();
            if(response.data.isPaused){
                this.setState({paused: 'paused'});
            } else {
                this.setState({paused: ''});
            }
        });

    };

    openProfile = () => {
        this.setState({userProfileOpen: true})
    }

    closeProfile = () => {
        this.setState({userProfileOpen: false})
    }

    renderProfile = () => {
        var Profile = <User/>;
        console.log(Profile)
        if(!this.state.userProfileOpen){
            return Profile
        }
    }

    registerToSocket = () => {
        const socket = io("http://localhost:3000");

        socket.on("setTimer" , async (timer) => {
            await this.setState({ timer: timer });
        });

        socket.on("pauseTimer" , async (timer) => {
            var elem = document.getElementsByClassName('timer')

            this.setState({paused: 'paused'});

            if(elem[0]){
                elem[0].classList.add("paused");
            }

            await this.props.setSession(timer);
        });

        socket.on("resumeTimer" , async (timer) => {
            var elem = document.getElementsByClassName('timer')

            this.setState({paused: ''});

            if(elem[0]){
                elem[0].classList.remove("paused");
            }

            await this.props.setSession(timer);
        });

        socket.on("updateTimer" , async (timer) => {
            await this.props.setSession(timer);
        });

        socket.on("stopTimer" , async (timer) => {
            await this.props.setSession(timer);
        });
    };

    componentWillMount() {
        this.infoGet();
        this.registerToSocket()
    }

    handleStartTimer = async e => {
        e.persist()

        api.put(
            "/session/" + this.props.timer.session._id + "/set", {
                "totalTime": e.target.value
            }
        )

        this.infoGet()
    };

    render() {
        return this.props.timer.session.isRunning === false ? (
            <Container secondaryColor={this.props.timer.secondaryColor}>
                <TimerList
                    location={this.props.location}
                    startTimer={this.handleStartTimer}
                    timerList={this.props.timer.session}
                />
                <Nav openProfile={this.openProfile} closeProfile={this.closeProfile} location={this.props.location} />
                <User/>
            </Container>
        ) : (
            <Container>
                <Timer paused={this.state.paused} location={this.props.location} />
                <Nav openProfile={this.openProfile} closeProfile={this.closeProfile} location={this.props.location} />
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
