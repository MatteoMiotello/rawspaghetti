import fs from 'fs';
import { processMarkdown } from '@/lib/utils/markdown';
import { Entity } from '@/lib/collection/entity/Entity';
import { buildEntity, EntityType } from '@/lib/collection/entity';

const collectionDir = 'resources/collections/';

export interface CollectionDefinition {
	name: string;
	type: EntityType;
	resourcePath: string;
}

class EntityCollection<T extends Entity> {
	entities: T[];

	constructor(entities: T[]) {
		this.entities = entities;
	}

	filter(key: string, value: any): this {
		this.entities = this.entities.filter((entity: T) => {
			if (!entity[key as keyof T]) {
				throw Error('Key not found in properties');
			}

			return entity[key as keyof T] === value;
		});

		return this;
	}

	getFirst(): T | null {
		return this.entities[0] ?? null;
	}

	getAll(): T[] {
		return this.entities;
	}

	orderBy(key: keyof T, order: 'ASC' | 'DESC'): this {
		if (!this.entities[0]) {
			return this;
		}

		if (order == 'ASC')
			this.entities.sort((a: T, b: T) => this.compare(a[key], b[key]));
		else this.entities.sort((a: T, b: T) => this.compare(b[key], a[key]));

		return this;
	}

	compare(a: any, b: any): number {
		if (typeof a == 'number' && typeof b == 'number') return a - b;

		if (typeof a == 'string' && typeof b == 'string')
			return a.localeCompare(b);

		return 0;
	}
}

const buildCollectionPath = (relativePath: string) => {
	return collectionDir + relativePath + '/';
};

export function collection<T extends Entity>(
	collection: CollectionDefinition
): EntityCollection<T> {
	const collectionPath = buildCollectionPath(collection.resourcePath);
	const files = fs.readdirSync(collectionPath);

	const entities = files.map((file): T => {
		const content = fs.readFileSync(collectionPath + file);
		const parsed = processMarkdown(content); //todo file validation
		const name = file.replace('.md', '');

		let entity = buildEntity(collection.type);
		entity.content = parsed.value.toString();
		entity.name = name;
		entity.fromRecord(parsed.data.frontmatter);

		return entity as T;
	});

	return new EntityCollection<T>(entities);
}
