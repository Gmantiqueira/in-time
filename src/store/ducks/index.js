import { combineReducers } from "redux";

import style from "./style";
import timer from "./timer";
import timerList from "./timerList";

export default combineReducers({
    style,
    timer,
    timerList
});
