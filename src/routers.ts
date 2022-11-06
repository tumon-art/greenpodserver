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

// CACHED
let thefirsts: RssTypes;

router.get("/thefirsts", async (req: Request, res: Response) => {
  try {
    if (thefirsts) {
      // SENT FORM CACHE
      console.log([`SENT FROM CACHE`]);
      res.status(200).send({ data: thefirsts });
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

export default router;
