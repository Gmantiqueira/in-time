export const Types = {
    ADD_TIMER: "timerList/ADD_TIMER"
};

const INITIAL_STATE = {
    data: [
        { value: 1 },
        { value: 3 },
        { value: 5 },
        { value: 10 },
        { value: 20 }
    ]
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
    addTimer: timer => ({
        type: Types.ADD_TIMER,
        payload: { timer }
    })
};
