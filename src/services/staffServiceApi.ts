import { DefaultModel } from "../models/IModel";
import ServiceGroup from "../models/ServiceGroup";
import Staff from "../models/Staff";
import StaffService from "../models/StaffService";
import StaffServicePrice from "../models/StaffServicePrice";
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
        search?: string;
        serviceGroupId?: number;
    }) {
        const params: any = {
            ...(props?.page ? { page: props?.page } : {}),
            ...(props?.perPage ? { perPage: props?.perPage } : {}),
            ...(props?.phone ? { phone: props?.phone } : {}),
            ...(props?.name ? { name: props?.name } : {}),
            ...(props?.serviceGroupId ? { serviceGroupId: props?.serviceGroupId } : {}),
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

        return {
            data: data.docs.length ? new Staff().parseList(data.docs) : [],
            pages: data.pages,
            currentPage: data.currentPage,
        };
    }

    public static async getPinnedStaffList(props: { id?: string }) {
        const { data } = await http.get(`/pinned-staff/${props.id}`);
        console.log("data /pinned staff list === ", data);
        return new Staff().parseList(data);
    }

    public static async getStaffDetail(props: { id: number }) {
        const { data } = await http.get(`/staff-detail/${props.id}`);
        console.log("data /detail staff === ", data);
        return new Staff().parse(data);
    }

    public static async updateStaffDetail(props: {
        id: number;
        name?: string;
        age?: number;
        provinceId?: number;
        districtId?: number;
        images?: string[];
        gender?: number;
        urlImage?: string;
    }) {
        let body = {
            ...(props.name ? { name: props.name } : {}),
            ...(props.age ? { age: props.age } : {}),
            ...(props.provinceId ? { provinceId: props.provinceId } : {}),
            ...(props.districtId ? { districtId: props.districtId } : {}),
            ...(props.images ? { images: props.images } : {}),
            ...(props.gender ? { gender: props.gender } : {}),
            ...(props.urlImage ? { urlImage: props.urlImage } : {}),
        };
        console.log("body -=== ", body);
        const { data } = await http.put(`/staff`, body);
        console.log("data /update staff === ", data);
        return data;
    }

    public static async getStaffStaffServiceBatch(props?: {}) {
        const { data } = await http.get(`/staff-service-batch`);

        return data.length ? new StaffService().parseList(data) : [];
    }

    public static async createStaffService(props: {
        staffId?: number;
        name?: string;
        code?: string;
        description?: string;
        serviceGroupId?: number;
        serviceId?: number;
    }) {
        let body = {
            ...(props.name ? { name: props.name } : {}),
            ...(props.staffId ? { staffId: props.staffId } : {}),
            ...(props.code ? { code: props.code } : {}),
            ...(props.description ? { description: props.description } : {}),
            ...(props.serviceId ? { serviceId: props.serviceId } : {}),
            ...(props.serviceGroupId
                ? { serviceGroupId: props.serviceGroupId }
                : {}),
        };
        const { data } = await http.post(`/staff-service-batch`, body);
        console.log("data /update staff service === ", data);
        return data;
    }

    public static async updateStaffServiceBatch(props: { data: any }) {
        let body = props.data;
        const { data } = await http.put(`/staff-service-batch`, body);
        console.log("data /update staff service === ", data);
        return data;
    }

    public static async removeStaffService(props: { id?: number }) {
        const { data } = await http.delete(`/staff-service/${props.id}`);
        console.log("data /update staff service === ", data);
        return data;
    }

    public static async registerStaff(props: {
        name?: string;
        age?: number;
        gender?: number;
        images?: string[];
        address?: string;
        provinceId?: number;
        districtId?: number;
        communeId?: number;
        type?: number;
        description?: string;
        urlImage?: string;
    }) {
        let body = {
            ...(props.name ? { name: props.name } : {}),
            ...(props.age ? { age: props.age } : {}),
            ...(props.gender ? { gender: props.gender } : {}),
            ...(props.images ? { images: props.images } : {}),
            ...(props.address ? { address: props.address } : {}),
            ...(props.provinceId ? { provinceId: props.provinceId } : {}),
            ...(props.districtId ? { districtId: props.districtId } : {}),
            ...(props.communeId ? { communeId: props.communeId } : {}),
            ...(props.type ? { type: props.type } : {}),
            ...(props.description ? { description: props.description } : {}),
            ...(props.urlImage ? { urlImage: props.urlImage } : {}),
        };
        const { data } = await http.put(`/staff-register`, body);
        console.log("data /update staff register === ", data);
        return data;
    }

    public static async getStaffServiceBatch(props: {}) {
        const { data } = await http.get(`/staff-service-batch`);
        console.log("data /update staff service batch === ", data);

        // let x: any = [];
        // for (let item of data) {
        //     console.log("item ===", item);
        //     for (let i2 of item.services) {
        //         console.log("item22 ===", i2);
        //         x.push(...i2.prices);
        //     }
        // }
        // console.log("data /update staff service batch === ", x);
        return data.length ? new ServiceGroup().parseList(data) : [];
    }
}
