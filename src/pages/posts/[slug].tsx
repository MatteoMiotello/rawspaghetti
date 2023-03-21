import {GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage} from "next";
import unified from 'unified';
import parse from 'remark-parse';
import {remark} from "remark";
import html from "remark-html";
import {getAllPosts, getPost, Post} from "@/lib/getAllPosts";
import fs from 'fs';
import {MdToHtml} from "@/lib/mdToHtml";
import matter from "gray-matter";
import Head from "next/head";

interface FrontMatterProps {
    title: string,
    author: string
}

interface PostProps {
    content: string,
    frontMatter: FrontMatterProps
}

const PostPage: NextPage = (props: PostProps) => {
    return <>
        <Head>
            <title>{props.frontMatter.title}</title>
        </Head>
        <div className="w-full">
            <article className="prose prose-slate md:prose-lg lg:prose-xl mx-auto"
                     dangerouslySetInnerHTML={{__html: props.content}}>
            </article>
        </div>
    </>
}

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = String(context.params.slug);

    const post = getPost(slug)

    if (post?.content == undefined) {
        return {
            props: {
                content: null
            }
        }
    }

    const {data: frontMatter} = matter(post.content);
    const content = await MdToHtml(post.content)
    return {
        props: {
            content: content.toString(),
            frontMatter: frontMatter
        }
    }
}

export const getStaticPaths = async (p: any) => {
    const posts = getAllPosts()

    return {
        paths: posts.map((post: Post) => ({
                params: {
                    slug: post.title
                }
            })
        ),
        fallback: false
    }
}

export default PostPage