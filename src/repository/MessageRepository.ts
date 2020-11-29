import { EntityRepository, Repository } from 'typeorm'
import { Diary, Message } from '@/model'

@EntityRepository(Diary)
class MessageRepository extends Repository<Message> {}

export default MessageRepository
