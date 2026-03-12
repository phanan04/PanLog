import { getAllPosts } from "@/lib/posts"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PostActions } from "./components/PostActions"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function AdminDashboard() {
    const posts = await getAllPosts()

    return (
        <div className="flex-1 items-start md:grid py-8 mx-auto max-w-6xl w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Quản lý bài viết</h1>
                    <p className="text-muted-foreground mt-2">Xem, sửa và xóa danh sách bài blog của bạn ở đây.</p>
                </div>
                <Link href="/admin/create-post">
                    <Button>+ Đăng bài mới</Button>
                </Link>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Tiêu đề</TableHead>
                            <TableHead>Chuyên mục</TableHead>
                            <TableHead>Ngày đăng</TableHead>
                            <TableHead className="text-right">Hành động</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.slug}>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{post.category}</Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(post.date).toLocaleDateString('vi-VN')}
                                </TableCell>
                                <TableCell className="text-right">
                                    <PostActions slug={post.slug} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {posts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                    Chưa có bài viết nào...
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
