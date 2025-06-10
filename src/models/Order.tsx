import IModel from "./IModel";
import Staff from "./Staff";
import StaffServicePrice from "./StaffServicePrice";
import Store from "./Store";
import User from "./User";
import Voucher from "./Voucher";

export enum OrderStatus {
    Pending = 1,
    Approved = 2,
    Finished = 3,
    Canceled = 4,
    Denied = 5,
    StaffCanceled = 6
}

export enum OrderForwardStatus {
    Begin = 1,
    End = 2,
    Reject = 3,
    Switched = 4,
}


export default class Order implements IModel<Order> {
    id?: number | null;
    staffId?: number | null;
    total?: number | null;
    totalPay?: number | null;
    address?: string | null;
    provinceId?: number | null;
    districId?: number | null;
    communeId?: number | null;
    lat?: number | null;
    long?: number | null;
    status?: number | null;
    customerUserId?: number | null;
    paymentMethodId?: number | null;
    fee?: number | null;
    code?: string | null;
    note?: string | null;
    earningRate?: number | null;
    storeId?: number | null;
    reasonCancel?: string | null;
    totalReceive?: number | null;
    expiredAt?: Date | null;
    autoFinishAt?: Date | null;
    chatBoxId?: number | null;
    timerTime?: Date | null;
    additionalFee?: number | null;
    type?: number | null;
    forwardFromOrderId?: number | null;
    voucherId?: number | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    customerUser?: User | null;
    staff?: Staff | null;
    voucher?: Voucher | null;
    prices?: StaffServicePrice[] | null;
    store?: Store | null;
    isForwardOrder?: boolean | null;
    baseOrderId?: number | null;
    forwardOrderId?: number | null;
    forwardOrderStatus?: number | null;
    forwardAccept?: boolean | null;
    serviceBooking?: any | null;
    orderSubStatus?: number | null;
    isOwnerReady?: boolean | null;

    constructor(input?: Partial<Order>) {
        this.id = input?.id || null;
        this.staffId = input?.staffId || null;
        this.total = input?.total || null;
        this.totalPay = input?.totalPay || null;
        this.address = input?.address || null;
        this.provinceId = input?.provinceId || null;
        this.districId = input?.districId || null;
        this.communeId = input?.communeId || null;
        this.lat = input?.lat || null;
        this.long = input?.long || null;
        this.status = input?.status || null;
        this.customerUserId = input?.customerUserId || null;
        this.paymentMethodId = input?.paymentMethodId || null;
        this.fee = input?.fee || null;
        this.code = input?.code || null;
        this.note = input?.note || null;
        this.earningRate = input?.earningRate || null;
        this.storeId = input?.storeId || null;
        this.reasonCancel = input?.reasonCancel || null;
        this.totalReceive = input?.totalReceive || null;
        this.expiredAt = input?.expiredAt || null;
        this.autoFinishAt = input?.autoFinishAt || null;
        this.chatBoxId = input?.chatBoxId || null;
        this.timerTime = input?.timerTime || null;
        this.additionalFee = input?.additionalFee || null;
        this.type = input?.type || null;
        this.forwardFromOrderId = input?.forwardFromOrderId || null;
        this.voucherId = input?.voucherId || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
        this.customerUser = input?.customerUser || null;
        this.staff = input?.staff || null;
        this.voucher = input?.voucher || null;
        this.prices = input?.prices || [];
        this.store = input?.store || null;
        this.isForwardOrder = input?.isForwardOrder || false;
        this.baseOrderId = input?.baseOrderId || null;
        this.forwardOrderId = input?.forwardOrderId || null;
        this.forwardOrderStatus = input?.forwardOrderStatus || null;
        this.forwardAccept = input?.forwardAccept || false;
        this.serviceBooking = input?.serviceBooking || null;
        this.orderSubStatus = input?.orderSubStatus || null;
        this.isOwnerReady = input?.isOwnerReady || null;
    }

    parse(json?: any): Order {
        if (!json) return this;

        Object.assign(this, {
            ...json,
            customerUser: json.customerUser ? new User().parse(json.customerUser) : null,
            prices: json.prices ? json.prices.map((item:any) => new StaffServicePrice().parse(item)) : null,
            store: json.store ? new Store().parse(json.store) : null,
            staff: json.staff ? new Staff().parse(json.staff) : null,
            voucher: json.voucher ? new Voucher().parse(json.voucher) : null,
        });

        return this;
    }

    parseList(jsons: any) {
        if (!jsons || !jsons.length) return;

        return jsons.map((item: any) => new Order().parse(item));
    }

    clone(): Order {
        return new Order({
            ...this,
        });
    }
}
