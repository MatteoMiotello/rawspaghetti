import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { collection } from '@/lib/collection/Collection';
import moment from 'moment';
import { Post } from '@/lib/collection/entity/Post';
import { postDef } from '@/lib/collection/entity';
import React from 'react';

interface PostProps {
	content: string;
	title: string;
	author: string;
	category: string;
	date: string;
	error: string | null;
}

const PostPage: NextPage<PostProps> = (props: PostProps) => {
	if (props.error != null) {
		return <p>Not found {props.error}</p>; //todo make it better
	}

	return (
		<>
			<Head>
				<title>{props.title}</title>
			</Head>
			<div className="w-full">
				<article className="prose prose-slate md:prose-lg lg:prose-2xl mx-auto">
					<h1>{props.title}</h1>
					<div
						dangerouslySetInnerHTML={{ __html: props.content }}
					></div>
					<hr></hr>
					<p>Article by {props.author}</p>
				</article>
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	if ( !context.params ) {
		return {
			props: {
				error: "params is not defined"
			}
		}
	}

	const slug = String(context.params.slug);

	const post = collection<Post>(postDef).filter('name', slug).getFirst();

	if (post == null) {
		return {
			props: {
				error: 'post not found',
			},
		};
	}

	return {
		props: {
			content: post.content,
			title: post.title,
			author: post.author,
			category: post.category,
			date: moment(post.date).format('d/M/Y'),
		},
	};
};

export const getStaticPaths = async (p: any) => {
	const postCollection = collection<Post>(postDef).getAll();

	return {
		paths: postCollection.map((post: Post) => ({
			params: {
				slug: post.name,
			},
		})),
		fallback: false,
	};
};

export default PostPage;
