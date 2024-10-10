/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import config from "../../config"

export const initiatePayment = async(paymentData:any) => {
    const response = await axios.post(config.payment_url!,{
        store_id: config.store_id,
        signature_key: config.signature_key,
        tran_id: paymentData?.transactionId,
        success_url: `${config.client_site_url}/api/payment/confirmation?email=${paymentData?.email}`,
        fail_url: `${config.client_site_url}/`,
        cancel_url: `${config.client_site_url}/`,
        amount: paymentData?.amount,
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: paymentData?.name,
        cus_email: paymentData?.email,
        cus_add1: paymentData?.address,
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: "N/A",
        cus_country: "N/A",
        cus_phone: paymentData?.phone,
        type: "json"
    })
    return response.data;
}
