import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Star, GitFork } from "lucide-react"

async function getGithubProjects() {
    const username = "phanan04"

    // ĐIỀN TÊN CÁC DỰ ÁN BẠN MUỐN HIỂN THỊ VÀO ĐÂY:
    // Ví dụ: ["du-an-1", "du-an-2"]
    const selectedRepos: string[] = [

    ]

    // Lấy tối đa 100 repo mới nhất để lọc (Github max per_page là 100)
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
        next: { revalidate: 3600 }
    })

    if (!res.ok) {
        return []
    }

    const allRepos = await res.json()

    // Nếu mảng selectedRepos rỗng, trả về 6 repo có nhiều sao nhất như cũ
    if (selectedRepos.length === 0) {
        return allRepos
            .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6)
    }

    // Nếu có chọn repo, lọc ra đúng những cái đó
    return allRepos.filter((repo: any) => selectedRepos.includes(repo.name))
}

export default async function ProjectsPage() {
    const projects = await getGithubProjects()

    return (
        <div className="flex-1 items-start md:grid py-8 mx-auto max-w-4xl w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Dự án của tôi</h1>
                <p className="text-muted-foreground mt-2">Được fetch tự động từ Github.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project: any) => (
                    <a key={project.id} href={project.html_url} target="_blank" rel="noreferrer">
                        <Card className="hover:border-foreground/50 transition-colors h-full flex flex-col">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Github className="w-5 h-5" />
                                    <CardTitle className="text-xl">{project.name}</CardTitle>
                                </div>
                                <CardDescription className="flex-1">
                                    {project.description || "Không có mô tả"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="mt-auto">
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                        <span>{project.language || "Unknown"}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4" />
                                        <span>{project.stargazers_count}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <GitFork className="w-4 h-4" />
                                        <span>{project.forks_count}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </a>
                ))}
            </div>

            {projects.length === 0 && (
                <p className="text-muted-foreground text-center py-12">Không tìm thấy dự án nào hoặc sai Username Github.</p>
            )}
        </div>
    )
}
