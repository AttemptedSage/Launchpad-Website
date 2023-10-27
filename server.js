const express = require('express')
const http = require('http');
const fs = require('fs');

// express app
// const app = express()

// app.get('/', () => (req, res) => {
//     res.json({mssg: 'Welcome to the app'})
// })

// //listen for requests 
// app.listen(4000, () => {
//     console.log('listening on port 4000')
// })

const server = http.createServer((req, res) => {
    //console.log('connected');
    res.setHeader('Content-Type', 'text/html');

    fs.readFile('./views/homepage.html', (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.end(data);
        }
    })
})

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});



