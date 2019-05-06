export const Types = {
    ADD_TIMER: "timerList/ADD_TIMER",
    REMOVE_TIMER: "timerList/REMOVE_TIMER"
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
        case Types.REMOVE_TIMER:
            let index = state.data.indexOf(action.payload.data);

            if (index !== -1) {
                state.data.splice(index, 1);
            }

            console.log(state.data);

            return {
                ...state,
                data: state.data
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
    }),
    removeTimer: data => ({
        type: Types.REMOVE_TIMER,
        payload: { data }
    })
};
