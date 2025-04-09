import IModel from "./IModel";


export default class Store implements IModel<Store> {
    id?: number | null;
    name?: string | null;
    status?: number | null;
    owneUserId?: number | null;
    ownStaffId?: number | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;

    constructor(input?: Partial<Store>) {
        this.id = input?.id || null;
        this.name = input?.name || null;
        this.status = input?.status || null;
        this.owneUserId = input?.owneUserId || null;
        this.ownStaffId = input?.ownStaffId || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
        }

    parse(json?: any): Store {
        if (!json) return this;

        Object.assign(this, {
            ...json,
        });

        return this;
    }

    parseList(jsons: any) {
        if (!jsons || !jsons.length) return;

        return jsons.map((item: any) => new Store().parse(item));
    }

    clone(): Store {
        return new Store({
            ...this,
        });
    }
}
