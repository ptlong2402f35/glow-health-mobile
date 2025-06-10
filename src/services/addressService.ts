import CustomerAddress from "../models/CustomerAddress";
import http from "./http";

export default class AddressService {
    public static async getMyAddress() {
        const { data } = await http.get(`/customer-address/my-address`);

        console.log("data address", data);

        return data.length ? new CustomerAddress().parseList(data) : [];
    }

    public static async createAddress(props: {
        customerName?: string;
        phone?: string;
        isSetDefault?: boolean;
        provinceId?: number;
        districtId?: number;
        communeId?: number;
        address?: string;
        lat?: number;
        long?: number;
        note?: string;
    }) {
        const { data } = await http.post(`/customer-address/add-address`, {
            customerName: props.customerName,
            phone: props.phone,
            isSetDefault: props.isSetDefault,
            provinceId: props.provinceId,
            districtId: props.districtId,
            communeId: props.communeId,
            address: props.address,
            lat: props.lat,
            long: props.long,
            note: props.note,
        });

        console.log("data /create customer address === ", data);
        return data;
    }

    public static async updateAddress(props: {
        id?: number;
        customerName?: string;
        phone?: string;
        isSetDefault?: boolean;
        provinceId?: number;
        districtId?: number;
        communeId?: number;
        address?: string;
        lat?: number;
        long?: number;
        note?: string;
    }) {
        const { data } = await http.put(
            `/customer-address/update-address/${props.id}`,
            {
                customerName: props.customerName,
                phone: props.phone,
                isSetDefault: props.isSetDefault,
                provinceId: props.provinceId,
                districtId: props.districtId,
                communeId: props.communeId,
                address: props.address,
                lat: props.lat,
                long: props.long,
                note: props.note,
            }
        );

        console.log("data update customer address === ", data);
        return data;
    }

    public static async removeAddress(props: { id?: number }) {
        console.log("url delete", `/customer-address/remove-address/${props.id}`)
        const { data } = await http.delete(
            `/customer-address/remove-address/${props.id}`
        );

        return data;
    }

    public static async getMyDefaultAddress() {
        const {data} = await http.get(`/customer-address/my-address-default`);

        console.log("data address", data);

        return new CustomerAddress().parse(data);
    }
}
