import * as functions from "firebase-functions";
import blacklistJson from "./blacklist.json";
import whitelistJson from "./whitelist.json";

export const whitelist = functions.https.onRequest((_req, res) => {
  const whitelist = JSON.stringify(whitelistJson);
  res.send(whitelist);
});

export const blacklist = functions.https.onRequest((_req, res) => {
  const blacklist = JSON.stringify(blacklistJson);
  res.send(blacklist);
});
