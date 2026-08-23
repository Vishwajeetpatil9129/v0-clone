export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: "https://omnix-ashen.vercel.app/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://omnix-ashen.vercel.app/pricing",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}