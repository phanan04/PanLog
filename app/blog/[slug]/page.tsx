import { getPostBySlug, getPostSlugs } from "@/lib/posts"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { mdxComponents } from "@/components/mdx/components"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import readingTime from "reading-time"

interface PostPageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    const slugs = await getPostSlugs()
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ""),
    }))
}

export default async function PostPage(props: PostPageProps) {
    const { slug } = await props.params

    try {
        const post = await getPostBySlug(slug)
        const readTime = readingTime(post.content)

        // Option for syntax highlighting
        const options = {
            mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [
                    [
                        rehypePrettyCode,
                        {
                            theme: "github-dark",
                        },
                    ],
                ],
            },
        }

        return (
            <article className="container relative max-w-3xl py-6 lg:py-10 mx-auto">
                <div>
                    {post.date && (
                        <time
                            dateTime={post.date}
                            className="block text-sm text-muted-foreground mb-2"
                        >
                            {new Date(post.date).toLocaleDateString('vi-VN', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    )}
                    <h1 className="inline-block font-heading text-4xl leading-tight lg:text-5xl font-bold mb-4">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span>{readTime.text}</span>
                    </div>
                </div>

                <div className="pb-12 pt-8 prose prose-zinc dark:prose-invert max-w-none mdx">
                    <MDXRemote
                        source={post.content}
                        components={mdxComponents}
                        options={options as any}
                    />
                </div>
            </article>
        )
    } catch (error) {
        notFound()
    }
}
