import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ALGOWAYS — Technology Behind Smarter Markets",
    short_name: "ALGOWAYS",
    description:
      "מרכז האתרים והשירותים של ALGOWAYS בתחומי טכנולוגיה פיננסית, מסחר ותשתיות.",
    start_url: "/",
    display: "standalone",
    background_color: "#071723",
    theme_color: "#071723",
    lang: "he",
    dir: "rtl",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
