import Link from "next/link"
import { ArrowRight, Github, Twitter, Linkedin, Facebook } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  return (
    <main className="flex-1 mt-12 md:mt-24">
      <section className="container max-w-4xl mx-auto px-4 md:px-8 space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col-reverse md:flex-row gap-8 items-start md:items-center justify-between border-b pb-12">
          <div className="space-y-4 max-w-2xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight">
              Xin chào, mình <br className="hidden sm:block" /> chia sẻ về các dự án của mình.
            </h1>
            <p className="leading-relaxed text-muted-foreground sm:text-lg">
              Blog này là nơi mình lưu trữ các quá trình xây dựng hạ tầng thực tế cũng như những lỗi mình gặp phải.
            </p>
            <div className="flex gap-4 pt-4">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6"
              >
                Đọc các bài viết
              </Link>
              <div className="flex items-center gap-2">
                <Link href="https://github.com/phanan04" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="w-5 h-5" />
                </Link>
                <Link href="https://www.facebook.com/pann4" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" alt="@avatar" />
            <AvatarFallback>Dev</AvatarFallback>
          </Avatar>
        </div>

        {/* Areas of Interest */}
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6">Chủ đề chính</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 border rounded-xl hover:border-foreground/20 hover:shadow-sm transition-all bg-card">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                🐧 SysAdmin
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Linux, Windows Server, Proxmox, VMware. Tối ưu hóa hiệu năng máy chủ bare-metal.
              </p>
            </div>

            <div className="p-5 border rounded-xl hover:border-foreground/20 hover:shadow-sm transition-all bg-card">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                ☁️ Cloud Native
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                AWS, Terraform, Kubernetes. Xây dựng hạ tầng trên các nền tảng đám mây công khai.
              </p>
            </div>

            <div className="p-5 border rounded-xl hover:border-foreground/20 hover:shadow-sm transition-all bg-card">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                🖧 Networking
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                MikroTik, pfSense, Định tuyến BGP, Cấu hình VPN an toàn.
              </p>
            </div>

            <div className="p-5 border rounded-xl hover:border-foreground/20 hover:shadow-sm transition-all bg-card">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                ⚙️ DevOps & CI/CD
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                Docker, CI Pipelines. Tự động hóa quá trình deploy và kiểm thử phần mềm.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
