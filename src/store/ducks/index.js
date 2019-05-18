import { combineReducers } from "redux";

import timer from "./timer";
import timerList from "./timerList";

export default combineReducers({
    timer,
    timerList
});
