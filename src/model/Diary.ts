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
import { DiaryInput } from '@/schemas/input'
import Journal from '@/model/Journal'

@Entity({
  schema: 'diary',
})
@ObjectType({ description: '일기' })
export class Diary extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number

  @ManyToOne(() => Journal, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: false,
    lazy: true,
  })
  @JoinColumn([{ name: 'journal_id', referencedColumnName: 'id' }])
  journal!: Journal

  @Column({ name: 'title' })
  @Field(() => String, { description: '일기 제목' })
  title!: string

  @Column({ name: 'content' })
  @Field(() => String, { description: '일기 내용' })
  content!: string

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date, { description: '업데이트 날짜' })
  updatedAt!: Date

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date, { description: '등록 날짜' })
  createdAt!: Date

  public static createEntity(journal: Journal) {
    const res = this.create()
    res.journal = journal
    return res
  }

  public updateDiaryInput(diaryInput: DiaryInput) {
    this.title = diaryInput.title
    this.content = diaryInput.content
  }
}

export default Diary
