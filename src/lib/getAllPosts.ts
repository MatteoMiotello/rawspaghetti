import * as fs from "fs";

export const postBaseDir = './resources/posts/';


export interface Post {
    title : string
    author : string
    content: string
}

export const getAllPosts = (): Post[] => {
    const files = fs.readdirSync(postBaseDir )

    return files.map( ( file ): Post => {
        const content = fs.readFileSync( postBaseDir + file )
        const title = file.replace( ".md", "" )

        return {
            title: title,
            content: content.toString()
        }
    } )
}

export const getPost = (slug: string ): undefined | Post => {
    return getAllPosts().find( (post: Post)  => post.title == slug )
}