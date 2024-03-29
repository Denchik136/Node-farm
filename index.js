const fs = require("fs")
const http = require("http")
const url = require("url")

const express = require('express')

const replaceTemplate = require('./modules/replaceTemplate')




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

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8")
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8")
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8")

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
const dataObj = JSON.parse(data)


const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);

    //Overview page

    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, { "Content-type": 'text/html' })

        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml)

        res.end(output)

        //Product page
    } else if (pathname === "/product") {
        res.writeHead(200, { "Content-type": 'text/html' })
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product)
        res.end(output)

        //API
    } else if (pathname === "/api") {
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
