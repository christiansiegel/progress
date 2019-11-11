const http = require("http");
const fetch = require("node-fetch");
const fs = require("fs");
const log4js = require('log4js');

const logger = log4js.getLogger();
logger.level = "info"

const html = fs.readFileSync("client.html", "utf8");
const favicon = fs.readFileSync("favicon.ico");

const rand = (max) => {
  return Math.floor(Math.random() * (max * 1));
}

http.createServer().on("request", async (req, res) => {
  logger.info(`${req.method} ${req.url}`)
  if (req.url === "/api") {
    // const data = await fetch("our company api");
    await new Promise(resolve => { setTimeout(resolve, 2000) }) // artificial sleep

    // just some static data for this little example backend:
    const data = [
      [
        {
          name: "Jon Doe",
          percent: rand(100),
          maxPercent: rand(100),
          progressText: "almost done",
          avatar: "https://avatars1.githubusercontent.com/u/13996624?s=460&v=4"
        },
        {
          name: "Foo Bar",
          percent: rand(100),
          maxPercent: rand(100),
          progressText: "way behind",
          avatar: "https://avatars1.githubusercontent.com/u/13996624?s=460&v=4"
        }
      ],
      [
        {
          name: "Total",
          percent: rand(100),
          maxPercent: rand(100),
          progressText: "we'll see",
        }
      ]
    ];
    res.end(JSON.stringify(data));
  } else if (req.url === "/favicon.ico") {
    res.end(favicon);
  } else {
    res.end(html);
    //res.end(fs.readFileSync("client.html", "utf8")); // dev: live reload
  }
}).listen(3333);
