import HomeContainer, { CardPost } from '@/components/HomeContainer';
import Navbar from '@/components/Navbar';
import { collection } from '@/lib/collection/Collection';
import { postDef } from '@/lib/collection/entity';
import { Post } from '@/lib/collection/entity/Post';
import moment from 'moment';
import Head from 'next/head';

type Props = {
	posts: CardPost[];
};

export default function Home({ posts }: Props) {
	return (
		<>
			<Head>
				<title>RAWSPAGHETTI</title>
				<meta name="description" content="In Coding we suck" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<HomeContainer posts={posts} />
		</>
	);
}

export const getStaticProps = async () => {
	const posts = collection<Post>(postDef).getAll();

	console.log(posts);

	return {
		props: {
			posts: posts.map((post: Post) => {
				// TODO locale
				return {
					content: post.content,
					title: post.title,
					author: post.author,
					category: post.category,
					date: moment(post.date).locale('it').calendar({
						sameDay: '[Today]',
						nextDay: '[Tomorrow]',
						nextWeek: 'dddd',
						lastDay: '[Yesterday]',
						lastWeek: '[Last] dddd',
						sameElse: 'DD/MM/YYYY',
					}),
				};
			}),
		},
	};
};
