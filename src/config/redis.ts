import redis from 'redis'

const client = redis.createClient({
  host: 'localhost',
  port: 6379,
})

export default client
