import http from "./http";

export default class AuthService {
    public static async login(props: { phone: string; password: string }) {
        const { data } = await http.post(`/auth/login`, {
            phone: props.phone,
            password: props.password,
        });

        return data;
    }

    public static async signup(props: {
        phone: string;
        password: string;
        confirmPassword: string;
    }) {
        const { data } = await http.post(`/auth/signup`, {
            phone: props.phone,
            password: props.password,
            confirmPassword: props.confirmPassword,
        });
        console.log("data /signup === ", data);
        return data;
    }

    public static async me() {
        const { data } = await http.get(`/auth/me`);
        console.log("data /me === ", data);
        return data;
    }
}
