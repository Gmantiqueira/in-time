export const Types = {
    SESSION: "timer/SESSION",

    PRIMARY_COLOR: "timer/PRIMARY_COLOR",
    SECONDARY_COLOR: "timer/SECONDARY_COLOR",
    ORIENTATION: "timer/ORIENTATION",

    REMAINING: "timer/REMAINING",
    TOTAL: "timer/TOTAL",
    UPDATE_STYLE: "timer/UPDATE_STYLE"
};

const INITIAL_STATE = {
    totalTime: 0,
    timeRemaining: 0,

    aboveHalfTime: true,
    circleSection: null,
    barProgress: "100%",

    primaryColor: "#2463D0",
    secondaryColor: "hsl(217, 20%, 20%)",
    orientation: "circular",

    session: [],
};

export default function timer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.PRIMARY_COLOR:
            return {
                ...state,
                primaryColor: action.payload.primaryColor
            };
        case Types.SECONDARY_COLOR:
            return {
                ...state,
                secondaryColor: action.payload.secondaryColor
            };
        case Types.SESSION:
            return {
                ...state,
                session: action.payload.session,
            };
        case Types.ORIENTATION:
            return {
                ...state,
                orientation: action.payload.orientation
            };
        case Types.TOTAL:
            return{
                ...state,
                totalTime: action.payload.totalTime,
            }
        case Types.REMAINING:
            return{
                ...state,
                timeRemaining: action.payload.timeRemaining,
            }

        case Types.UPDATE_STYLE:
            let aboveHalfTime;
            let circleSection;
            if (state.timeRemaining >= state.totalTime / 2) {
                aboveHalfTime = true;
                circleSection =
                    90 - (180 / (state.totalTime / 2)) * state.timeRemaining;
            } else {
                aboveHalfTime = false;
                circleSection =
                    90 -
                    (180 / (state.totalTime / 2)) * state.timeRemaining -
                    180;
            }

            return {
                ...state,
                barProgress:
                    (100 * state.timeRemaining) / state.totalTime + "%",
                circleSection: circleSection,
                aboveHalfTime: aboveHalfTime
            };

        default:
            return state;
    }
}

export const Creators = {
    setSession: session => ({
        type: Types.SESSION,
        payload: { session }
    }),
    setTotal: totalTime => ({
        type: Types.TOTAL,
        payload: { totalTime }
    }),
    setRemaining: timeRemaining => ({
        type: Types.REMAINING,
        payload: { timeRemaining }
    }),
    changePrimary: primaryColor => ({
        type: Types.PRIMARY_COLOR,
        payload: { primaryColor }
    }),
    changeSecondary: secondaryColor => ({
        type: Types.SECONDARY_COLOR,
        payload: { secondaryColor }
    }),
    changeOrientation: orientation => ({
        type: Types.ORIENTATION,
        payload: { orientation }
    }),
    updateStyle: () => ({
        type: Types.UPDATE_STYLE
    }),
    updateTimeData: () => ({
        type: Types.UPDATE_DATA
    }),
};
