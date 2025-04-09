import IModel from "./IModel";


export default class Notification implements IModel<Notification> {
    id?: number | null;
    title?: string | null;
    content?: string | null;
    referenceId?: number | null;
    seen?: boolean | null;
    seenAt?: Date | null;
    toUserId?: number | null;
    status?: number | null;
    actionType?: number | null;
    actionEvent?: JSON | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;

    constructor(input?: Partial<Notification>) {
        this.id = input?.id || null;
        this.title = input?.title || null;
        this.content = input?.content || null;
        this.referenceId = input?.referenceId || null;
        this.seen = input?.seen || null;
        this.seenAt = input?.seenAt || null;
        this.toUserId = input?.toUserId || null;
        this.status = input?.status || null;
        this.actionType = input?.actionType || null;
        this.actionEvent = input?.actionEvent || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
    }

    parse(json?: any): Notification {
        if (!json) return this;

        Object.assign(this, {
            ...json,
        });

        return this;
    }

    parseList(jsons: any) {
        if (!jsons || !jsons.length) return;

        return jsons.map((item: any) => new Notification().parse(item));
    }

    clone(): Notification {
        return new Notification({
            ...this,
        });
    }
}
