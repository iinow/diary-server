import { ObjectType, Field, Int } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '@/model/User'

@Entity({
  schema: 'messages',
})
@ObjectType({ description: '메시지 타입 정의' })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number

  @ManyToOne(() => User)
  user!: User

  @Column()
  @Field()
  text!: string

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt!: Date

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createAt!: Date
}

export interface MessagePayload {
  id: number
  text: string
  createAt: Date
}
