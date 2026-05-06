const fs = require("fs");
const http = require("http");
const url = require("url");




const se = http.createServer((req, res) => {
    //console.log(req);
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url}: New request rteceived\n`;
    const myurl = url.parse(req.url, true);
    console.log(myurl);
    fs.appendFile("log.txt", log, (err) => {
        //if (err) throw err;
        switch(myurl.pathname) {
            case "/": res.end("Jivanshu Home");
            break;
            case "/about": res.end("Jivanshu About");
            const username = myurl.query.me;
            res.end("I am , ${username}");
            break;
            default: res.end("404 In process");
        }
    })
});
se.listen(4000, () => {
    console.log("Your server is readddyyy sir in russian accent");
});