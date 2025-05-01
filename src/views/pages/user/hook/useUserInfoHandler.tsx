import useAlertDialog from "../../../../hook/useAlert";
import useLoadingDialog from "../../../../hook/useLoading";
import AuthService from "../../../../services/authService";

export default function UseUserInfoHandler() {
    const {openLoadingDialog, closeLoadingDialog} = useLoadingDialog();
    const {openAlertDialog, closeAlertDialog} = useAlertDialog();

    const onUpdatePassword = async (props: {
        oldPass: string;
        newPass: string;
    }) => {
        try {
            openLoadingDialog?.();
            await AuthService.updatePassword(props);
            openAlertDialog?.("Thông báo", "Thay đổi mật khẩu thành công", ()=> {});
        }
        catch (err: any) {
            let message = err?.response?.data.message || "";
            openAlertDialog?.("Thông báo", message, ()=> {});
        }
        finally {
            closeLoadingDialog?.();
        }
    }

    return {
        onUpdatePassword
    }
}