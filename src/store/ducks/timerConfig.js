export const Types = {
    CONFIG: "timer/CONFIG"
};

const INITIAL_STATE = {
    color: "",
    sessionName: "",
    orientation: "vertical"
};

export default function timer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.CONFIG:
            return {
                ...state,
                color: action.payload.color,
                sessionName: action.payload.sessionName,
                orientation: action.payload.orientation
            };
        default:
            return state;
    }
}

export const Creators = {
    config: ({ color, sessionName, orientation }) => ({
        type: Types.CONFIG,
        payload: { color, sessionName, orientation }
    })
};
