function printReport(pages) {
    console.log("========")
    console.log("REPORT")
    console.log("\n")
    const sortedPages = sortPages(pages)
    for( const page of sortedPages) {
        console.log(`Found ${page[1]} links to page: ${page[0]}`)
    }
    console.log("\n")
    console.log("END REPORT")
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a,b) => {
        return b[1] - a[1]
    })
    return pagesArr
}

module.exports = {
    printReport,
    sortPages
}