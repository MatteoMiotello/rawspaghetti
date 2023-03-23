import fs from "fs";
import {unified, VFileWithOutput} from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import emoji from "remark-emoji"
import {Entity} from "@/lib/collection/entity/Entity";
import remarkMdx from 'remark-mdx'

const collectionDir = 'resources/';

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
        .use(remarkMdx)
        .processSync(content);
}

export function collection<T>(collectionName) {
    const collectionPath = buildCollectionPath(collectionName)

    console.log(collectionPath)

    const files = fs.readdirSync(collectionPath)

    const entities = files.map((file) => {
        const content = fs.readFileSync(collectionPath + file)
        const parsed = parseContent(content)
        const name = file.replace(".md", "")

        let entity: Entity = {
            name: name,
            content: parsed.value.toString()
        }

        return Object.assign<T, Partial<T>>(entity, parsed.data.frontmatter)
    })

    return new EntityCollection<T>(entities)
}