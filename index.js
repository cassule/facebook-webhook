const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/ab", (req, res) => {
  return res.status(200).json({ status: "OKAY" });
});

app.post("/webhook", (req, res) => {
  let body = req.body;

  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });

    res.status(200).json("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

app.get("/webhook", (req, res) => {
  let VERIFY_TOKEN = "APP";

  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WHEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.listen(process.env.PORT || 1337, () => console.log("listen"));
