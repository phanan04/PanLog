"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreatePostPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        categoryName: "",
        excerpt: "",
        content: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (!res.ok) {
                const errorText = await res.text()
                alert(`Lỗi: ${errorText}`)
            } else {
                alert("Đăng bài viết thành công!")
                router.push("/blog")
                router.refresh()
            }
        } catch (error) {
            console.error("Error formatting post:", error)
            alert("Đã xảy ra lỗi không thể đăng bài, vui lòng xem console logs")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex-1 items-start md:grid md:gap-6 lg:gap-10 py-8 mx-auto max-w-4xl w-full">
            <Card className="w-full border-2">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">Thêm Bài Viết Mới</CardTitle>
                    <CardDescription>Trình quản trị viên điền Markdown để đăng bài.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tiêu đề</label>
                            <Input
                                name="title"
                                placeholder="Kiến trúc mạng Docker Swarm..."
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
                                    placeholder="Mô tả về cụm swarm..."
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Nội dung Markdown</label>
                            <Textarea
                                name="content"
                                placeholder="Viết MDX của bạn ở đây. Có thể sử dụng ### Heading, ```bash code block```, vv."
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
                                {loading ? "Đang lưu..." : "Đăng bài"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
