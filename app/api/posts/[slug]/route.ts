import { NextResponse } from "next/server"
import prisma from "@/lib/db"

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        await prisma.post.delete({
            where: { slug }
        })
        return new NextResponse("Thành công", { status: 200 })
    } catch (error) {
        console.error("DELETE POST ERROR", error)
        return new NextResponse("Lỗi máy chủ nội bộ", { status: 500 })
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug: oldSlug } = await params
        const body = await req.json()
        const { title, categoryName, excerpt, content } = body

        if (!title || !content || !categoryName) {
            return new NextResponse("Thiếu dữ liệu quan trọng", { status: 400 })
        }

        let category = await prisma.category.findUnique({
            where: { name: categoryName }
        })

        if (!category) {
            const slugify = require('slugify')
            category = await prisma.category.create({
                data: {
                    name: categoryName,
                    slug: slugify(categoryName, { lower: true, strict: true, locale: 'vi' })
                }
            })
        }

        const post = await prisma.post.update({
            where: { slug: oldSlug },
            data: {
                title,
                excerpt: excerpt || "",
                content,
                categoryId: category.id,
            }
        })

        return NextResponse.json(post)

    } catch (error) {
        console.error("UPDATE POST ERROR", error)
        return new NextResponse("Lỗi máy chủ nội bộ", { status: 500 })
    }
}
