const {JSDOM} = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if(baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)
    if(pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1
    console.log(`actively crawling: ${currentURL}`)

    try {
        const resp = await fetch(currentURL)
        if(resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")) {
            console.log(`no html resposne, content type: ${contentType} on page: ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()

        const nextUrls = getURLsFromHTML(htmlBody, baseURL)

        for(const nextURL of nextUrls) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    } catch (err) {
        console.log(`err.message on page: ${currentURL}`)
    }
    return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElemnt of linkElements) {
        if(linkElemnt.href.slice(0,1) === '/') {
            //relative url
            try {
                const urlObj = new URL(`${baseURL}${linkElemnt.href}`)
                urls.push(urlObj.href)
            } catch (err){
                console.log(err.message)
            }
        } else {
            // absolute url
             try {
                const urlObj = new URL(linkElemnt.href)
                urls.push(urlObj.href)
            } catch (err){
                console.log(err.message)
            }
        }
    }
    return urls
}


function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.host}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}