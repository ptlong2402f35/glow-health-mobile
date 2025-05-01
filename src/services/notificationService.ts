import CustomerAddress from "../models/CustomerAddress";
import Notification from "../models/Notification";
import http from "./http";

export default class NotificationService {
    public static async getMyNotification(props: {page?:number, perPage?:number}) {
        const { data } = await http.get(`/notification/my-noti?page=${props.page}&perPage=10`);

        return {
            data: data.docs.length > 0 ? new Notification().parseList(data) : [],
            currentPage: data.currentPage,
            pages: data.pages,
        }
    }

    public static async updateAddress(props: {
        notiIds?: number[];
        readAll?:boolean;
    }) {
        const { data } = await http.post(
            `/notification/read-noti`,
            {
                notiIds: props.notiIds,
                readAll: props.readAll
            }
        );

        console.log("data update customer noti readed === ", data);
        return data;
    }
}
