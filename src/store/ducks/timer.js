export const Types = {
    SET_TIMER: "timer/SET_TIMER",
    CHECK_RUNNING: "timer/CHECK_RUNNING",
    CHECK_NOW: "timer/CHECK_NOW",
    TOTAL: "timer/TOTAL",
    PRIMARY_COLOR: "timer/PRIMARY_COLOR",
    SECONDARY_COLOR: "timer/SECONDARY_COLOR",
    SESSION: "timer/SESSION",
    ORIENTATION: "timer/ORIENTATION",

    // teste

    ENDLINE: "timer/ENDLINE",
    FORMAT: "timer/FORMAT",
    UPDATE: "timer/UPDATE",
    UPDATE_STYLE: "timer/UPDATE_STYLE"
};

const INITIAL_STATE = {
    isRunning: false,
    now: "",
    endline: "",
    timeRemaining: 0,
    totalTime: 0,
    timeFormated: "",

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
        // case Types.RUNNING:
        //     return {
        //         ...state,
        //         isRunning: action.payload.isRunning
        //     };
        case Types.TOTAL:
            return {
                ...state,
                totalTime: action.payload.totalTime
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
        case Types.ENDLINE:
            return {
                ...state,
                endline: action.payload.endline
            };
        case Types.FORMAT:
            let time = state.timeRemaining;

            let minutes = Math.floor((time % (60 * 60)) / 60);
            let seconds = Math.floor(time % 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            let format = minutes + ":" + seconds;

            if (time === 0) {
                clearInterval(state.timer);
            }

            return {
                ...state,
                timeFormated: format
            };
        case Types.CHECK_NOW:
            return {
                ...state,
                now: Date.now()
            };
        case Types.CHECK_RUNNING:
            return {
                ...state,
                isRunning: state.timeRemaining > 0 ? true : false
            };
        case Types.UPDATE:
            return {
                ...state,
                timeRemaining: Math.round((state.endline - state.now) / 1000)
            };

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
    setTimer: timer => ({
        type: Types.SET_TIMER,
        payload: { timer }
    }),
    is_Running: () => ({
        type: Types.CHECK_RUNNING
    }),
    setTotalTime: totalTime => ({
        type: Types.TOTAL,
        payload: { totalTime }
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
    }),
    setEndline: endline => ({
        type: Types.ENDLINE,
        payload: { endline }
    }),
    checkNow: () => ({
        type: Types.CHECK_NOW
    }),
    format: () => ({
        type: Types.FORMAT
    }),
    updateStyle: () => ({
        type: Types.UPDATE_STYLE
    }),
    update: () => ({
        type: Types.UPDATE
    })
};
