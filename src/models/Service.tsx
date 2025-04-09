import IModel from "./IModel";
import ServiceGroup from "./ServiceGroup";


export default class Service implements IModel<Service> {
    id?: number | null;
    name?: string | null;
    active?: boolean | null;
    description?: string | null;
    serviceGroupId?: number | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    serviceGroup?: ServiceGroup | null;

    constructor(input?: Partial<Service>) {
        this.id = input?.id || null;
        this.name = input?.name || null;
        this.active = input?.active || null;
        this.description = input?.description || null;
        this.serviceGroupId = input?.serviceGroupId || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
        this.serviceGroup = input?.serviceGroup || null;
    }

    parse(json?: any): Service {
        if (!json) return this;

        Object.assign(this, {
            ...json,
        });

        return this;
    }

    parseList(jsons: any) {
        if (!jsons || !jsons.length) return;

        return jsons.map((item: any) => new Service().parse(item));
    }

    clone(): Service {
        return new Service({
            ...this,
        });
    }
}
