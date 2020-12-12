import '@/app'
import init from '@/config/db'
export { default as RedisClient, pubSub } from '@/config/redis'

init()
