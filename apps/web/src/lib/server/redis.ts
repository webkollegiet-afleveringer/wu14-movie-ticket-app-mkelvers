import { REDIS_URL } from "$env/static/private"
import { createClient } from "redis"


export const redisClient = createClient({
  url: REDIS_URL,
})

await redisClient.connect();

