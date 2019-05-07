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

    render() {
        return (
            <Container
                circleSection={this.props.timer.circleSection}
                isRunning={this.props.timer.isRunning}
                barProgress={this.props.timer.barProgress}
                aboveHalfTime={this.props.timer.aboveHalfTime}
                currentTime={this.props.timer.currentTime}
                totalTime={this.props.timer.totalTime}
                orientation={this.props.timer.orientation}
            >
                <span>{this.props.timer.currentTimeFormated}</span>
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
