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
  console.log(thefirsts);
  try {
    if (thefirsts) {
      thefirstsHead = thefirsts
      thefirstsHead.items = []

      // SENT FORM CACHED
      console.log([`/THEFIRSTSHEAD - SENT FROM CACHE`]);
      res.status(200).json({ data: thefirstsHead });
    } else {
      var rss: RssTypes = await parse(
        "https://feeds.buzzsprout.com/1194665.rss"
      );
      // FILL CACHE
      thefirsts = rss;

      // FILL THEFIRSTSHEAD
      thefirstsHead = thefirsts
      thefirstsHead.items = []
      if (rss) res.status(200).json({ data: thefirstsHead });
    }
  } catch (error) {
  }
});

router.get("/thefirsts", async (req: Request, res: Response) => {
  try {
    if (thefirsts) {
      // SENT FORM CACHE
      console.log([`/THEFIRSTS - SENT FROM CACHE`]);
      res.status(200).json({ data: thefirsts });
    } else {
      var rss: RssTypes = await parse(
        "https://feeds.buzzsprout.com/1194665.rss"
      );
      // const sendRss = {
      //   title: rss.title,
      //   description: rss.description,
      //   link: rss.link,
      //   image: rss.image,
      //   items: rss.items.slice(0, 8),
      // };

      // FILL CACHE
      thefirsts = rss;
      if (rss) res.status(200).json({ data: rss });
    }
  } catch (err) {
    res.status(400).json({ data: "error" });
    res.end();
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
