import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const count = await redis.incr('visitor_count');
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
