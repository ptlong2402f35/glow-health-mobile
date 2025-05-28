import IModel from "./IModel";
import Service from "./Service";
import StaffServicePrice from "./StaffServicePrice";


export default class ServiceGroup implements IModel<ServiceGroup> {
    id?: number | null;
    name?: string | null;
    active?: boolean | null;
    description?: string | null;
    image?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    services?: any[] | null;
    prices?: StaffServicePrice[] | null

    constructor(input?: Partial<ServiceGroup>) {
        this.id = input?.id || null;
        this.name = input?.name || null;
        this.active = input?.active || null;
        this.description = input?.description || null;
        this.image = input?.image || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
        this.services = input?.services || null;
        this.prices = input?.prices || null;
    }

    parse(json?: any): ServiceGroup {
        if (!json) return this;
        Object.assign(this, {
            ...json,
            // services: json.services ? json.services.map((item:any) => new Service().parse(item)) : null,
            prices: json.prices ? json.prices.map((item:any) => new StaffServicePrice().parse(item)) : null,
        });

        return this;
    }

    parseList(jsons: any) {
        if (!jsons || !jsons.length) return;

        return jsons.map((item: any) => new ServiceGroup().parse(item));
    }

    clone(): ServiceGroup {
        return new ServiceGroup({
            ...this,
        });
    }
}
