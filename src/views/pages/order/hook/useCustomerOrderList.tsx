import { useState } from "react";
import Order from "../../../../models/Order";
import useAlertDialog from "../../../../hook/useAlert";
import useLoadingDialog from "../../../../hook/useLoading";
import OrderServiceApi from "../../../../services/orderService";

export default function useCustomerOrderList() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const { openAlertDialog } = useAlertDialog();
    const [orders, setOrders] = useState<Order[]>([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const getOrderList = async (page?: number) => {
        try {
            openLoadingDialog?.();
            let {
                docs,
                pages,
                currentPage
            } = await OrderServiceApi.getCustomerOrderList({
                page
            });

            setOrders([...orders, ...docs]);
            setPage(currentPage);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const initLoad = async () => {
        try {
            openLoadingDialog?.();
            let {
                docs,
                pages,
                currentPage
            } = await OrderServiceApi.getCustomerOrderList({
                page
            });

            setOrders([...docs]);
            setPage(currentPage);
            setMaxPage(pages);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message || "Đã có lỗi xảy ra");
        } finally {
            closeLoadingDialog?.();
        }
    }

    const loadMore = async () => {
        if(page < maxPage) {
            await getOrderList(page + 1);
        }
    }

    return {
        orders,
        getOrderList,
        loadMore,
        initLoad
    }
}
