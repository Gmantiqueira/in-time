export const Types = {
    USER: "timer/USER"
};

const INITIAL_STATE = {
    user: '',
    email: '',
    gravatar: ''
};

export default function timer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.USER:
            return {
                ...state,
                user: action.payload.user
            };
        default:
            return state;
    }
}

export const Creators = {
    setUser: user => ({
        type: Types.USER,
        payload: { user }
    })
};
