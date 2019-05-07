import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container } from "./styles";
import Timer from "../../components/Timer";
import TimerList from "../../components/TimerList";
import Nav from "../../components/Nav";

class Session extends Component {
    static propTypes = {
        timer: PropTypes.shape({
            currentTime: PropTypes.number,
            currentTimeFormated: PropTypes.string,
            isRunning: PropTypes.bool,
            totalTime: PropTypes.number,
            aboveHalfTime: PropTypes.bool,
            circleSection: PropTypes.number,
            barProgress: PropTypes.string
        }).isRequired
    };

    handleStartTimer = e => {
        this.props.is_Running(true);

        this.props.setTotalTime(e.target.value * 60);
        this.props.setCurrentTime(e.target.value * 60);

        this.props.setTimer(
            setInterval(() => {
                let time = this.props.timer.currentTime;
                let totalTime = this.props.timer.totalTime;
                this.props.decreaseTimer();

                let aboveHalfTime;

                if (this.props.timer.orientation === "circular") {
                    let circleSection;
                    if (time >= totalTime / 2) {
                        aboveHalfTime = true;
                        circleSection = 90 - (180 / (totalTime / 2)) * time;
                    } else {
                        aboveHalfTime = false;
                        circleSection =
                            90 - (180 / (totalTime / 2)) * time - 180;
                    }

                    console.log(circleSection);

                    this.props.isAboveHalf(aboveHalfTime);
                    this.props.setCircleStyle(circleSection);
                }

                if (this.props.timer.orientation === "vertical") {
                    let barProgress = (100 * time) / totalTime + "%";
                    this.props.setBarStyle(barProgress);
                }

                let minutes = Math.floor((time % (60 * 60)) / 60);
                let seconds = Math.floor(time % 60);

                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                let format = minutes + ":" + seconds;

                this.props.setCurrentTimeFormated(format);

                if (time === 0) {
                    format = "0:00";
                    clearInterval(this.props.timer.timer);
                    this.props.is_Running(false);
                }
            }, 1000)
        );
    };

    render() {
        return this.props.timer.isRunning === false ? (
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
