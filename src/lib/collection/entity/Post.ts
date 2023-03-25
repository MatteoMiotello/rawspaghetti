import moment from "moment/moment";
import {Entity} from "@/lib/collection/entity/entities";

export class Post implements Entity{
    constructor() {
    }

    content: string;
    name: string;
    title: string
    author: string
    category: string
    date: Date

    fromRecord(record: any) { //todo type this shit
        this.author = record.author;
        this.category = record.category;
        this.title  = record.title;
        this.date = moment( record.date ).toDate();
    }
}


