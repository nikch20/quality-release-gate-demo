const http = require('node:http');

const port = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Quality Release Gate Demo</title>
      </head>
      <body>
        <h1>Demo app is running</h1>
        <p>This app will be used to demonstrate our release gate.</p>
      </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});