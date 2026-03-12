import { getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"
import { EditPostForm } from "../../components/EditPostForm"

interface EditPostPageProps {
    params: Promise<{ slug: string }>
}

export default async function EditPostPage(props: EditPostPageProps) {
    const { slug } = await props.params

    try {
        const post = await getPostBySlug(slug)
        return (
            <div className="flex-1 items-start md:grid md:gap-6 lg:gap-10 py-8 mx-auto max-w-4xl w-full">
                <EditPostForm post={post} />
            </div>
        )
    } catch (e) {
        notFound()
    }
}
