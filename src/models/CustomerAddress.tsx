import IModel from "./IModel";


export default class CustomerAddress implements IModel<CustomerAddress> {
    id?: number | null;
    customerName?: string | null;
    phone?: string | null;
    default?: boolean | null;
    active?: boolean | null;
    customerUserId?: number | null;
    provinceId?: number | null;
    districtId?: number | null;
    communeId?: number | null;
    address?: string | null;
    lat?: number | null;
    long?: number | null;
    note?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;

    constructor(input?: Partial<CustomerAddress>) {
        this.id = input?.id || null;
        this.customerName = input?.customerName || null;
        this.phone = input?.phone || null;
        this.default = input?.default || null;
        this.active = input?.active || null;
        this.customerUserId = input?.customerUserId || null;
        this.provinceId = input?.provinceId || null;
        this.districtId = input?.districtId || null;
        this.communeId = input?.communeId || null;
        this.address = input?.address || null;
        this.lat = input?.lat || null;
        this.long = input?.long || null;
        this.note = input?.note || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
    }

    parse(json?: any): CustomerAddress {
        if (!json) return this;

        Object.assign(this, {
            ...json,
        });

        return this;
    }

    parseList(jsons: any) {
        if (!jsons || !jsons.length) return;

        return jsons.map((item: any) => new CustomerAddress().parse(item));
    }

    clone(): CustomerAddress {
        return new CustomerAddress({
            ...this,
        });
    }
}
