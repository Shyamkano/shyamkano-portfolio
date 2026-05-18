import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shyamkano-portfolio.vercel.app';

  const routes = [
    '',
    '/about',
    '/projects',
    '/research',
    '/blogs',
    '/skills',
    '/journey',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return routes;
}
