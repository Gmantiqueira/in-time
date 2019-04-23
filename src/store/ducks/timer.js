export const Types = {
    START: "timer/START",
    PAUSE: "timer/PAUSE"
};

const INITIAL_STATE = {
    currentTime: null,
    isRunning: false
};

export default function timer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.START:
            return {
                ...state,
                currentTime: action.payload.currentTime,
                isRunning: true
            };
        case Types.PAUSE:
            return {
                ...state,
                currentTime: action.payload.currentTime,
                isRunning: false
            };
        default:
            return state;
    }
}

export const Creators = {
    start: ({ currentTime, isRunning }) => ({
        type: Types.PLAY,
        payload: { currentTime, isRunning }
    }),

    pause: ({ currentTime, isRunning }) => ({
        type: Types.PAUSE,
        payload: { currentTime, isRunning }
    })
};
