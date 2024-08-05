import { ReactNode, createContext, useReducer } from "react";
import { CASPER_OPTION, CUSTOM_OPTION, OPTION_MAX_COUNT } from "@/constants/CasperCustom/casper";
import {
    CASPER_ACTION,
    CasperCustomAction,
    CasperCustomDispatchType,
    CasperCustomStateType,
} from "@/types/casperCustom";
import { getRandomInt } from "@/utils/getRandomInt";

export const CasperCustomStateContext = createContext<CasperCustomStateType | null>(null);
export const CasperCustomDispatchContext = createContext<CasperCustomDispatchType | null>(null);

const INITIAL_INDEX = 0;

const initialState: CasperCustomStateType = {
    selectedCasperIdx: {
        [CUSTOM_OPTION.EYES]: INITIAL_INDEX,
        [CUSTOM_OPTION.EYES_DIRECTION]: INITIAL_INDEX,
        [CUSTOM_OPTION.MOUTH]: INITIAL_INDEX,
        [CUSTOM_OPTION.COLOR]: INITIAL_INDEX,
        [CUSTOM_OPTION.STICKER]: null,
    },
    casperName: "",
    expectations: "",
};

const casperCustomReducer = (
    state: CasperCustomStateType,
    action: CasperCustomAction
): CasperCustomStateType => {
    switch (action.type) {
        case CASPER_ACTION.SET_CASPER_NAME:
            return { ...state, casperName: action.payload };
        case CASPER_ACTION.SET_EXPECTATIONS:
            return { ...state, expectations: action.payload };
        case CASPER_ACTION.SELECT_OPTION: {
            const { option, id } = action.payload;
            const selectedIdx = CASPER_OPTION[option].findIndex((opt) => opt.id === id);
            if (selectedIdx !== -1) {
                return {
                    ...state,
                    selectedCasperIdx: {
                        ...state.selectedCasperIdx,
                        [option]: selectedIdx,
                    },
                };
            }
            return state;
        }
        case CASPER_ACTION.SHUFFLE_CASPER:
            return {
                ...state,
                selectedCasperIdx: {
                    ...state.selectedCasperIdx,
                    [CUSTOM_OPTION.EYES]: getRandomInt(OPTION_MAX_COUNT[CUSTOM_OPTION.EYES]),
                    [CUSTOM_OPTION.EYES_DIRECTION]: getRandomInt(
                        OPTION_MAX_COUNT[CUSTOM_OPTION.EYES_DIRECTION]
                    ),
                    [CUSTOM_OPTION.MOUTH]: getRandomInt(OPTION_MAX_COUNT[CUSTOM_OPTION.MOUTH]),
                    [CUSTOM_OPTION.COLOR]: getRandomInt(OPTION_MAX_COUNT[CUSTOM_OPTION.COLOR]),
                },
            };
        case CASPER_ACTION.RESET_CUSTOM:
            return initialState;
        default:
            return state;
    }
};

export const CasperCustomProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(casperCustomReducer, initialState);

    return (
        <CasperCustomDispatchContext.Provider value={dispatch}>
            <CasperCustomStateContext.Provider value={state}>
                {children}
            </CasperCustomStateContext.Provider>
        </CasperCustomDispatchContext.Provider>
    );
};
