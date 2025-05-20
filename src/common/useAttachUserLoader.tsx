import { useState } from "react";
import User from "../models/User";
import AuthService from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { disconnectSocket, initSocket } from "../hook/socket/socket";
import PusherConfig from "../hook/pusher/pusher";
import * as Location from "expo-location";
import * as Device from "expo-device";
import { getExpoToken } from "../hook/expoToken/expoToken";

export interface UserLoader {
    name?: string | null;
    phone?: string | null;
    urlImage?: string | null;
    role?: number | null;
    totalMoney?: number | null;
}

export default function useAttachUserLoader(props: {}) {
    const [user, setUser] = useState<User | null>(null);
    const [userLoader, setUserLoader] = useState<UserLoader | null>();
    const [isLogin, setIsLogin] = useState(false);

    const updateUser = (data: User) => {
        setUser(data);
    };

    const updateUserLoader = (data: any) => {
        setUserLoader({
            name: data?.name || userLoader?.name,
            phone: data?.phone || userLoader?.phone,
            urlImage: data?.urlImage || userLoader?.urlImage,
            role: data?.role || userLoader?.role,
            totalMoney: data?.totalMoney || userLoader?.totalMoney,
        });
    };

    const me = async () => {
        let token = await AsyncStorage.getItem("token");
        if (!token) {
            setIsLogin(false);
        }
        try {
            let data = await AuthService.me();
            setUser(data);
            setUserLoader({
                ...data,
                name: data?.staff?.name || "",
            });

            setIsLogin(true);
            // subcribe pusher
            new PusherConfig().subcribe(data.id);
            // get user location
            if (Device.isDevice) {
                updateMyLocation();
                updateExpoToken(data);
            }
        } catch (err) {
            setIsLogin(false);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("refreshToken");
        setIsLogin(false);
        setUserLoader(null);
        setUser(null);
        new PusherConfig().unsub();
    };

    const updateMyLocation = async () => {
        try {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            console.log("grant:", status);
            if (status !== "granted") {
                return;
            }

            const loc = await Location.getCurrentPositionAsync({});
            console.log("location user === ", loc);
            await AuthService.updateUserLocation({
                lat: loc.coords.latitude,
                long: loc.coords.longitude,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const updateExpoToken = async (user: User) => {
        try {
            if (!Device.isDevice) {
                console.log("Chỉ thiết bị thật mới nhận được thông báo push");
                // return;
            }
            let token = await getExpoToken();
            if(user?.expoToken === token) return;

            AuthService.updateExpoToken({token: token || ""});
            console.log("update expo token done");
        } catch (err) {
            console.error(err);
        }
    };

    return {
        user,
        updateUser,
        userLoader,
        updateUserLoader,
        me,
        isLogin,
        logout,
        updateMyLocation,
        updateExpoToken
    };
}
