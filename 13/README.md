[home](../README.md)

### before
```js
if (request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end([
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '</head>',
            '<body>',
            `    <script type="module" src="./RandomNumberGeneratorClient.js">`,
            `    </script>`,
            '</body>',
            '</html>'
        ].join('\n'))
        return
}
```

### after
```js
if (request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end([
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '</head>',
            '<body>',
            `    <p><a href="./RandomNumberGeneratorClient.html">RandomNumberGenerator</a></p>`,
            `    <p><a href="./HistogramMakerClient.html">HistogramMaker</a></p>`,
            '</body>',
            '</html>'
        ].join('\n'))
        return
    }
if (request.url.endsWith('.html')) {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end([
        '<html>',
        '<head>',
        '    <meta charset="utf-8">',
        '</head>',
        '<body>',
        `    <script type="module" src="./${basename(request.url, '.html')}.js">`,
        `    </script>`,
        '</body>',
        '</html>'
    ].join('\n'))
    return
}
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser