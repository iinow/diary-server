import { ObjectType, Field, Int } from 'type-graphql'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  schema: 'book',
})
@ObjectType({ description: '책 타입 정의' })
export class Book extends BaseEntity {
  constructor(id: number, authorId: number, name: string) {
    super()
    this.id = id
    this.authorId = authorId
    this.name = name
    this.createAt = new Date()
  }

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number

  @Column()
  @Field(() => Int)
  authorId!: number

  @Column()
  @Field()
  name!: string

  @Column()
  @Field(() => Date)
  createAt!: Date
}
