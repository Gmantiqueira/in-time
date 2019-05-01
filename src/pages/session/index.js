import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container } from "./styles";
import Timer from "../../components/Timer";
import TimerList from "../../components/TimerList";
import Nav from "../../components/Nav";

class Session extends Component {
    static propTypes = {};

    state = {
        currentTime: null,
        totalTime: 0,
        aboveHalfTime: true,
        isRunning: false,
        circleSection: null,
        barProgress: 100,
        orientation: "vertical"
    };

    handleStartTimer = e => {
        let time = e.target.value * 60;
        let totalTime = e.target.value * 60;
        this.setState({ totalTime: e.target.value * 60 });
        this.props.setTotalTime(e.target.value * 60);

        this.props.setTimer(
            setInterval(() => {
                time--;

                let aboveHalfTime;

                this.setState({ isRunning: true });
                this.props.is_Running(this.state.isRunning);

                if (this.state.orientation === "circular") {
                    let circleSection;
                    if (time >= totalTime / 2) {
                        aboveHalfTime = true;
                        circleSection = 90 - (180 / (totalTime / 2)) * time;
                    } else {
                        aboveHalfTime = false;
                        circleSection =
                            90 - (180 / (totalTime / 2)) * time - 180;
                    }
                    this.setState({
                        circleSection: circleSection,
                        aboveHalfTime: aboveHalfTime
                    });
                    this.props.isAboveHalf(this.state.aboveHalfTime);
                    this.props.setCircleStyle(this.state.circleSection);
                }

                if (this.state.orientation === "vertical") {
                    let barProgress;
                    barProgress = (100 * time) / totalTime + "%";
                    this.setState({
                        barProgress: barProgress
                    });
                    this.props.setBarStyle(this.state.barProgress);
                }

                let minutes = Math.floor((time % (60 * 60)) / 60);
                let seconds = Math.floor(time % 60);

                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                let format = minutes + ":" + seconds;

                this.setState({
                    currentTime: format
                });
                this.props.setCurrentTime(this.state.currentTime);

                if (time === 0) {
                    format = "0:00";
                    clearInterval(this);
                    this.setState({ isRunning: false });
                }
            }, 1000)
        );
    };

    render() {
        return this.state.isRunning === false ? (
            <Container>
                <TimerList startTimer={this.handleStartTimer} />
                <Nav />
            </Container>
        ) : (
            <Container>
                <Timer />
                <Nav />
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
