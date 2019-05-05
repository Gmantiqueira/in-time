export const Types = {
    ADD_TIMER: "timerList/ADD_TIMER"
};

const INITIAL_STATE = {
    data: [1, 3, 5, 10, 20]
};

export default function timers(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.ADD_TIMER:
            return {
                ...state,
                data: [...state.data, action.payload.data]
            };
        default:
            return state;
    }
}

/*
 * Actions
 */

export const Creators = {
    addTimer: data => ({
        type: Types.ADD_TIMER,
        payload: { data }
    })
};
