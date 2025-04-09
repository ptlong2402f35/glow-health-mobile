import { DefaultModel } from "../models/IModel";
import Staff from "../models/Staff";
import http from "./http";

export default class StaffServiceApi {
    public static async getStaffList(props: {
        page?: number;
        perPage?: number;
        phone?: string;
        name?: string;
        useCoordinate?: boolean;
        coordinateLat?: number;
        coordinateLong?: number;
        storeId?: number;
        coordinateDistance?: number;
    }) {
        const params: any = {
            ...(props?.page ? { page: props?.page } : {}),
            ...(props?.perPage ? { perPage: props?.perPage } : {}),
            ...(props?.phone ? { phone: props?.phone } : {}),
            ...(props?.name ? { name: props?.name } : {}),
            ...(props?.useCoordinate
                ? { useCoordinate: props?.useCoordinate }
                : {}),
            ...(props?.coordinateLat
                ? { coordinateLat: props?.coordinateLat }
                : {}),
            ...(props?.coordinateLong
                ? { coordinateLong: props?.coordinateLong }
                : {}),
            ...(props?.storeId ? { storeId: props?.storeId } : {}),
            ...(props?.coordinateDistance
                ? { coordinateDistance: props?.coordinateDistance }
                : {}),
        };
        const { data } = await http.get(
            `/staff?${new URLSearchParams(params).toString()}`
        );

        return new Staff().parseList(data.docs);
    }

    public static async getStaffDetail(props: { id: number }) {
        const { data } = await http.get(`/staff-detail/${props.id}`);
        console.log("data /signup === ", data);
        return new Staff().parse(data);
    }
}
