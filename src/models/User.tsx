import CustomerAddress from "./CustomerAddress";
import IModel from "./IModel";
import Notification from "./Notification";
import Staff from "./Staff";
import Store from "./Store";
import Transaction from "./Transaction";

export enum UserRole {
    Admin = 1,
    Customer = 2,
    Staff = 3,
}


export default class User implements IModel<User> {
    id?: number | null;
    userName?: string | null;
    active?: boolean | null;
    email?: string | null;
    password?: string | null;
    urlImage?: string | null;
    role?: number | null;
    phone?: string | null;
    totalMoney?: number | null;
    userCoordinate?: number | null;
    gender?: number | null;
    chatBoxUpdatedAt?: Date | null;
    unreadMessageCount?: number | null;
    resetKey?: string | null;
    resetKeyExpiredAt?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    expoToken?: string | null;
    storeOwner?: Store | null;
    staff?: Staff | null;
    transactions?: Transaction[] | null;
    notifications?: Notification[] | null;
    addresses?: CustomerAddress[] | null;

    constructor(input?: Partial<User>) {
        this.id = input?.id || null;
        this.userName = input?.userName || null;
        this.active = input?.active || null;
        this.email = input?.email || null;
        this.password = input?.password || null;
        this.urlImage = input?.urlImage || null;
        this.role = input?.role || null;
        this.phone = input?.phone || null;
        this.totalMoney = input?.totalMoney || null;
        this.userCoordinate = input?.userCoordinate || null;
        this.gender = input?.gender || null;
        this.chatBoxUpdatedAt = input?.chatBoxUpdatedAt || null;
        this.unreadMessageCount = input?.unreadMessageCount || null;
        this.resetKey = input?.resetKey || null;
        this.resetKeyExpiredAt = input?.resetKeyExpiredAt || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
        this.expoToken = input?.expoToken || null;
        this.storeOwner = input?.storeOwner || null;
        this.staff = input?.staff || null;
        this.transactions = input?.transactions || null;
        this.notifications = input?.notifications || null;
        this.addresses = input?.addresses || null;
        }

    parse(json?: any): User {
        if (!json) return this;

        Object.assign(this, {
            ...json,
            storeOwner: json.storeOwner ? new Store().parse(json.storeOwner) : null,
            staff: json.staff ? new Staff().parse(json.staff) : null,
            transactions: json.transactions ? json.transactions.map((item:any) => new Transaction().parse(item)) : null,
            notifications: json.notifications ? json.notifications.map((item:any) => new Notification().parse(item)) : null,
            addresses: json.addresses ? json.addresses.map((item:any) => new CustomerAddress().parse(item)) : null,
        });

        return this;
    }

    parseList(jsons: any) {
        if (!jsons || !jsons.length) return;

        return jsons.map((item: any) => new User().parse(item));
    }

    clone(): User {
        return new User({
            ...this,
        });
    }
}
