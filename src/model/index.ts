import { User } from '@/model/User'
import { Diary } from '@/model/Diary'
import { Message } from '@/model/Message'

export { User } from '@/model/User'
export { Diary } from '@/model/Diary'
export { Message, MessagePayload } from '@/model/Message'
export * from '@/model/Noti'

export default [User, Diary, Message]
