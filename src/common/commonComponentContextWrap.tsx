import { createContext } from "react";
import useAttachLoadingDialog from "./useAttachLoadingDialog";
import LoadingDialog from "./components/LoadingDialog";
import useAttachAlertDialog from "./useAttachAlertDialog";
import AlertDialog from "./components/AlertDialog";
import useAttachBottomTab from "./useAttachBottomTab";
import useAttachUserLoader, { UserLoader } from "./useAttachUserLoader";

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
    isLogin?: boolean;
    reloadMe?: () => Promise<void>;
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
    const { isLogin, userLoader, me: reloadMe } = useAttachUserLoader({});
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
            }}
        >
            {props.children}

            <LoadingDialog {...loadingDialogState}></LoadingDialog>
            <AlertDialog {...alertDialogState}></AlertDialog>
        </CommonComponentsWrapContext.Provider>
    );
}
