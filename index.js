const fs = require("fs")
const http = require("http")
const url = require("url")

// FILES
//blocking
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8")
// console.log(textIn)
// const textOut = `This is what we know about the awocado: ${textIn}. \n Created on ${Date.now()} `
// fs.writeFileSync("./txt/output.txt", textOut)
// console.log("File was created")

//Non-blocking
// fs.readFile("./txt/read-this.txt", "utf-8", (err, data) => {
//     console.log(data)
// })

// console.log("will read file")

//SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
    const pathName = req.url

    //Overview page
    if (pathName === "/" || pathName === "/overview") {
        res.end("This is the overwiew")

        //Product page
    } else if (pathName === "/product") {
        res.end("This is the product")

        //API
    } else if (pathName === "/api") {
        res.writeHead(200, { "Content-type": "application/json" })
        res.end(data)

        // Not found
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-head": "fqyfysyfs",
        })
        res.end("<h1>Page not found</h1")
    }
})

server.listen(3000, "127.0.0.1", () => {
    console.log("listening to requests on port 3000")
})
