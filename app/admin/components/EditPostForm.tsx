"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EditPostForm({ post }: { post: any }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: post.title,
        categoryName: post.category,
        excerpt: post.excerpt,
        content: post.content
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`/api/posts/${post.slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (!res.ok) {
                const errorText = await res.text()
                alert(`Lỗi: ${errorText}`)
            } else {
                alert("Cập nhật bài viết thành công!")
                router.push("/admin")
                router.refresh()
            }
        } catch (error) {
            console.error("Error formatting post:", error)
            alert("Đã xảy ra lỗi hệ thống")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full border-2">
            <CardHeader>
                <CardTitle className="text-3xl font-bold">Chỉnh sửa bài viết</CardTitle>
                <CardDescription>Cập nhật nội dung MDX của bạn.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tiêu đề</label>
                        <Input
                            name="title"
                            placeholder="Tiêu đề..."
                            required
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <Input
                                name="categoryName"
                                placeholder="DevOps"
                                required
                                value={formData.categoryName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tóm tắt ngắn (Excerpt)</label>
                            <Input
                                name="excerpt"
                                placeholder="..."
                                value={formData.excerpt}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Nội dung Markdown</label>
                        <Textarea
                            name="content"
                            placeholder="Viết MDX ở đây..."
                            className="min-h-[400px] font-mono text-sm"
                            required
                            value={formData.content}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" type="button" onClick={() => router.back()}>
                            Hủy bỏ
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Đang lưu..." : "Lưu thay đổi"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
