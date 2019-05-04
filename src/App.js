import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import GlobalStyle from "./styles/global";

import { Container, Wrapper } from "./styles/components";

import store from "./store";
import Routes from "./routes";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Wrapper>
                        <GlobalStyle />
                        <Container>
                            <Routes />
                        </Container>
                    </Wrapper>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
