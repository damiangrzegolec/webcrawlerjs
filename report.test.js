const {sortPages} = require('./report.js')
const {test, expect} = require('@jest/globals')

test('sortPages', () => {
    const input = {
        'http://blog.boot.dev/path': 2,
        'http://blog.boot.dev': 3
    }
    const actual = sortPages(input)
    const expected = [
        ['http://blog.boot.dev', 3],
        ['http://blog.boot.dev/path', 2],
    ]
    expect(actual).toEqual(expected)
})