// const fs = require("fs");
// const os = require("os");
// console.log(os.totalmem());
// fs.writeFileSync("./tet.txt", "Hello Jivanshu Mittal"); //synchronous call 



// Read file asynchronously
// const data = fs.readFile("tet.txt", "utf-8", (err, data) =>{
//     if(err) throw err;
//     console.log(data);
// }); 
// fs.appendFileSync("tet.txt", "\nWelcome to Node.js"); //synchronous call

// Read file synchronously
// const data2 = fs.readFileSync("tet.txt", "utf-8");
// console.log(data2);
// console.log(fs.statSync("tet.txt")); //synchronous call
// fs.unlink("./tet.txt", (err) => {
//     if(err) throw err;
//     console.log("File deleted using asynchronous call");
// });
// fs.mkdirSync("NewFolder");
// fs.rmdirSync("NewFolder");
