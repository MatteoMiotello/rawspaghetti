import {CollectionDefinition} from "@/lib/collection/Collection";
import {Post} from "@/lib/collection/entity/Post";
import {Category} from "@/lib/collection/entity/Category";
import {Entity} from "@/lib/collection/entity/Entity";

export enum EntityType {
    post = 'post',
    category = 'category',
}

export const postDef: CollectionDefinition = {
    name: 'Posts',
    resourcePath: 'posts',
    type: EntityType.post,
}

export const categoryDef: CollectionDefinition = {
    name: 'Category',
    resourcePath: 'categories',
    type: EntityType.category,
}

export const buildEntity = (type: EntityType): Entity => {
    switch (type) {
        case EntityType.post:
            return new Post()
        case EntityType.category:
            return new Category()
    }
}