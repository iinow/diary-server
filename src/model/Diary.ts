import { ObjectType, Field, Int } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '@/model/User'

@Entity({
  schema: 'diary',
})
@ObjectType({ description: '일기' })
export class Diary extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number

  @ManyToOne(() => User, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: false,
    lazy: true,
  })
  @JoinColumn([{ name: 'user_uid', referencedColumnName: 'uid' }])
  user!: User

  @Column({ name: 'content' })
  @Field(() => String)
  content!: string

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt!: Date

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createdAt!: Date
}

export default Diary
