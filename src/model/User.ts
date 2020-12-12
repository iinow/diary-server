import { Provider } from '@/common/constants'
import { ObjectType, Field } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({
  schema: 'user',
})
@ObjectType({ description: '사용자' })
export class User extends BaseEntity {
  @PrimaryColumn({ name: 'uid' })
  @Field(() => String)
  uid!: string

  @Column({ name: 'user_id' })
  @Field(() => String)
  userId!: string

  @Column({ name: 'user_name' })
  @Field(() => String)
  userName!: string

  @Column({ name: 'provider' })
  @Field()
  provider!: Provider

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt!: Date

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createAt!: Date
}

export default User
