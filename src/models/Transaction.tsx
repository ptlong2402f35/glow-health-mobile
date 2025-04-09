import IModel from "./IModel";


export default class Transaction implements IModel<Transaction> {
    id?: number | null;
    code?: string | null;
    forUserId?: number | null;
    content?: string | null;
    money?: number | null;
    orderId?: number | null;
    totalMoney?: number | null;
    status?: number | null;
    userCreate?: number | null;
    success?: boolean | null;
    add?: boolean | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;

    constructor(input?: Partial<Transaction>) {
        this.id = input?.id || null;
        this.code = input?.code || null;
        this.forUserId = input?.forUserId || null;
        this.content = input?.content || null;
        this.money = input?.money || null;
        this.orderId = input?.orderId || null;
        this.totalMoney = input?.totalMoney || null;
        this.status = input?.status || null;
        this.userCreate = input?.userCreate || null;
        this.success = input?.success || null;
        this.add = input?.add || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
    }

    parse(json?: any): Transaction {
        if (!json) return this;

        Object.assign(this, {
            ...json,
        });

        return this;
    }

    parseList(jsons: any) {
        if (!jsons || !jsons.length) return;

        return jsons.map((item: any) => new Transaction().parse(item));
    }

    clone(): Transaction {
        return new Transaction({
            ...this,
        });
    }
}
