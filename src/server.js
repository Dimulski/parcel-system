const express = require("express");

const server = express();

server.get("*", (req, res) => {
  const html = `
    <html>
      <head>
        <title>Hello</title>
      </head>
      <body>
        HELLO!
      </body>
    </html>`;

  res.end(html);
});

server.listen(8080);
