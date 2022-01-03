const http = require('http');
const fs = require('fs');
const url = require("url");


const server = http.createServer((req, res) => {
    let body = '';
    let fieldName = '';
    if (req.url === '/favicon.ico'){
        res.end();
    } else {
        if (req.method === "GET") {
            fieldName = url.parse(req.url,true).query.fieldName || "test";
            res.writeHead(200, { "Content-Type": "text/html" });
            fs.readFile("./HTML/index.html", "utf8", function(error, data){
                data = data.replace('{fieldName}', fieldName);
                res.end(data);
            })
        } else if (req.method === "POST") {
            req.on("data", function (chunk) {
                body += chunk;
            });

            req.on("end", function(){
                const value = body.split('=')[1];
                res.writeHead(200, { "Content-Type": "text/html" });
                fs.readFile("./HTML/response.html", "utf8", function(error, data){
                    data = data.replace('{name}', fieldName).replace('{value}', value);
                    res.end(data);
                })
            });
        }
    }
})
server.listen(3333);
