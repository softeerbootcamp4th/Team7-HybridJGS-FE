import { ReactNode, createContext, useReducer } from "react";
import {
    PHONE_NUMBER_ACTION,
    PhoneNumberAction,
    PhoneNumberDispatchType,
    PhoneNumberStateType,
} from "@/types/phoneNumber";

export const PhoneNumberStateContext = createContext<PhoneNumberStateType | null>(null);
export const PhoneNumberDispatchContext = createContext<PhoneNumberDispatchType | null>(null);

const initialState: PhoneNumberStateType = {
    phoneNumber: "",
};

const phoneNumberReducer = (
    state: PhoneNumberStateType,
    action: PhoneNumberAction
): PhoneNumberStateType => {
    switch (action.type) {
        case PHONE_NUMBER_ACTION.SET_PHONE_NUMBER:
            return { ...state, phoneNumber: action.payload };
        default:
            return state;
    }
};

export const PhoneNumberProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(phoneNumberReducer, initialState);

    return (
        <PhoneNumberDispatchContext.Provider value={dispatch}>
            <PhoneNumberStateContext.Provider value={state}>
                {children}
            </PhoneNumberStateContext.Provider>
        </PhoneNumberDispatchContext.Provider>
    );
};
