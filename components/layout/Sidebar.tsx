import Link from "next/link"
import { cn } from "@/lib/utils"

import { getAllCategories } from "@/lib/posts"

export async function Sidebar({ className }: { className?: string }) {
    const fetchedCategories = await getAllCategories()

    // Auto map the fetched categories in case one is not created.
    const categories = [
        { name: "All", href: "/blog" },
        ...fetchedCategories.sort().map(cat => ({
            name: cat,
            href: `/category/${cat.toLowerCase()}`
        }))
    ]

    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Categories
                    </h2>
                    <div className="space-y-1">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                href={category.href}
                                className={cn(
                                    "flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transparent"
                                )}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
