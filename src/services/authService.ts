import http from "./http";

export default class AuthService {
    public static async login(props: { phone: string; password: string }) {
        console.log("phone === ", props.phone);
        console.log("password ===", props.password);
        // let { data: test } = await http.get(
        //     "https://english-center-backend.vercel.app/api/test"
        // );
        // console.log("teset ===", test);
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

    public static async updatePassword(props: {
        oldPass: string;
        newPass: string;
    }) {
        const { data } = await http.put(`/user/update-password`, {
            oldPassword: props.oldPass,
            password: props.newPass,
        });
        console.log("data /update password === ", data);
        return data;
    }
}
