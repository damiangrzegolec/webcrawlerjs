const {JSDOM} = require('jsdom')

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
    getURLsFromHTML
}