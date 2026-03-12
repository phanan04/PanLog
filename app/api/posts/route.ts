import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import slugify from "slugify"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { title, categoryName, excerpt, content, tags } = body

        if (!title || !content || !categoryName) {
            return new NextResponse("Tên bài viết, Hình thức và Nội dung không được để trống", { status: 400 })
        }

        const slug = slugify(title, { lower: true, strict: true, locale: 'vi' })
        const categorySlug = slugify(categoryName, { lower: true, strict: true, locale: 'vi' })

        // 1. Tạo hoặc lấy Category
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

        // 2. Tạo Post mới
        const post = await prisma.post.create({
            data: {
                title,
                slug,
                excerpt: excerpt || "",
                content,
                categoryId: category.id,
                published: true,
                // ignore tags as we didn't add it in schema (only text is there for now)
            }
        })

        return NextResponse.json(post)
    } catch (error: any) {
        console.error("CREATE_POST_ERROR", error)
        if (error.code === 'P2002') {
            return new NextResponse("Tên bài này đã được tạo trước đó", { status: 400 })
        }
        return new NextResponse("Lỗi máy chủ nội bộ", { status: 500 })
    }
}
