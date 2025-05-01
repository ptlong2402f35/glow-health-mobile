import { useEffect, useState } from "react";
import Transaction from "../../../../models/Transaction";
import useLoadingDialog from "../../../../hook/useLoading";
import useAlertDialog from "../../../../hook/useAlert";
import TransactionService from "../../../../services/transactionService";

export default function useTransactionHandler() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const { openAlertDialog, closeAlertDialog } = useAlertDialog();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);

    const getMyTransaction = async (props: { page?: number }) => {
        try {
            openLoadingDialog?.();
            console.log("load transactions");
            let data = await TransactionService.getMyWallet(props);
            setTransactions([...transactions, ...data.data]);
            setPage(data.currentPage);
            setMaxPage(data.pages);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error", err);
            openAlertDialog?.("Thông báo", message, () => {});
        } finally {
            closeLoadingDialog?.();
        }
    };

    const recharge = async () => {};

    const reload = async () => {
        await getMyTransaction({ page: 1 });
    };

    const loadMore = async () => {
        if (page >= maxPage) return;
        await getMyTransaction({ page: page + 1 });
    };

    return {
        page,
        maxPage,
        transactions,
        getMyTransaction,
        recharge,
        reload,
        loadMore,
    };
}
