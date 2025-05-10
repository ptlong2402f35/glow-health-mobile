import { useState } from "react";
import Notification from "../../../../models/Notification";
import useLoadingDialog from "../../../../hook/useLoading";
import useAlertDialog from "../../../../hook/useAlert";
import NotificationService from "../../../../services/notificationService";

export default function useNotificationHandle() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const { openAlertDialog, closeAlertDialog } = useAlertDialog();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const getMyNotifications = async (props: { page?: number, init?: boolean}) => {
        try {
            openLoadingDialog?.();
            let data = await NotificationService.getMyNotification(props);
            if(props.init) {
                setNotifications([...data.data]);
            }
            else {
                setNotifications([...notifications, ...data.data]);
            }
            setPage(data.currentPage);
            setMaxPage(data.pages);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message, () => {});
        } finally {
            closeLoadingDialog?.();
        }
    };

    const readMyNotification = async (props: {notiIds?: number[], readAll?: boolean}) => {
        try {
            let data = await NotificationService.readNoti(props);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("read noti err", message);
        } finally {
            closeLoadingDialog?.();
        }
    }

    const reload = async () => {
        await getMyNotifications({page: 1, init: true});
    };

    const loadMore = async () => {
        if(page >= maxPage) return;
        await getMyNotifications({page: page + 1});
    }

    return {
        page,
        maxPage,
        notifications,
        getMyNotifications,
        readMyNotification,
        reload,
        loadMore
    };
}
