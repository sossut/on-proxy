const express = require("express");
const app = express();
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const url = "https://opendata.metropolia.fi/r1/reservation/search";
const splitDate = (date) => {
  return date.toLocaleDateString("sv");
};

app.get("/", async (req, res) => {
  const response = await fetch(
    "https://opendata.metropolia.fi/r1/reservation/building/78025",
    {
      headers: {
        Authorization: "Basic " + btoa("PNWqQ8p6R5sWevhU4Hu0:"),
      },
    }
  );

  res.json(await response.json());
});
app.post("/week", async (req, res) => {
  console.log("get week");
  console.log(splitDate(new Date(req.query.endDate)));
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa("PNWqQ8p6R5sWevhU4Hu0:"),
    },
    body: `{\n   "startDate":"${splitDate(
      new Date(req.query.startDate)
    )}T00:00",\n   "endDate":"${splitDate(
      new Date(req.query.endDate)
    )}T23:59",\n   "room":["${req.query.room}"]\n}`,
  });

  res.json(await response.json());
});
app.post("/day", async (req, res) => {
  console.log("get day");
  console.log(req.query);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa("PNWqQ8p6R5sWevhU4Hu0:"),
    },
    body: `{\n   "startDate":"${splitDate(
      new Date(req.query.startDate)
    )}T00:00",\n   "endDate":"${splitDate(
      new Date(req.query.startDate)
    )}T23:59",\n   "room":["${req.query.room}"]\n}`,
  });

  res.json(await response.json());
});
app.listen(3000, () => {
  console.log("listening on port 3000");
});
