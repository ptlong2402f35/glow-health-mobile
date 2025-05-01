import http from "./http";

export default class SelectServiceApi {
    public static async getService(props: { search?: string; }) {
        const params: any = {
            ...(props?.search ? { search: props?.search } : {}),
        };
        const { data } = await http.get(`/service-select?${new URLSearchParams(params).toString()}`);

        return data;
    }

}
