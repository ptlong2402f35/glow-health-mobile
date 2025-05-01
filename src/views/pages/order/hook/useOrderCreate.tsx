import { useState } from "react";
import PaymentService from "../../../../services/paymentService";

export default function useOrderCreate() {
    const [paymentMethods, setPaymentMethods] = useState(1);

    const getPaymentMethod = async () => {
        try {
            let methods = await PaymentService.getPaymentMethods();

            setPaymentMethods(methods);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("message", message);
        }
    };

    return {
        paymentMethods,
        getPaymentMethod
    }
}
