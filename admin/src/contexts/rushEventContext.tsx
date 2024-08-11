import { ReactNode, createContext, useReducer } from "react";
import {
    RUSH_ACTION,
    RushEventAction,
    RushEventDispatchType,
    RushEventStateType,
    RushPrizeType,
} from "@/types/rush";

export const RushEventStateContext = createContext<RushEventStateType | null>(null);
export const RushEventDispatchContext = createContext<RushEventDispatchType | null>(null);

const initialState: RushEventStateType = {
    rushList: [],
    selectOptions: [],
    prize: {} as RushPrizeType,
};

const casperCustomReducer = (
    state: RushEventStateType,
    action: RushEventAction
): RushEventStateType => {
    switch (action.type) {
        case RUSH_ACTION.SET_EVENT_LIST:
            return { ...state, rushList: action.payload };
        case RUSH_ACTION.SET_OPTION:
            return { ...state, selectOptions: action.payload };
        case RUSH_ACTION.SET_PRIZE:
            return { ...state, prize: action.payload };
        default:
            return state;
    }
};

export const RushEventContext = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(casperCustomReducer, initialState);

    return (
        <RushEventDispatchContext.Provider value={dispatch}>
            <RushEventStateContext.Provider value={state}>
                {children}
            </RushEventStateContext.Provider>
        </RushEventDispatchContext.Provider>
    );
};
