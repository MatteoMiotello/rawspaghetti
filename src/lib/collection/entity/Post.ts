import {Entity} from "@/lib/collection/entity/Entity";


export interface Post extends Entity {
    title: string

    author: string

    category: string
}