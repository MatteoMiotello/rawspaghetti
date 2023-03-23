import fs from "fs";
import {unified, VFileWithOutput} from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import emoji from "remark-emoji"
import {buildEntity, Entity} from "@/lib/collection/entity/entities";
import {Collection} from "yaml/types";

const collectionDir = 'resources/collections/';


interface ICollection {
    name: string,
    type: CollectionType
    dirPath: string
}

export enum CollectionType {
    post = 'post'
}

export const posts: ICollection = {
    name: 'Posts',
    type: CollectionType.post,
    dirPath: 'posts',
}

class EntityCollection<T> {
    entities: T[]

    constructor(entities: T[]) {
        this.entities = entities
    }

    filter(key: string, value: any): this {
        this.entities = this.entities.filter((entity: T) => entity[key] === value)

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

const parseContent = (content: Buffer): VFileWithOutput<any> => {
    return unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(emoji)
        .use(remarkParseFrontmatter)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .processSync(content);
}

export function collection<T extends Entity>(collection: ICollection): EntityCollection<T> {
    const collectionPath = buildCollectionPath(collection.dirPath)
    const files = fs.readdirSync(collectionPath)

    const entities = files.map((file) => {
        const content = fs.readFileSync(collectionPath + file)
        const parsed = parseContent(content)
        const name = file.replace(".md", "")

        let entity = buildEntity<T>(collection.type)
        entity.content = parsed.value.toString()
        entity.name = name
        entity.fromRecord(parsed.data.frontmatter)

        return entity
    })

    return new EntityCollection<T>(entities)
}