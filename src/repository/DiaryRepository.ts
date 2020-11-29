import { EntityRepository, Repository } from 'typeorm'
import { Diary } from '@/model'

@EntityRepository(Diary)
class DiaryRepository extends Repository<Diary> {}

export default DiaryRepository
