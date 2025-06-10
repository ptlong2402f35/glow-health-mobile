import { createContext, useEffect } from "react";
import useAttachLoadingDialog from "./useAttachLoadingDialog";
import LoadingDialog from "./components/LoadingDialog";
import useAttachAlertDialog from "./useAttachAlertDialog";
import AlertDialog from "./components/AlertDialog";
import useAttachBottomTab from "./useAttachBottomTab";
import useAttachUserLoader, {
    GeoLocation,
    UserLoader,
} from "./useAttachUserLoader";
import User from "../models/User";
import Toast from "react-native-toast-message";
import useAttachToast from "./useAttachToast";
import { emitter, EmitterEvent } from "../hook/emitter/mitt";
import * as Notifications from "expo-notifications";
import useRefreshScreen from "./useRefreshScreen";

export type CommonComponentsWrapContextType = {
    loadingDialog: {
        openLoadingDialog: (
            label?: string | null,
            afterClose?: () => void
        ) => void;
        closeLoadingDialog: () => void;
    };
    alertDialog: {
        openAlertDialog: (
            title?: string | null,
            content?: string | null,
            afterClose?: () => void
        ) => void;
        closeAlertDialog: () => void;
    };
    bottomtab: {
        tabName: string;
        changeTab: (name: string) => void;
    };
    userLoader?: UserLoader | null;
    location?: GeoLocation | null;
    isLogin?: boolean;
    reloadMe?: (init?: boolean) => Promise<void>;
    user?: User | null;
    logout?: () => Promise<void>;
    showToast?: (data: any) => void;
    refresh?: boolean;
    onRefresh?: any;
    // imageDialog: {
    // 	openImageDialog: (
    // 		url?: string,
    // 		title?: string,
    // 		alt?: string,
    // 		images?: string[],
    // 		afterClose?: () => void
    // 	) => void;
    // 	openSingleImageDialog: (url: string, afterClose?: () => void) => void;
    // 	openMultipleImageDialog: (images: string[], index?: number, afterClose?: () => void) => void;
    // 	closeImageDialog: () => void;
    // };
};

export const CommonComponentsWrapContext =
    createContext<CommonComponentsWrapContextType | null>(null);

export default function CommonComponentsWrap(props: {
    children: JSX.Element | JSX.Element[] | string | string[];
}) {
    const {
        dialogState: loadingDialogState,
        openLoadingDialog,
        closeLoadingDialog,
    } = useAttachLoadingDialog({});
    const {
        dialogState: alertDialogState,
        openAlertDialog,
        closeAlertDialog,
    } = useAttachAlertDialog({});
    const { tabName, changeTab } = useAttachBottomTab({});
    const {
        isLogin,
        userLoader,
        me: reloadMe,
        logout,
        user,
        provideDeviceLocationPermission,
        provideDeviceNotificationPermission,
        location,
    } = useAttachUserLoader({});
    const { showToast } = useAttachToast({ toast: Toast });
    const { refresh, onRefresh } = useRefreshScreen();

    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
        Notifications.setNotificationChannelAsync("default", {
            name: "Default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
        emitter.on(EmitterEvent.ShowToast, (data: any) => showToast(data));
        provideDeviceLocationPermission();
        provideDeviceNotificationPermission();

        return () => {
            emitter.off(EmitterEvent.ShowToast, (data: any) => showToast(data));
        };
    }, []);

    return (
        <CommonComponentsWrapContext.Provider
            value={{
                loadingDialog: {
                    openLoadingDialog,
                    closeLoadingDialog,
                },
                alertDialog: {
                    openAlertDialog,
                    closeAlertDialog,
                },
                bottomtab: {
                    tabName,
                    changeTab,
                },
                userLoader,
                isLogin,
                reloadMe,
                logout,
                user,
                showToast,
                refresh,
                onRefresh,
                location,
            }}
        >
            {props.children}

            <LoadingDialog {...loadingDialogState}></LoadingDialog>
            <AlertDialog {...alertDialogState}></AlertDialog>
            <Toast />
        </CommonComponentsWrapContext.Provider>
    );
}
