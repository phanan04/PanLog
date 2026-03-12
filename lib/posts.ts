import fs from "fs"
import path from "path"
import matter from "gray-matter"
import prisma from "./db"
import slugify from "slugify"

// MIGRATION SCRIPT TO SYNC MDX TO DB
export async function syncPostsToDb() {
    const postsDirectory = path.join(process.cwd(), "content", "posts")
    if (!fs.existsSync(postsDirectory)) return

    const fileNames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.mdx'))

    for (const file of fileNames) {
        const slug = file.replace(/\.mdx$/, "")
        const fullPath = path.join(postsDirectory, file)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        // Ensure category exists
        const categoryName = data.category || "Uncategorized"
        const categorySlug = slugify(categoryName, { lower: true })

        let category = await prisma.category.findUnique({
            where: { name: categoryName }
        })

        if (!category) {
            category = await prisma.category.create({
                data: {
                    name: categoryName,
                    slug: categorySlug
                }
            })
        }

        // Upsert Post
        await prisma.post.upsert({
            where: { slug },
            update: {
                title: data.title,
                excerpt: data.excerpt || "",
                content,
                categoryId: category.id,
                published: true,
            },
            create: {
                slug,
                title: data.title,
                excerpt: data.excerpt || "",
                content,
                categoryId: category.id,
                published: true,
                createdAt: data.date ? new Date(data.date) : new Date()
            }
        })
    }

    console.log("Synced MDX files to Database SQLite!")
}

// REPLACING OLD METHODS TO USE DB

export async function getPostSlugs() {
    const posts = await prisma.post.findMany({ select: { slug: true } })
    return posts.map(p => p.slug)
}

export async function getPostBySlug(slug: string) {
    const post = await prisma.post.findUnique({
        where: { slug },
        include: { category: true }
    })

    if (!post) throw new Error("Post not found")

    return {
        slug: post.slug,
        title: post.title,
        date: post.createdAt.toISOString(),
        category: post.category.name,
        excerpt: post.excerpt || "",
        content: post.content,
    }
}

export async function getAllPosts() {
    const posts = await prisma.post.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        where: { published: true }
    })

    return posts.map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.createdAt.toISOString(),
        category: post.category.name,
        excerpt: post.excerpt || "",
        content: post.content,
    }))
}

export async function getPostsByCategory(categorySlug: string) {
    const posts = await prisma.post.findMany({
        where: { category: { slug: categorySlug }, published: true },
        include: { category: true },
        orderBy: { createdAt: 'desc' }
    })

    return posts.map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.createdAt.toISOString(),
        category: post.category.name,
        excerpt: post.excerpt || "",
        content: post.content,
    }))
}

export async function getAllCategories(): Promise<string[]> {
    const categories = await prisma.category.findMany()
    return categories.map(c => c.name)
}
