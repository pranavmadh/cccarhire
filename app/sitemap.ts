import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.cccarhirepraslin.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/vehicles`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/chauffeur`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/praslin`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/transfer`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
