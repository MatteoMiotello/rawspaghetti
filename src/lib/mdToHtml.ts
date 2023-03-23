import {remark} from "remark";
import html from "remark-html";
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import {unified} from "unified";
import remarkParse from "remark-parse";


export const MdToHtml = async  ( markdown: string ): Promise<any> => {
    const result = await unified()
        .use(remarkParse)
        .use(remarkFrontmatter)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process( markdown );

    return result
}