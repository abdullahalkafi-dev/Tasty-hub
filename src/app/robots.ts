import { MetadataRoute } from "next";

export default function robots():MetadataRoute.Robots{
const baseUrl = "https://tasty-hub-chi.vercel.app";

return {
    rules:{
        userAgent: "*",
        allow: ["/","/recipe","/blog"],
        disallow:[]
    },
    sitemap: `${baseUrl}/sitemap.xml`
}
}