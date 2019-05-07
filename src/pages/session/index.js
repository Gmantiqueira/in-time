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
