import moment from "moment";
import {CollectionType} from "@/lib/collection/Collection";

export interface Entity {
    name: string
    content: string

    /**
     * Allows to bind the record params given to the current object
     * @param record
     */
    fromRecord( record: any )
}

export class Post implements Entity{
    content: string;
    name: string;
    title: string
    author: string
    category: string
    date: Date

    fromRecord(record: any) {
        this.author = record.author;
        this.category = record.category;
        this.title  = record.title;
        this.date = moment( record.date ).toDate();
    }
}

export function buildEntity<T extends Entity>(collectionType: CollectionType ): T {
    switch ( collectionType ) {
        case CollectionType.post:
            return new Post();
            break;
    }
}
