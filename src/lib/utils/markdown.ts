import {unified, VFileWithOutput} from "unified";
import remarkParse from "remark-parse";
import rehypeHighlight from "rehype-highlight";
import remarkFrontmatter from "remark-frontmatter";
import emoji from "remark-emoji";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";

export const processMarkdown = (content: Buffer): VFileWithOutput<any> => {
    return unified()
        .use(remarkParse)
        .use(rehypeHighlight)
        .use(remarkFrontmatter)
        .use(emoji)
        .use(remarkParseFrontmatter)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .use(remarkMath)
        .processSync(content);
}