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
import { v4 as uuid } from 'uuid'

export type RegisterUser = {
  id: string
  name: string
  profileImageUrl?: string
  provider: Provider
}
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

  @Column({ name: 'profile_image_url' })
  @Field(() => String)
  profileImageUrl?: string

  @Column({ name: 'provider' })
  @Field()
  provider!: Provider

  @UpdateDateColumn({ name: 'updated_at' })
  @Field(() => Date)
  updatedAt!: Date

  @CreateDateColumn({ name: 'created_at' })
  @Field(() => Date)
  createAt!: Date

  public static createEntity(profile: RegisterUser): Promise<User> {
    const newUser = User.create()
    newUser.uid = uuid()
    newUser.userId = profile.id
    newUser.userName = profile.name
    newUser.provider = profile.provider
    return newUser.save()
  }

  public updateEntity(profile: RegisterUser): Promise<User> {
    this.userName = profile.name
    this.profileImageUrl = profile.profileImageUrl
    return this.save({
      reload: true,
    })
  }
}

export default User
