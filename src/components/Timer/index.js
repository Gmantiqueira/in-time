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

    // componentDidMount() {
    //     this.props.update();
    // }

    componentDidMount() {
        let timer = setInterval(() => {
            this.props.checkNow();
            this.props.update();
            this.props.updateStyle();
            this.props.is_Running();
            this.props.format();
        }, 1000);

        this.props.setTimer(timer);
    }

    componentWillUnmount() {
        clearInterval(this.props.timer.timer);
    }

    render() {
        return (
            <Container
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
