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
  schema: 'journal',
})
@ObjectType({ description: '일기 그룹' })
export class Journal extends BaseEntity {
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

  @Column({ name: 'name', nullable: true })
  @Field(() => String, { description: '저널 이름', nullable: true })
  name?: string

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date, { description: '업데이트 날짜' })
  updatedAt!: Date

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date, { description: '등록 날짜' })
  createdAt!: Date

  public static createEntity(user: User) {
    const journal = Journal.create()
    journal.user = user
    return journal
  }
}

export default Journal
