import moment from 'moment/moment';
import { Entity } from '@/lib/collection/entity/Entity';

export class Post implements Entity {
	constructor() {}

	content: string;
	name: string;
	title: string;
	author: string;
	category?: string | null;
	date: Date;

	fromRecord(record: any) {
		//todo type this shit
		this.author = record.author || null;
		this.category = record.category || null;
		this.title = record.title;
		this.date = moment(record.date).toDate();
	}
}
