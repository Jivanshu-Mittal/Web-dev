import http from "http";

const PORT = process.env.PORT || 6000;
const server = http.createServer((req, res) => {
  res.end("Hello from backend");
});

server.listen(PORT, () => {
  console.log("Server is ready and running on port " + PORT);
});