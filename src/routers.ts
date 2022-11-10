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
let onePathRss: RssTypes;
// HEAD
let thefirstsHead: ThefirstsHead;

async function fetchTheFirsts() {
  const res: RssTypes = await parse(
    "https://feeds.buzzsprout.com/1194665.rss"
  );
  theFirstsRss = res
  thefirstsHead = { ...res }
  thefirstsHead.items = []

} fetchTheFirsts()

async function fetchOnePath() {
  const res: RssTypes = await parse(
    "https://feeds.buzzsprout.com/2042303.rss"
  );
  onePathRss = res
} fetchOnePath()

router.get("/thefirstshead", async (req: Request, res: Response) => {
  try {
    if (theFirstsRss) {
      // SENT FORM CACHED
      console.log([`/THEFIRSTSHEAD - SENT FROM CACHE`]);
      res.status(200).json({ data: thefirstsHead });
    } else {
      fetchTheFirsts()
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
    if (onePathRss) {
      // SENT FORM CACHE
      console.log([`/ONEPATH - SENT FROM CACHE`]);
      res.status(200).json({ data: onePathRss });
    } else {
      // FILL CACHE
      fetchOnePath()
      if (onePathRss) res.status(200).json({ data: onePathRss });
    }
  } catch (err) {
    res.status(400).send({ data: err });
  }
});

export default router;
