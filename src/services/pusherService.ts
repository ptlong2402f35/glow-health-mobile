import http from "./http";

export default class PusherService {
    public static async subcribeChannel() {    
        const { data } = await http.post(
            `/pusher/subcribe`
        );

        console.log("subcribe response ===", data);

        return data;
    }
}