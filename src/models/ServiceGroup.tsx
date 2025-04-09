import IModel from "./IModel";


export default class ServiceGroup implements IModel<ServiceGroup> {
    id?: number | null;
    name?: string | null;
    active?: boolean | null;
    description?: string | null;
    image?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;

    constructor(input?: Partial<ServiceGroup>) {
        this.id = input?.id || null;
        this.name = input?.name || null;
        this.active = input?.active || null;
        this.description = input?.description || null;
        this.image = input?.image || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
    }

    parse(json?: any): ServiceGroup {
        if (!json) return this;

        Object.assign(this, {
            ...json,
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
