import IModel from "./IModel";
import StaffService from "./StaffService";


export default class StaffServicePrice implements IModel<StaffServicePrice> {
    id?: number | null;
    staffServiceId?: number | null;
    price?: number | null;
    unit?: string | null;
    serviceGroupId?: number | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    staffService?: StaffService | null;

    constructor(input?: Partial<StaffServicePrice>) {
        this.id = input?.id || null;
        this.staffServiceId = input?.staffServiceId || null;
        this.price = input?.price || null;
        this.unit = input?.unit || null;
        this.serviceGroupId = input?.serviceGroupId || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
        this.staffService = input?.staffService || null;
    }

    parse(json?: any): StaffServicePrice {
        if (!json) return this;

        Object.assign(this, {
            ...json,
            staffService: new StaffService().parse(json.staffService),
        });

        return this;
    }

    parseList(jsons: any) {
        if (!jsons || !jsons.length) return;

        return jsons.map((item: any) => new StaffServicePrice().parse(item));
    }

    clone(): StaffServicePrice {
        return new StaffServicePrice({
            ...this,
        });
    }
}
