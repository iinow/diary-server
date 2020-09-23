import { ObjectType, Field, Int} from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from './User'

@Entity({
  schema: 'diary'
})
@ObjectType({ description: '일기' })
export class Diary extends BaseEntity {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number

  @ManyToOne(() => User)
  user!: User

  @Column({ name: 'content' })
  @Field()
  content!: string

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createAt!: Date
}
