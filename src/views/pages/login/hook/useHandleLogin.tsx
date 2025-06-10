import AsyncStorage from "@react-native-async-storage/async-storage";
import useLoadingDialog from "../../../../hook/useLoading";
import AuthService from "../../../../services/authService";
import useUserLoader from "../../../../hook/useUserLoader";
import PusherConfig from "../../../../hook/pusher/pusher";
import { getExpoToken } from "../../../../hook/expoToken/expoToken";

export default function useHandleLogin() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const { isLogin, userLoader, reloadMe } = useUserLoader();

    const onHandleLogin = async (data: {
        phone: string;
        password: string;
        onSuccess?: () => void;
        onFail?: (message: string) => void;
    }) => {
        openLoadingDialog?.();
        try {
            let eToken = await getExpoToken();
            let resp = await AuthService.login({
                phone: data.phone,
                password: data.password,
                expoToken: eToken
            });
            console.log("resp login", resp);
            // console.log("resp login parse", JSON.parse(resp));
            console.log("access", resp.accessToken);
            await AsyncStorage.setItem("token", resp?.accessToken);
            await AsyncStorage.setItem("refreshToken", resp?.refreshToken);
            await reloadMe?.(true);
            new PusherConfig().subcribe(resp.userId);

            data?.onSuccess?.();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            data?.onFail?.(message);
            console.log("message ===", err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const onHandleSignup = async (data: {
        phone: string;
        password: string;
        confirmPassword: string;
        onSuccess?: () => void;
        onFail?: (message?: string) => void;
    }) => {
        openLoadingDialog?.();
        try {
            let resp = await AuthService.signup({
                phone: data.phone,
                password: data.password,
                confirmPassword: data.confirmPassword,
            });
            console.log("resp signup", resp);
            // console.log("resp login parse", JSON.parse(resp));
            console.log("access", resp.accessToken);
            await AsyncStorage.setItem("token", resp?.accessToken);
            await AsyncStorage.setItem("refreshToken", resp?.refreshToken);
            await reloadMe?.(true);
            new PusherConfig().subcribe(resp.userId);
            data?.onSuccess?.();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            data?.onFail?.(message);
        } finally {
            closeLoadingDialog?.();
        }
    };

    return {
        onHandleLogin,
        onHandleSignup,
    };
}
