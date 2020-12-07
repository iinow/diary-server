import redis from 'redis'
import IORedis from 'ioredis'
import { RedisPubSub } from 'graphql-redis-subscriptions'

const option: IORedis.RedisOptions = {
  host: process.env.redisHost,
  port: process.env.redisPort,
  retryStrategy: (times) => Math.max(times * 100, 3000),
}

export const pubSub = new RedisPubSub({
  publisher: new IORedis(option),
  subscriber: new IORedis(option),
})

const client = redis.createClient({
  host: process.env.redisHost,
  port: process.env.redisPort,
})

export default client
