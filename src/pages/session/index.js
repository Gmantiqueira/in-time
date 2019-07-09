import React, { Component } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container } from "./styles";
import Timer from "../../components/Timer";
import TimerList from "../../components/TimerList";
import Nav from "../../components/Nav";

class Session extends Component {
    state = {
        timer: ""
    };

    infoGet = async e => {
        await this.props.setSession(this.props.location.pathname.split("/")[1]);

        const { data: timer } = await api.get(
            "/session/" + this.props.timer.sessionName
        );

        this.setState({
            timer: timer
        });
    };

    componentDidMount() {
        this.infoGet();
    }

    handleStartTimer = e => {
        let end = new Date();
        end.setMinutes(end.getMinutes() + Number(e.target.value));

        let endline = end;

        this.props.setTotalTime(e.target.value * 60);
        this.props.setEndline(endline);

        this.props.resumeTimer();
        this.props.checkNow();
        this.props.update();
        this.props.updateStyle();
        this.props.is_Running();
        this.props.format();
    };

    render() {
        return this.props.timer.isRunning === false ? (
            <Container secondaryColor={this.props.timer.secondaryColor}>
                <TimerList
                    location={this.props.location}
                    startTimer={this.handleStartTimer}
                />
                <Nav location={this.props.location} />
            </Container>
        ) : (
            <Container>
                <Timer timer={this.state.timer} />
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
