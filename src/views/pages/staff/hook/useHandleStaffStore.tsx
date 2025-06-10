import { useState } from "react";
import useLoadingDialog from "../../../../hook/useLoading";
import StoreOwnerApi from "../../../../services/storeService";
import Staff from "../../../../models/Staff";
import useAlertDialog from "../../../../hook/useAlert";

export default function useHandleStaffStore() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const { openAlertDialog, closeAlertDialog } = useAlertDialog();
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(100);

    const getStaffStores = async (page?: number, init?: boolean) => {
        try {
            openLoadingDialog?.();
            let data = await StoreOwnerApi.getStaffList({
                page,
                perPage: 10,
            });
            console.log("staff member list === ", data);
            setStaffList(init ? [...data.data] : [...staffList, ...data.data]);
            setPage(data.currentPage);
            setMaxPage(data.pages);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const deactiveStaff = async (props: {
            id?: number;
            active?: boolean;
        }) => {
            try {
                openLoadingDialog?.();
                if (!props.id) return;
                let data = await StoreOwnerApi.deactiveStaffMember(props);
                openAlertDialog?.("Thông báo", props?.active ? "Kích hoạt thành công" : "Hủy kích hoạt thành công")
                await reload?.();
            } catch (err: any) {
                let message = err?.response?.data.message || "";
                console.log("error message:", err);
            } finally {
                closeLoadingDialog?.();
            }
        };

    const reload = async () => {
        await getStaffStores(1, true);
    };

    const loadMore = async () => {
        if (page < maxPage) {
            await getStaffStores(page + 1);
        }
    };

    return {
        staffList,
        getStaffStores,
        reload,
        loadMore,
        deactiveStaff,
    }
}
