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
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const pokemon = await response.json();
    const items = pokemon.results
      .map(p => ({
        percent: rand(100),
        maxPercent: rand(100),
        name: p.name
      }))
      .map(p => ({
        ...p,
        progressText: p.percent + " / " + p.maxPercent
      }));
    const groups = [items, [items[0]]];
    await new Promise(resolve => { setTimeout(resolve, 2000) }) // sleep
    res.end(JSON.stringify(groups));
  } else if (req.url === "/favicon.ico") {
    res.end(favicon);
  } else {
    //res.end(html);
    res.end(fs.readFileSync("client.html", "utf8"));
  }
}).listen(3333);
