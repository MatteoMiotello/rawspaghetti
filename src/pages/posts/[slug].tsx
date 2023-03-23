import {GetStaticProps, NextPage} from "next";
import Head from "next/head";
import {collection} from "@/lib/collection/Collection";
import {Post} from "@/lib/collection/entity/Post";

interface FrontMatterProps {
    title: string,
    author: string
}

interface PostProps {
    content: string,
    title: string,
    author: string,
    category: string
}

const PostPage: NextPage = (props: PostProps) => {
    return <>
        <Head>
            <title>{props.title}</title>
        </Head>
        <div className="w-full">
            <article className="prose prose-slate md:prose-lg lg:prose-2xl mx-auto">
                        <h1>{props.title}</h1>
                        <div dangerouslySetInnerHTML={{__html: props.content}}></div>
                        <hr></hr>
            <p>Article by {props.author}</p>
            </article>
            
        </div>
    </>
}

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = String(context.params.slug);

    const post = collection<Post>( 'posts' )
        .filter( 'name', slug )
        .getFirst()

    return {
        props: {
            content: post?.content,
            title: post?.title,
            author: post?.author,
            category: post?.category,
        }
    }
}

export const getStaticPaths = async (p: any) => {
    const posts = collection<Post>( 'posts' ).getAll()

    return {
        paths: posts.map((post: Post) => ({
                params: {
                    slug: post.name
                }
            })
        ),
        fallback: false
    }
}

export default PostPage