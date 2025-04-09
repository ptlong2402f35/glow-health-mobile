import axios from "axios";
import useAuthentication from "../hook/auth/useAuthentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../NavigationService";

const http = axios.create({
    baseURL: "https://glow-health-backend.vercel.app/api",
    timeout: 10000,
    headers: {},
});

let failedQueue: any = [];
let isRefreshing = false;

const processQueue = (error: any, token: any) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

http.interceptors.request.use(async (config) => {
    let accessToken = await AsyncStorage.getItem("token");
    let headers: any = config.headers;
    if (headers && !headers?.["Authorization"]) {
        headers["Authorization"] = accessToken ? `Bearer ${accessToken}` : "";
    }
    return config;
});

http.interceptors.response.use(
    async (resp) => {
        if (resp.data && resp.data.isError) {
            throw `ApiResultErrorException, message: ${
                resp.data?.errorMessage || "none"
            }`;
        }
        return resp;
    },
    async (error) => {
        console.log("error ===== ", error.response.data);
        console.log("error status ===== ", error.response.status);
        if (error.response?.status === 401) {
            let originalRequest = error.config;
            originalRequest._retry = true;
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization =
                            "Bearer " + token;
                        return http(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;
            try {
                const refreshToken = await AsyncStorage.getItem("refreshToken");
                if (!refreshToken) {
                    navigate("Login");
                }
                try {
                    const reData: any = await http.post("/auth/refresh", {
                        refreshToken,
                    });
                    let newToken = reData?.accessToken;
                    console.log("new Token", newToken);

                    await AsyncStorage.setItem("token", newToken || "");

                    processQueue(null, newToken);

                    originalRequest.headers.Authorization =
                        "Bearer " + newToken;
                    return http(originalRequest);
                } catch (err) {
                    navigate("Login");
                }
            } catch (err) {
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        throw error;
    }
);

export default http;
