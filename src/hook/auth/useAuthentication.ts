import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthenticationService() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const getToken = async () => {
    
        let token = await AsyncStorage.getItem("token");
    
        if(token) {
            setIsAuthenticated(true);
        }
    
        return token;
    }

    const getRefreshToken = async () => {
    
        let token = await AsyncStorage.getItem("refeshToken");
    
        if(token) {
            setIsAuthenticated(true);
        }
    
        return token;
    }

    const refresh = async (refreshToken: string) => {
        //refresh api
        let isValid = false;

        if(isValid) {
            setToken("", "");
            return "";
        }
        
        logout();
        return null;
    }

    const me = async () => {

    }

    const setToken = async (token: string, refreshToken: string) => {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        setIsAuthenticated(true);
    }

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("refeshToken");
        setIsAuthenticated(false);
    }

    return {
        getToken, 
        isAuthenticated,
        getRefreshToken,
        refresh,
        me,
        setToken,
        logout
    }
}