export default interface IModel<T extends IModel<T>> {
	parse(json?: any): T;
	clone(): T;
}

export class DefaultModel implements IModel<DefaultModel> {
	parse(json?: any): DefaultModel {
		throw new Error("Method not implemented.");
	}

	clone(): DefaultModel {
		throw new Error("Method not implemented.");
	}

	static parseList<T extends IModel<T>>(jsons: any, constructor: () => T): T[] {
		if (!jsons || !jsons.length) return [];

		return jsons.map((item: any) => constructor().parse(item));
	}
}
