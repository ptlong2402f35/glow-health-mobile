import CustomerAddress from "../models/CustomerAddress";
import Transaction from "../models/Transaction";
import http from "./http";

export default class TransactionService {
    public static async getMyWallet(props: { page?: number }) {
        const params: any = {
            perPage: 10,
            page: props?.page || 1,
        };
        console.log(
            "???",
            `/transaction/my-trans?${new URLSearchParams(params).toString()}`
        );
        const { data } = await http.get(
            `/transaction/my-trans?${new URLSearchParams(params).toString()}`
        );

        console.log("transactions ===", data);

        return {
            data:
                data.docs.length > 0
                    ? new Transaction().parseList(data.docs)
                    : [],
            currentPage: data.currentPage || 1,
            pages: data.pages || 1,
        };
    }

    public static async topupWallet(props: {amount?: number}) {
        const body = {
            amount: props.amount || 0,
            paymentMethodId: 1
        }

        const {data} = await http.post(`/payment/recharge`, body);

        console.log("paypal payment data ===", data);

        return data;
    }


    public static async topupWalletSuccessfull(props: {data: any}) {
        const body = {
            data: props.data || {},
            paymentMethodId: 1
        }

        console.log("body ===", body);

        const {data} = await http.post(`/payment/recharge-success`, body);

        console.log("payment data ===", data);

        return data;
    }
}
