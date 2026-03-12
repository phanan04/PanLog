"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function PostActions({ slug }: { slug: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        if (!confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) return
        setLoading(true)
        try {
            const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" })
            if (res.ok) {
                alert("Xóa thành công")
                router.refresh()
            } else {
                alert("Có lỗi xảy ra khi xóa")
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => router.push(`/admin/edit-post/${slug}`)}>
                Sửa
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete} disabled={loading}>
                {loading ? "..." : "Xóa"}
            </Button>
        </div>
    )
}
