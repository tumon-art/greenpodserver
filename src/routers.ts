import { Request, Response } from "express";
import express from "express";
const { parse } = require("rss-to-json");
const router = express.Router();

export interface ItemsProps {
  title: string;
  description: string;
  published: string;
  created: string;
  category: [];
  content: string;
  enclosures: [{ lenght: string; type: string; url: string }];
  itunes_author: string;
  itunes_duration: number;
  itunes_episode: number;
  itunes_episodeType: "full";
}
export interface RssTypes {
  title: string;
  description: string;
  link: string;
  image: string;
  category: [];
  items: ItemsProps[];
}

export interface ThefirstsHead {
  title: string;
  description: string;
  link: string;
  image: string;
  items: any
}

// FETCH 
let theFirstsRss: RssTypes;

async function fetchTheFirsts() {
  var theFirstsRssFetch: RssTypes = await parse(
    "https://feeds.buzzsprout.com/1194665.rss"
  );
  theFirstsRss = theFirstsRssFetch
} fetchTheFirsts()

// CACHED
let thefirsts: RssTypes;
let onepath: RssTypes;

// HEAD
let thefirstsHead: ThefirstsHead;

router.get("/thefirstshead", async (req: Request, res: Response) => {
  try {
    if (theFirstsRss) {
      thefirstsHead = theFirstsRss
      thefirstsHead.items = []

      // SENT FORM CACHED
      console.log([`/THEFIRSTSHEAD - SENT FROM CACHE`]);
      res.status(200).json({ data: thefirstsHead });
    } else {
      fetchTheFirsts()
      // FILL THEFIRSTSHEAD
      thefirstsHead = theFirstsRss
      thefirstsHead.items = []
      if (theFirstsRss) res.status(200).json({ data: thefirstsHead });
    }
  } catch (error) {
    res.status(400).send({ data: error });
  }
});

router.get("/thefirsts", async (req: Request, res: Response) => {
  try {
    if (theFirstsRss) {
      // SENT FORM CACHE
      console.log([`/THEFIRSTS - SENT FROM CACHE`]);
      res.status(200).json({ data: theFirstsRss });
    } else {
      // FILL CACHE
      fetchTheFirsts()
      if (theFirstsRss) res.status(200).json({ data: theFirstsRss });
    }
  } catch (err) {
    res.status(400).send({ data: err });
  }
});

router.get("/onepath", async (req: Request, res: Response) => {
  try {
    if (onepath) {
      // SENT FORM CACHE
      console.log([`/ONEPATH - SENT FROM CACHE`]);
      res.status(200).json({ data: onepath });
    } else {
      var rss: RssTypes = await parse(
        "https://feeds.buzzsprout.com/2042303.rss"
      );
      // FILL CACHE
      onepath = rss;
      if (rss) res.status(200).json({ data: rss });
    }
  } catch (err) {
    res.status(400).json({ data: "error" });
    res.end();
  }
});

export default router;
