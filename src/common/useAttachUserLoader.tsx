import { useState } from "react";
import User from "../models/User";
import AuthService from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { disconnectSocket, initSocket } from "../hook/socket/socket";
import PusherConfig from "../hook/pusher/pusher";
import * as Location from "expo-location";
import * as Device from "expo-device";
import { getExpoToken } from "../hook/expoToken/expoToken";
import * as Notifications from "expo-notifications";

export interface UserLoader {
    name?: string | null;
    phone?: string | null;
    urlImage?: string | null;
    role?: number | null;
    totalMoney?: number | null;
    lat?: number | null;
    long?: number | null;
}

export interface GeoLocation {
    lat?: number | null;
    long?: number | null;
}

export default function useAttachUserLoader(props: {}) {
    const [user, setUser] = useState<User | null>(null);
    const [userLoader, setUserLoader] = useState<UserLoader | null>();
    const [isLogin, setIsLogin] = useState(false);
    const [location, setLocation] = useState<GeoLocation | null>();

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
            updateMyLocation();
            updateExpoToken(data);
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
            if(loc.coords.latitude || loc.coords.longitude) {
                setLocation(
                    {
                        lat: loc.coords.latitude,
                        long: loc.coords.longitude
                    }
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    const updateExpoToken = async (user: User) => {
        try {
            
            let token = await getExpoToken();
            if(user?.expoToken === token) return;

            AuthService.updateExpoToken({token: token || ""});
            console.log("update expo token done");
        } catch (err) {
            console.error(err);
        }
    };

    const provideDeviceNotificationPermission = async() => {
        try {
            
           const { status: existingStatus } =
                   await Notifications.getPermissionsAsync();
               let finalStatus = existingStatus;
           
               if (existingStatus !== "granted") {
                   const { status } = await Notifications.requestPermissionsAsync();
                   finalStatus = status;
               }
           
               if (finalStatus !== "granted") {
                   console.log("Không cấp quyền nhận thông báo!");
                   return;
               }
        } catch (err) {
            console.error(err);
        }
    }

    const provideDeviceLocationPermission = async() => {
        try {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            console.log("grant:", status);
            if (status !== "granted") {
                return;
            }
            const loc = await Location.getCurrentPositionAsync({});
            console.log("location user === ", loc);
            if(loc.coords.latitude || loc.coords.longitude) {
                setLocation(
                    {
                        lat: loc.coords.latitude,
                        long: loc.coords.longitude
                    }
                );
            }
        } catch (err) {
            console.error(err);
        }
    }

    return {
        user,
        updateUser,
        userLoader,
        updateUserLoader,
        me,
        isLogin,
        logout,
        updateMyLocation,
        updateExpoToken,
        provideDeviceNotificationPermission,
        provideDeviceLocationPermission,
        location
    };
}
