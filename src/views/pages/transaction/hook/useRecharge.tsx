import TransactionService from "../../../../services/transactionService";


export default function useRecharge() {
    const topup = async (amount?: number) => {
        try {
            let {data} = await TransactionService.topupWallet({amount});
            return data;
        }
        catch (err) {
            console.error(err);
        }
    }

    const rechargeSuccess = async (props: {data: any, afterSuccess?: () => void, onFail?:() => void}) => {
        try {
            let {data} = await TransactionService.topupWalletSuccessfull({data: props.data});
            props.afterSuccess?.();
        }
        catch (err) {
            console.error(err);
            props.onFail?.();
        }
    }

    return {
        topup,
        rechargeSuccess
    }
}