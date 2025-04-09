import IModel from "./IModel";
import Order from "./Order";
import Staff from "./Staff";
import Store from "./Store";

export default class OrderForwarder implements IModel<OrderForwarder> {
    id?: number | null;
    staffId?: number | null;
    orderId?: number | null;
    isAccept?: boolean | null;
    status?: number | null;
    storeId?: number | null;
    expiredAt?: Date | null;
    timerTime?: Date | null;
    type?: number | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    staff?: Staff | null;
    store?: Store | null;
    baseOrder?: Order | null;

    constructor(input?: Partial<OrderForwarder>) {
        this.id = input?.id || null;
        this.staffId = input?.staffId || null;
        this.orderId = input?.orderId || null;
        this.isAccept = input?.isAccept || null;
        this.timerTime = input?.timerTime || null;
        this.storeId = input?.storeId || null;
        this.expiredAt = input?.expiredAt || null;
        this.status = input?.status || null;
        this.type = input?.type || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
        this.staff = input?.staff || null;
        this.store = input?.store || null;
        this.baseOrder = input?.baseOrder || null;
    }

    parse(json?: any): OrderForwarder {
        if (!json) return this;

        Object.assign(this, {
            ...json,
            staff: json.staff ? new Staff().parse(json.staff) : null,
            store: json.store ? new Store().parse(json.store) : null,
            baseOrder: json.baseOrder ? new Order().parse(json.baseOrder) : null,
        });

        return this;
    }

    parseList(jsons: any) {
        if (!jsons || !jsons.length) return;

        return jsons.map((item: any) => new OrderForwarder().parse(item));
    }

    clone(): OrderForwarder {
        return new OrderForwarder({
            ...this,
        });
    }
}
