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

export interface RssHead {
  title: string;
  description: string;
  link: string;
  image: string;
  items: any;
}
