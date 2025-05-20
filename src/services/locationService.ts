import CustomerAddress from "../models/CustomerAddress";
import http from "./http";

export default class LocationService {
    public static async getProvinceList(props: {search?: string}) {
        let params: any = {
            search: props.search
        }
        const { data } = await http.get(`/provinces?${new URLSearchParams(params).toString()}`);


        return data;
    }

    public static async getDistrictList(props: {search?: string, provinceId?: number}) {
        let params: any = {
            search: props.search,
            provinceId: props.provinceId
        }
        const { data } = await http.get(`/districts?${new URLSearchParams(params).toString()}`);
        
        
        return data;
    }

    public static async getCommuneList(props: {search?: string, provinceId?: number, districId?: number}) {
        let params: any = {
            search: props.search,
            provinceId: props.provinceId,
            districtId: props.districId
        }
        const { data } = await http.get(`/communes?${new URLSearchParams(params).toString()}`);
    
    
        return data;
    }
}
