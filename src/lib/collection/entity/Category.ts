import {Entity} from "@/lib/collection/entity/Entity";

export class Category implements Entity {
    content: string;
    name: string;
    title: string;

    fromRecord(record: any) {
        this.title = record.title
    }
}

