import { Dispatch } from "react";

export interface PhoneNumberStateType {
    phoneNumber: string;
}

export const PHONE_NUMBER_ACTION = {
    SET_PHONE_NUMBER: "SET_PHONE_NUMBER",
} as const;

export type PhoneNumberAction = {
    type: typeof PHONE_NUMBER_ACTION.SET_PHONE_NUMBER;
    payload: string;
};

export type PhoneNumberDispatchType = Dispatch<PhoneNumberAction>;
