import { useState } from "react";

export type AlertDialogType = {
    open: boolean;
    onClose?: () => void;
    title?: string | null;
    content?: string | null;
    afterClose?: () => void;
};

export default function useAttachAlertDialog(props: {}) {
    const onClose = () => {
        setDialogState((pState) => ({
            ...pState,
            open: false,
        }));
    };

    const [dialogState, setDialogState] = useState<AlertDialogType>({
        open: false,
        onClose: onClose,
    });

    const openAlertDialog = (title?: string | null, content?: string | null, afterClose?: () => void) => {
        console.log(`useAttachAlertDialog openAlertDialog`);
        setDialogState({
            open: true,
            title: title,
            content: content,
            afterClose: afterClose,
            onClose: onClose,
        });
    };

    const closeAlertDialog = () => {
        setDialogState({
            open: false,
            onClose: onClose,
        });
    };

    return {
        dialogState,
        openAlertDialog,
        closeAlertDialog,
    };
}
