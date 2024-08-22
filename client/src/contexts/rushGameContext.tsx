import { ReactNode, createContext, useReducer } from "react";
import { CARD_COLOR, CARD_OPTION } from "@/constants/Rush/rushCard";
import {
    RUSH_ACTION,
    RushGameAction,
    RushGameDispatchType,
    RushGameStateType,
} from "@/types/rushGame";

export const RushGameStateContext = createContext<RushGameStateType | undefined>(undefined);
export const RushGameDispatchContext = createContext<RushGameDispatchType | undefined>(undefined);

const initialGameState: RushGameStateType = {
    phase: null,
    userParticipatedStatus: false,
    userSelectedOption: CARD_OPTION.LEFT_OPTIONS,
    cardOptions: {
        [CARD_OPTION.LEFT_OPTIONS]: {
            mainText: "",
            subText: "",
            resultMainText: "",
            resultSubText: "",
            color: CARD_COLOR.GREEN,
            selectionCount: 0,
        },
        [CARD_OPTION.RIGHT_OPTIONS]: {
            mainText: "",
            subText: "",
            resultMainText: "",
            resultSubText: "",
            color: CARD_COLOR.BLUE,
            selectionCount: 0,
        },
    },
};

const rushGameReducer = (state: RushGameStateType, action: RushGameAction): RushGameStateType => {
    switch (action.type) {
        case RUSH_ACTION.SET_PHASE:
            return { ...state, phase: action.payload };
        case RUSH_ACTION.SET_USER_PARTICIPATION:
            return { ...state, userParticipatedStatus: action.payload };
        case RUSH_ACTION.SET_USER_OPTION:
            return { ...state, userSelectedOption: action.payload };
        case RUSH_ACTION.SET_CARD_OPTIONS:
            return {
                ...state,
                cardOptions: {
                    ...state.cardOptions,
                    [action.payload.option]: {
                        ...state.cardOptions[action.payload.option],
                        ...action.payload.updates,
                    },
                },
            };
        default:
            return state;
    }
};

export const RushGameProvider = ({ children }: { children: ReactNode }) => {
    const [gameState, dispatch] = useReducer(rushGameReducer, initialGameState);

    return (
        <RushGameDispatchContext.Provider value={dispatch}>
            <RushGameStateContext.Provider value={gameState}>
                {children}
            </RushGameStateContext.Provider>
        </RushGameDispatchContext.Provider>
    );
};
