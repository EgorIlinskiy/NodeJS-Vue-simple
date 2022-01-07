const fs = require("fs");

let writeableStream = fs.createWriteStream("hello.txt");
writeableStream.write("Привет мир!");
writeableStream.write("Продолжение записи \n");
writeableStream.end("Завершение записи");
let readableStream = fs.createReadStream("hello.txt", "utf8");

readableStream.on("data", function(chunk) {
    console.log(chunk);
});

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {

    let currentPath = path.join(__dirname, 'public', (request.url) === '/' ? 'index.html' : request.url);
    let extension = path.extname(currentPath);
    let contentType = 'text/html';

    switch (extension) {
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        default:
            contentType = 'text/html'

    }
    if (!extension) {
        currentPath += '.html'
    }
    fs.readFile(currentPath, (err, content) => {
        if (err) {
            fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
                if (err) {
                    response.writeHead(500);
                    response.end('Error');
                } else {
                    response.writeHead(200, { 'Content-type': 'text/html' })
                    response.end(data)
                }
            })
        } else {
            response.writeHead(200, {
                'Content-Type': contentType
            })
            response.end(content)
        }
    })


    // if (request.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
    //         if (err) {
    //             throw err
    //         } else {
    //             response.writeHead(200, {
    //                 'Content-Type': 'text/html'
    //             })
    //             response.end(data)
    //         }

    //     })
    // };
    // if (request.url === '/page') {
    //     fs.readFile(path.join(__dirname, 'public', 'page.html'), (err, data) => {
    //         if (err) {
    //             throw err
    //         } else {
    //             response.writeHead(200, {
    //                 'Content-type': 'text/html'
    //             })
    //             response.end(data)
    //         }

    //     })
    // };
});



server.listen(3000, () => {
    console.log('Server is started at 3000 port...')
})