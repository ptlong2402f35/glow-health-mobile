import Staff from "../models/Staff";
import StaffService from "../models/StaffService";
import http from "./http";

export default class StoreOwnerApi {
    public static async getStaffList(props: {
        page?: number;
        perPage?: number;
    }) {
        const params: any = {
            ...(props?.page ? { page: props?.page } : {}),
            ...(props?.perPage ? { perPage: props?.perPage } : {}),
        };
        const { data } = await http.get(
            `/store-owner/staff?${new URLSearchParams(params).toString()}`
        );

        return {
            data: data.docs.length ? new Staff().parseList(data.docs) : [],
            pages: data.pages,
            currentPage: data.currentPage,
        };
    }

    public static async getStaffMemberDetail(props: { id?: number }) {
        const { data } = await http.get(`/store-owner/staff/${props.id}`);
        console.log("data get staff member detail xxx", data);
        return new Staff().parse(data);
    }

    public static async createStaffMember(props: {
        phone: string;
        userName: string;
        email?: string;
        name?: string;
        age?: number;
        gender?: number;
        images?: string[];
        address?: string;
        provinceId?: number;
        type?: number;
        districtId?: number;
        description?: string;
        urlImage?: string;
    }) {
        let body = {
            phone: props.phone,
            userName: props.userName,
            email: props.email || null,
            name: props.name,
            age: props.age,
            gender: props.gender,
            images: props.images || [],
            address: props.address,
            provinceId: props.provinceId,
            type: props.type || 1,
            districtId: props.districtId,
            description: props.description,
            urlImage: props.urlImage,
        };
        console.log("body create staff member ===", body);
        const { data } = await http.post("/store-owner/staff", body);

        return data;
    }

    public static async updateStaffMember(props: {
        id: number;
        name?: string;
        age: number;
        gender?: number;
        images?: string[];
        address?: string;
        provinceId?: number;
        type?: number;
        districtId?: number;
        urlImage?: string;
        description?: string;
    }) {
        let body = {
            name: props.name,
            age: props.age,
            gender: props.gender,
            images: props.images || [],
            address: props.address,
            provinceId: props.provinceId,
            type: props.type || 1,
            districtId: props.districtId,
            ...(props.urlImage ? { urlImage: props.urlImage } : {}),
            ...(props.description ? { description: props.description } : {}),
        };
        console.log("update staff member body ===", body);
        const { data } = await http.put(`/store-owner/staff/${props.id}`, body);

        return data;
    }

    public static async updateStaffServiceMember(props: {
        data?: any;
        id?: number;
    }) {
        let body = props.data;
        const { data } = await http.put(
            `/store-owner/staff-service-batch/${props.id}`,
            body
        );
        console.log("data /update staff service === ", data);
        return data;
    }

    public static async createStaffServiceMember(props: {
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
        const { data } = await http.post(
            `/store-owner/staff-service-batch`,
            body
        );

        return data;
    }

    public static async deleteStaffServiceMember(props: { id: number }) {
        const { data } = await http.delete(
            `/store-owner/staff-service/${props.id}`
        );

        return data;
    }

    public static async getStaffServiceMember(props: { id?: number }) {
        const { data } = await http.get(
            `/store-owner/staff-service-batch/${props.id}`
        );

        return data.length ? new StaffService().parseList(data) : [];
    }

    public static async deactiveStaffMember(props: {
        id?: number;
        active?: boolean;
    }) {
        let body = {
            active: props.active,
        };
        console.log("body ===", body);
        const { data } = await http.put(
            `/store-owner/staff-status/${props.id}`,
            body
        );

        return data;
    }

    public static async getStaffMemberReady() {
        const { data } = await http.get(`/store-owner/staff-forward-ready`);
        console.log("data get staff ready list xxx", data);
        return new Staff().parseList(data);
    }
}
