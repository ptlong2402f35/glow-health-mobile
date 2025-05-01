import CustomerAddress from "../models/CustomerAddress";
import Transaction from "../models/Transaction";
import http from "./http";

export default class PaymentService {
    public static async getPaymentMethods() {
        const { data } = await http.get(
            `/payment/payment-method`
        );

        console.log("paymentMethod ===", data);

        return data;
    }

    public static async recharge() {
        const { data } = await http.post(
            `/payment/recharge`,
            {

            }
        );

        return data;
    }
}
