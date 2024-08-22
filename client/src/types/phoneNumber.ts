import { Dispatch } from "react";

export interface PhoneNumberStateType {
    phoneNumber: string;
}

export const enum PHONE_NUMBER_ACTION {
    SET_PHONE_NUMBER = "SET_PHONE_NUMBER",
}

export type PhoneNumberAction = {
    type: PHONE_NUMBER_ACTION.SET_PHONE_NUMBER;
    payload: string;
};

export type PhoneNumberDispatchType = Dispatch<PhoneNumberAction>;
