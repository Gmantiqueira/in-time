export const Types = {
    SET_TIMER: "timer/SET_TIMER",
    SET_CURRENT: "timer/SET_CURRENT",
    RUNNING: "timer/RUNNING",
    TOTAL: "timer/TOTAL",
    ABOVE_HALF: "timer/ABOVE_HALF",
    CIRCLE_STYLE: "timer/CIRCLE_STYLE",
    BAR_STYLE: "timer/BAR_STYLE",
    PRIMARY_COLOR: "timer/PRIMARY_COLOR",
    SECONDARY_COLOR: "timer/SECONDARY_COLOR",
    SESSION: "timer/SESSION",
    ORIENTATION: "timer/ORIENTATION"
};

const INITIAL_STATE = {
    currentTime: null,
    isRunning: false,
    totalTime: 0,
    aboveHalfTime: true,
    circleSection: null,
    barProgress: "100%",
    primaryColor: "#f71963",
    secondaryColor: "hsl(340, 20%, 20%)",
    sessionName: "",
    orientation: "vertical"
};

export default function timer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.SET_TIMER:
            return {
                ...state,
                timer: action.payload.timer
            };
        case Types.SET_CURRENT:
            return {
                ...state,
                currentTime: action.payload.currentTime
            };
        case Types.RUNNING:
            return {
                ...state,
                isRunning: action.payload.isRunning
            };
        case Types.TOTAL:
            return {
                ...state,
                totalTime: action.payload.totalTime
            };
        case Types.ABOVE_HALF:
            return {
                ...state,
                aboveHalfTime: action.payload.aboveHalfTime
            };
        case Types.CIRCLE_STYLE:
            return {
                ...state,
                circleSection: action.payload.circleSection
            };
        case Types.BAR_STYLE:
            return {
                ...state,
                barProgress: action.payload.barProgress
            };

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
                sessionName: action.payload.sessionName
            };
        case Types.ORIENTATION:
            return {
                ...state,
                orientation: action.payload.orientation
            };
        default:
            return state;
    }
}

export const Creators = {
    setTimer: timer => ({
        type: Types.SET_TIMER,
        payload: { timer }
    }),
    setCurrentTime: currentTime => ({
        type: Types.SET_CURRENT,
        payload: { currentTime }
    }),
    is_Running: isRunning => ({
        type: Types.RUNNING,
        payload: { isRunning }
    }),
    setTotalTime: totalTime => ({
        type: Types.TOTAL,
        payload: { totalTime }
    }),
    isAboveHalf: aboveHalfTime => ({
        type: Types.ABOVE_HALF,
        payload: { aboveHalfTime }
    }),
    setCircleStyle: circleSection => ({
        type: Types.CIRCLE_STYLE,
        payload: { circleSection }
    }),
    setBarStyle: barProgress => ({
        type: Types.BAR_STYLE,
        payload: { barProgress }
    }),
    changePrimary: primaryColor => ({
        type: Types.PRIMARY_COLOR,
        payload: { primaryColor }
    }),
    changeSecondary: secondaryColor => ({
        type: Types.SECONDARY_COLOR,
        payload: { secondaryColor }
    }),
    changeSession: sessionName => ({
        type: Types.SESSION,
        payload: { sessionName }
    }),
    changeOrientation: orientation => ({
        type: Types.ORIENTATION,
        payload: { orientation }
    })
};
