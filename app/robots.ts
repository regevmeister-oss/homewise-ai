export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://ourhome-sigma.vercel.app/sitemap.xml",
  };
}
