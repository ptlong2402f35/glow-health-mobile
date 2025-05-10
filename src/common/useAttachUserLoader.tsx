import { useState } from "react";
import User from "../models/User";
import AuthService from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { disconnectSocket, initSocket } from "../hook/socket/socket";
import PusherConfig from "../hook/pusher/pusher";

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
        if(!token) {
            setIsLogin(false);
        }
        try {
            let data = await AuthService.me();
            setUser(data);
            setUserLoader(
                {
                    ...data,
                    name: data?.staff?.name || ""
                }
            );

            setIsLogin(true);
            new PusherConfig().subcribe(data.id);
            
        }
        catch (err) {
            setIsLogin(false);
        }        
    }

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("refreshToken");
        setIsLogin(false);
        setUserLoader(null);
        setUser(null);
        new PusherConfig().unsub();
    }

    return {
        user,
        updateUser,
        userLoader,
        updateUserLoader,
        me,
        isLogin,
        logout
    };
}
