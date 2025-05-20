import http from "./http";

export default class AuthService {
    public static async login(props: { phone: string; password: string , expoToken?: string}) {
        console.log("phone === ", props.phone);
        console.log("password ===", props.password);
        // let { data: test } = await http.get(
        //     "https://english-center-backend.vercel.app/api/test"
        // );
        // console.log("teset ===", test);
        const { data } = await http.post(`/auth/login`, {
            phone: props.phone,
            password: props.password,
            ...(props.expoToken ? {expoToken: props.expoToken}: {}),
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

    public static async updateUserLocation(props: {
        lat?: number;
        long?: number;
    }) {
        let body ={
            lat: props.lat || 0,
            long: props.long || 0
        }
        console.log("lat ===", props.lat);
        console.log("long ===", props.long);
        const {data} = await http.post(`/update-my-location`, body);

        return data;
    }

    public static async updateExpoToken(props: {
        token?: string
    }) {
        let body = {
             ...(props.token ? {token: props.token}: {}),
        }
        const {data} = await http.post(`/update-my-expo-token`, body);

        return data;
    }

    public static async updateProfile(props: {
        name?: string;
        gender?: number;
        image?: string;
    }) {
        const { data } = await http.put(`/user/update`, {
            userName: props.name,
            gender: props.gender,
            ...(props.image ? {urlImage: props.image} : {}),
        });
        console.log("data /update my profile === ", data);
        return data;
    }
}
