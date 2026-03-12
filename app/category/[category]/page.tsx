import Link from "next/link"
import { getPostsByCategory } from "@/lib/posts"
import { Sidebar } from "@/components/layout/Sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CategoryPageProps {
    params: Promise<{ category: string }>
}

export default async function CategoryPage(props: CategoryPageProps) {
    const { category } = await props.params
    const posts = await getPostsByCategory(category)
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1)

    return (
        <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
                <Sidebar />
            </aside>
            <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
                <div className="mx-auto w-full min-w-0">
                    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                            Danh mục: {categoryName}
                        </h1>
                    </div>

                    <div className="grid gap-6 mt-8">
                        {posts.map((post) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`}>
                                <Card className="hover:border-foreground/50 transition-colors">
                                    <CardHeader>
                                        <div className="flex items-center justify-between gap-4 mb-2">
                                            <Badge variant="secondary">{post.category}</Badge>
                                            <time className="text-sm text-muted-foreground">
                                                {new Date(post.date).toLocaleDateString('vi-VN')}
                                            </time>
                                        </div>
                                        <CardTitle className="text-2xl">{post.title}</CardTitle>
                                        <CardDescription className="text-base mt-2">
                                            {post.excerpt}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                        {posts.length === 0 && (
                            <p className="text-muted-foreground">Chưa có bài viết nào trong danh mục này.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
