import { Diary } from '@/model'
import PaginatedResponse from '@/schemas/out/PaginatedResponse'
import { ObjectType } from 'type-graphql'

@ObjectType()
export class PaginatedDiaryResponse extends PaginatedResponse(Diary) {}
