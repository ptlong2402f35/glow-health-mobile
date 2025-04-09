import IModel from "./IModel";
import Service from "./Service";
import ServiceGroup from "./ServiceGroup";
import Staff from "./Staff";
import StaffServicePrice from "./StaffServicePrice";


export default class StaffService implements IModel<StaffService> {
    id?: number | null;
    name?: string | null;
    code?: string | null;
    active?: boolean | null;
    serviceGroupId?: number | null;
    description?: string | null;
    staffId?: number | null;
    status?: number | null;
    serviceId?: number | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    staff?: Staff | null;
    service?: Service | null;
    serviceGroup?: ServiceGroup | null;
    prices?: StaffServicePrice[] | null;

    constructor(input?: Partial<StaffService>) {
        this.id = input?.id || null;
        this.name = input?.name || null;
        this.code = input?.code || null;
        this.active = input?.active || null;
        this.serviceGroupId = input?.serviceGroupId || null;
        this.description = input?.description || null;
        this.staffId = input?.staffId || null;
        this.status = input?.status || null;
        this.serviceId = input?.serviceId || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
        this.staff = input?.staff || null;
        this.service = input?.service || null;
        this.serviceGroup = input?.serviceGroup || null;
        this.prices = input?.prices || null;
    }

    parse(json?: any): StaffService {
        if (!json) return this;

        Object.assign(this, {
            ...json,
            prices: json.prices ? json.prices.map((item:any) => new StaffServicePrice().parse(item)) : null,
        });

        return this;
    }

    parseList(jsons: any) {
        if (!jsons || !jsons.length) return;

        return jsons.map((item: any) => new StaffService().parse(item));
    }

    clone(): StaffService {
        return new StaffService({
            ...this,
        });
    }
}
