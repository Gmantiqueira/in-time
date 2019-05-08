import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TimerActions } from "../../store/ducks/timer";

import { Container, Title, Form } from "./styles";

class Login extends Component {

    state = {
        username: ''
    }

    handleInputChange = e => {
        this.setState({ username: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const { username } = this.state;

        if (!username.length) return;

        localStorage.setItem("@InTime:username", username);

        this.props.history.push("/session");
    };

    render() {
        return (
            <Container secondaryColor={this.props.timer.secondaryColor}>
                <Title>
                    <h3>In Time</h3>
                </Title>

                <Form primaryColor={this.props.timer.primaryColor} onSubmit={this.handleSubmit}>
                    <label>Insira seu nome de usuário</label>
                    <input
                        type="text"
                        value={this.state.username}
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
