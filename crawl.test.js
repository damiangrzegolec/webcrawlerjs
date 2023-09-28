const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip http protocol', () => {
    const input = 'http://blog.boot.dev/path' 
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip https protocol', () => {
    const input = 'https://blog.boot.dev/path' 
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip slash', () => {
    const input = 'http://blog.boot.dev/path/' 
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'http://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/">Blog</a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'

    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)

    const expected = ["https://blog.boot.dev/"]

    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">Blog</a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'

    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)

    const expected = ["https://blog.boot.dev/path/"]

    expect(actual).toEqual(expected)
})

test('getURLsFromHTML multiple links', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path1/">Blog</a>
            <a href="https://blog.boot.dev/path2/">Blog2</a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'

    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)

    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]

    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">Blog</a>
        </body>
    </html>
    `
    const inputBaseURL = 'https://blog.boot.dev'

    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)

    const expected = []

    expect(actual).toEqual(expected)
})