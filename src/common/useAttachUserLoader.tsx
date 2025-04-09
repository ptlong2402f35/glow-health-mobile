import { useState } from "react";
import User from "../models/User";
import AuthService from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

            setUserLoader(
                {
                    ...data,
                    name: data?.staff?.name || ""
                }
            );

            setIsLogin(true);
        }
        catch (err) {
            setIsLogin(false);
        }

        
    }

    return {
        user,
        updateUser,
        userLoader,
        updateUserLoader,
        me,
        isLogin
    };
}
