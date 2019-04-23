import React, { Component } from "react";

import { Container, Title, Form } from "./styles";

export default class Login extends Component {
    state = {
        username: ""
    };

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
            <Container>
                <Title>
                    <h3>In Time</h3>
                </Title>

                <Form onSubmit={this.handleSubmit}>
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
