export const Types = {
    SESSION: "timer/SESSION",

    CHECK_RUNNING: "timer/CHECK_RUNNING",
    RESUME_TIMER: "timer/RESUME_TIMER",
    PAUSE_TIMER: "timer/PAUSE_TIMER",
    CHECK_NOW: "timer/CHECK_NOW",
    TOTAL: "timer/TOTAL",
    PRIMARY_COLOR: "timer/PRIMARY_COLOR",
    SECONDARY_COLOR: "timer/SECONDARY_COLOR",
    ORIENTATION: "timer/ORIENTATION",

    ENDLINE: "timer/ENDLINE",
    FORMAT: "timer/FORMAT",
    UPDATE: "timer/UPDATE",
    UPDATE_STYLE: "timer/UPDATE_STYLE"
};

const INITIAL_STATE = {
    isRunning: false,
    isPaused: false,
    now: "",
    endline: "",
    timeRemaining: 0,
    timeDelay: 0,
    totalTime: 0,
    timeFormated: "",

    aboveHalfTime: true,
    circleSection: null,
    barProgress: "100%",

    primaryColor: "#2463D0",
    secondaryColor: "hsl(217, 20%, 20%)",

    sessionName: "",
    orientation: "vertical"
};

export default function timer(state = INITIAL_STATE, action) {
    switch (action.type) {
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
        case Types.PAUSE_TIMER:
            return {
                ...state,
                isPaused: true
            };
        case Types.RESUME_TIMER:
            return {
                ...state,
                isPaused: false
            };
        case Types.UPDATE:
            console.log(state.endline, state.now);
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
    setSession: sessionName => ({
        type: Types.SESSION,
        payload: { sessionName }
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
    }),
    pauseTimer: () => ({
        type: Types.PAUSE_TIMER
    }),
    resumeTimer: () => ({
        type: Types.RESUME_TIMER
    })
};
