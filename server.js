import serialize from "serialize-javascript";
import { join } from "path";
import express from "express";
import { readFile } from "fs";
import { renderToString } from "@vue/server-renderer";
import manifest from "./dist/server/ssr-manifest.json";

// Create the express app.
const server = express();

// we do not know the name of app.js as when its built it has a hash name
// the manifest file contains the mapping of "app.js" to the hash file which was created
// therefore get the value from the manifest file thats located in the "dist" directory
// and use it to get the Vue App
const appPath = join(__dirname, "./dist", "server", manifest["app.js"]);
const createApp = require(appPath).default;

const clientDistPath = "./dist/client";
server.use("/img", express.static(join(__dirname, clientDistPath, "img")));
server.use("/js", express.static(join(__dirname, clientDistPath, "js")));
server.use("/css", express.static(join(__dirname, clientDistPath, "css")));
server.use(
  "/favicon.ico",
  express.static(join(__dirname, clientDistPath, "favicon.ico"))
);

// handle all routes in our application
server.get("*", async (req, res) => {
  const { app, store } = await createApp(req);

  let appContent = await renderToString(app);

  const renderState = `
    <script>
      window.INITIAL_DATA = ${serialize(store.state)}
    </script>`;

  readFile(join(__dirname, clientDistPath, "index.html"), (err, html) => {
    if (err) {
      throw err;
    }

    appContent = `<div id="app">${appContent}</div>`;

    html = html
      .toString()
      .replace('<div id="app"></div>', `${renderState}${appContent}`);
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`You can navigate to http://localhost:${port}`);
});
