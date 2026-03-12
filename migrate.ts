const { syncPostsToDb } = require("./lib/posts")

async function main() {
    await syncPostsToDb()
    console.log("Migration Complete")
}
main()
