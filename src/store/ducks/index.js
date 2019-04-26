import { combineReducers } from "redux";

import timer from "./timer";
import timerConfig from "./timerConfig";

export default combineReducers({
    timer,
    timerConfig
});
