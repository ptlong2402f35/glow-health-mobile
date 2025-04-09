import IModel from "./IModel";


export default class Voucher implements IModel<Voucher> {
    id?: number | null;
    code?: string | null;
    reduceValue?: number | null;
    reducePercent?: number | null;
    endAt?: Date | null;
    startAt?: Date | null;
    scope?: number | null;
    status?: number | null;
    staffId?: number | null;
    storeId?: number | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;

    constructor(input?: Partial<Voucher>) {
        this.id = input?.id || null;
        this.code = input?.code || null;
        this.reduceValue = input?.reduceValue || null;
        this.reducePercent = input?.reducePercent || null;
        this.endAt = input?.endAt || null;
        this.startAt = input?.startAt || null;
        this.scope = input?.scope || null;
        this.status = input?.status || null;
        this.staffId = input?.staffId || null;
        this.storeId = input?.storeId || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
    }

    parse(json?: any): Voucher {
        if (!json) return this;

        Object.assign(this, {
            ...json,
        });

        return this;
    }

    parseList(jsons: any) {
        if (!jsons || !jsons.length) return;

        return jsons.map((item: any) => new Voucher().parse(item));
    }

    clone(): Voucher {
        return new Voucher({
            ...this,
        });
    }
}
