import IModel from "./IModel";


export default class Review implements IModel<Review> {
    id?: number | null;
    staffId?: number | null;
    orderId?: number | null;
    customerUserId?: number | null;
    staffServiceId?: number | null;
    status?: number | null;
    rate?: number | null;
    note?: string | null;
    storeId?: number | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;

    constructor(input?: Partial<Review>) {
        this.id = input?.id || null;
        this.staffId = input?.staffId || null;
        this.orderId = input?.orderId || null;
        this.customerUserId = input?.customerUserId || null;
        this.staffServiceId = input?.staffServiceId || null;
        this.note = input?.note || null;
        this.rate = input?.rate || null;
        this.status = input?.status || null;
        this.storeId = input?.storeId || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
    }

    parse(json?: any): Review {
        if (!json) return this;

        Object.assign(this, {
            ...json,
        });

        return this;
    }

    parseList(jsons: any) {
        if (!jsons || !jsons.length) return;

        return jsons.map((item: any) => new Review().parse(item));
    }

    clone(): Review {
        return new Review({
            ...this,
        });
    }
}
