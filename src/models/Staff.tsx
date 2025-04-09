import IModel from "./IModel";
import StaffService from "./StaffService";
import Store from "./Store";
import User from "./User";


export default class Staff implements IModel<Staff> {
	id?: number | null;
	userId?: number | null;
	active?: boolean | null;
	name?: string | null;
	age?: number | null;
	gender?: number | null;
	images?: string[] | null;
	address?: string | null;
	lat?: number | null;
	long?: number | null;
	coordinate?: number | null;
	online?: boolean | null;
	description?: string | null;
	busy?: boolean | null;
	districtId?: number | null;
	provinceId?: number | null;
	communeId?: number | null;
	rateAvg?: number | null;
	countReview?: number | null;
	type?: number | null;
	serviceIds?: number[] | null;
	serviceGroupIds?: number[] | null;
	storeId?: number | null;
	staffRole?: number | null;
	createdAt?: Date | null;
	updatedAt?: Date | null;
	user?: User | null;
	store?: Store | null;
	staffServices?: StaffService[];

	constructor(input?: Partial<Staff>) {
		this.id = input?.id || null;
        this.userId = input?.userId || null;
        this.active = input?.active || null;
        this.name = input?.name || null;
        this.age = input?.age || null;
        this.gender = input?.gender || null;
        this.images = input?.images || [];
        this.address = input?.address || null;
        this.lat = input?.lat || null;
        this.long = input?.long || null;
        this.coordinate = input?.coordinate || null;
        this.online = input?.online || null;
        this.description = input?.description || null;
        this.busy = input?.busy || null;
        this.districtId = input?.districtId || null;
        this.provinceId = input?.provinceId || null;
        this.communeId = input?.communeId || null;
        this.rateAvg = input?.rateAvg || null;
        this.countReview = input?.countReview || null;
        this.type = input?.type || null;
        this.serviceIds = input?.serviceIds || [];
        this.serviceGroupIds = input?.serviceGroupIds || [];
        this.storeId = input?.storeId || null;
        this.staffRole = input?.staffRole || null;
        this.createdAt = input?.createdAt || null;
        this.updatedAt = input?.updatedAt || null;
        this.user = input?.user || null;
        this.store = input?.store || null;
        this.staffServices = input?.staffServices || [];
	}

	parse(json?: any): Staff {
		if (!json) return this;

		Object.assign(this, {
			...json,
			id: json?.id,
            userId: json?.userId,
            active: json?.active,
            name: json?.name,
            age: json?.age,
            gender: json?.gender,
            images: json?.images,
            address: json?.address,
            lat: json?.lat,
            long: json?.long,
            coordinate: json?.coordinate,
            online: json?.online,
            description: json?.description,
            busy: json?.busy,
            districtId: json?.districtId,
            provinceId: json?.provinceId,
            communeId: json?.communeId,
            rateAvg: json?.rateAvg,
            countReview: json?.countReview,
            type: json?.type,
            serviceIds: json?.serviceIds,
            serviceGroupIds: json?.serviceGroupIds,
            storeId: json?.storeId,
            staffRole: json?.staffRole,
            createdAt: json?.createdAt,
            updatedAt: json?.updatedAt,
            user: json.user ? new User().parse(json.user) : null,
            staffServices: json.staffServices ? json.staffServices.map((item:any) => new StaffService().parse(item)) : null,
            store: json.store ? new Store().parse(json.store) : null,
		});

		return this;
	}

	parseList(jsons: any) {
		if (!jsons || !jsons.length) return;

		return jsons.map((item: any) => new Staff().parse(item));
	}

	clone(): Staff {
		return new Staff({
			...this,
		});
	}
}
