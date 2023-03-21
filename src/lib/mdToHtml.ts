import {remark} from "remark";
import html from "remark-html";
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'


export const MdToHtml = async  ( markdown: string ): Promise<any> => {
    const result = await remark()
        .use( html )
        .use( remarkFrontmatter )
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process( markdown );

    return result
}