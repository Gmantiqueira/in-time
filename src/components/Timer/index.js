import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container } from "./styles";

class Timer extends Component {
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

    state = {
        delay: 1
    };

    componentDidMount() {
        this.setState({ paused: false });
        this.startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.props.timer.timer);
    }

    startTimer = () => {
        let timer = setInterval(() => {
            if (this.props.timer.isPaused === true) {
                clearInterval(timer);
            } else {
                this.props.checkNow();
                this.props.update();
                this.props.updateStyle();
                this.props.is_Running();
                this.props.format();
            }
        }, 1000);

        this.props.setTimer(timer);
    };

    pauseTimer = () => {
        if (this.props.timer.isPaused === false) {
            this.props.pauseTimer();
        } else {
            this.props.resumeTimer();
            this.startTimer();
            this.setState({ delay: 1 });
        }

        var delay = this.state.delay;

        let pauseDelay = setInterval(() => {
            if (this.props.timer.isPaused === false) {
                clearInterval(pauseDelay);
            } else {
                delay++;
                this.setState({ delay: delay });
            }
        }, 1000);

        let endline = this.props.timer.endline;
        console.log("");
        console.log("delay:" + this.state.delay);
        console.log("segundos do fim:" + endline.getSeconds());
        console.log("fim:" + endline);
        console.log("agora:" + Date());
        endline.setSeconds(endline.getSeconds() + this.state.delay);
        this.props.setEndline(endline);
        console.log(endline);

        let wrapper = document.getElementsByClassName("wrapper");
        wrapper[0].classList.add("paused");
    };

    render() {
        return (
            <Container
                className="wrapper"
                onClick={this.pauseTimer}
                circleSection={this.props.timer.circleSection}
                barProgress={this.props.timer.barProgress}
                aboveHalfTime={this.props.timer.aboveHalfTime}
                orientation={this.props.timer.orientation}
                primaryColor={this.props.timer.primaryColor}
                secondaryColor={this.props.timer.secondaryColor}
            >
                <span>{this.props.timer.timeFormated}</span>
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
