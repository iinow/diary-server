import {
  Arg,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
} from 'type-graphql'
import { Message } from '@/model'
import { from } from 'rxjs'
import init from '@/config/db'
import { map } from 'rxjs/operators'
import { MessageRepository } from '@/repository'
import { flatMap } from 'rxjs/internal/operators'
import { ObjectLiteral } from 'typeorm'

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  messages(): Promise<Message[]> {
    return from(init())
      .pipe(
        map((con) => con.getCustomRepository(MessageRepository)),
        flatMap((repo) => repo.find({ relations: ['user'] }))
      )
      .toPromise()
  }

  @Mutation(() => [Number])
  publishMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg('topic') topic: string,
    @Arg('message', { nullable: false }) message: string
  ): Promise<ObjectLiteral[]> {
    return from(Message.insert({ text: message }))
      .pipe(map((data) => data.identifiers.map((d) => d.id)))
      .toPromise()
  }
}
