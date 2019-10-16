import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container, Title, Form } from "./styles";

class Login extends Component {
    state = {
        session: ""
    };

    handleInputChange = e => {
        this.setState({ session: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { session } = this.state;

        if (!session.length) return;

        localStorage.setItem("@InTime:username", session);

        this.props.history.push("/" + session);
    };

    render() {
        return (
            <Container secondaryColor={this.props.timer.secondaryColor}>
                <Title>
                    <h3>In Time</h3>
                </Title>

                <Form
                    primaryColor={this.props.timer.primaryColor}
                    onSubmit={this.handleSubmit}
                >
                    <label>Insira o nome da sessão</label>
                    <input
                        type="text"
                        value={this.state.session}
                        onChange={this.handleInputChange}
                    />
                </Form>
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
)(Login);
