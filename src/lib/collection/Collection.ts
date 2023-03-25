import fs from "fs";
import {processMarkdown} from "@/lib/utils/markdown";
import {Entity} from "@/lib/collection/entity/Entity";
import {buildEntity, EntityType} from "@/lib/collection/entity";

const collectionDir = 'resources/collections/';

export interface CollectionDefinition {
    name: string,
    type: EntityType,
    resourcePath: string
}

class EntityCollection<T> {
    entities: T[]

    constructor(entities: T[]) {
        this.entities = entities
    }

    filter(key: string, value: any): this {
        this.entities = this.entities.filter((entity: T) => {
            if ( !(key in entity) ) {
                throw Error( 'Key not found in properties' )
            }

            return entity[key as keyof T] === value
        })

        return this;
    }

    getFirst(): T | null {
        return this.entities[0] ?? null
    }

    getAll(): T[] {
        return this.entities
    }

    orderBy(key: string, order: 'ASC' | 'DESC'): this {
        this.entities.sort((a: T, b: T) => {
            if (order == 'ASC') {
                return a[key] - b[key]
            }

            return b[key] - a[key]
        })

        return this
    }
}

const buildCollectionPath = (relativePath: string) => {
    return collectionDir + relativePath + '/'
}

export function collection<T extends Entity>(collection: CollectionDefinition): EntityCollection<T> {
    const collectionPath = buildCollectionPath(collection.resourcePath)
    const files = fs.readdirSync(collectionPath)

    const entities = files.map((file): T => {
        const content = fs.readFileSync(collectionPath + file)
        const parsed = processMarkdown(content) //todo file validation
        const name = file.replace(".md", "")

        let entity = buildEntity( collection.type )
        entity.content = parsed.value.toString()
        entity.name = name
        entity.fromRecord(parsed.data.frontmatter)

        return entity as T
    })

    return new EntityCollection<T>(entities)
}