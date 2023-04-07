import Container from '@/components/container';
import { Navbar } from '@/components/navbar';
import { collection } from '@/lib/collection/Collection';
import { postDef } from '@/lib/collection/entity';
import { Post } from '@/lib/collection/entity/Post';
import Head from 'next/head';

type Props = { posts: Post[] };

export default function Home({ posts }: Props) {
	return (
		<>
			<Head>
				<title>RAWSPAGHETTI</title>
				<meta
					name="description"
					content="In Coding we suck"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<Container></Container>
		</>
	);
}

export const getStaticProps = async () => {
	const posts = collection<Post>(postDef).getAll();

	console.log(posts);

	return {
		props: { posts },
	};
};
