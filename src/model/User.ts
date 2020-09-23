import { ObjectType, Field, Int} from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import {Diary} from "~/model/Diary";

@Entity({
  schema: 'user'
})
@ObjectType({ description: '사용자' })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number

  @Column()
  @Field({ name: 'user_id' })
  userId!: string

  // @OneToMany(() => Diary, diaries => diaries.user)
  // diaries?: Diary[]

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createAt!: Date
}

export default User
