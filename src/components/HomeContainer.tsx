import { Card } from './Card';
import moment from 'moment';

export type CardPost = {
	content: string;
	title: string;
	author: string;
	category: string | null;
	date: string;
};

type Props = {
	posts: CardPost[];
};

const HomeContainer = ({ posts }: Props) => {
	return (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-wrap -m-4">
					{posts.map((post: CardPost, index: number) => {
						return (
							<Card
								key={index}
								title={post.title}
								category={post.category}
								date={post.date}
								description={
									50 > post.content.length
										? post.content
										: post.content.substring(0, 50) + '...'
								}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default HomeContainer;
