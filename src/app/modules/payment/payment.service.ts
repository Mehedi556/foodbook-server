/* eslint-disable @typescript-eslint/no-explicit-any */



import { User } from "../Auth/auth.model";
import { initiatePayment } from "./payment.utils";

const currentDate = new Date();

const initiatePaymentData = async (data:any) => {
    const result = await initiatePayment(data)
    return result;
}

const confirmationService = async (email:string) => {
    const result = await User.findOneAndUpdate({ email }, {
        memberStatus: {
            status: "premium",
            expiresIn: new Date(currentDate.setDate(currentDate.getDate() + 30))
        }
    })

    return result;
}

export const paymentServices = {
    initiatePaymentData,
    confirmationService
}