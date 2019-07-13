import { createStore, compose, applyMiddleware } from "redux";

import reducers from "./ducks";

const middlewares = [];

const store = createStore(reducers, compose(applyMiddleware(...middlewares)));

export default store;
