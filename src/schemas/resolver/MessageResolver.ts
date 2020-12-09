import {
  Arg,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql'
import { Message } from '@/model'
import { from } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { flatMap } from 'rxjs/internal/operators'
import { MessageOut } from '@/schemas/out/MessageOut'

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  messages(): Promise<Message[]> {
    return from(Message.find({ relations: ['user'] })).toPromise()
  }

  @Mutation(() => Number)
  publishMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg('topic') topic: string,
    @Arg('message', { nullable: false }) message: string
  ): Promise<number> {
    return from(Message.insert({ text: message }))
      .pipe(
        flatMap((data) => Message.findOne(data.raw.insertId)),
        tap((data) => pubSub.publish(topic, data)),
        map((data) => data!.id)
      )
      .toPromise()
  }

  @Subscription(() => MessageOut, { topics: ({ args }) => args.topic })
  subscriptionMessage(
    @Arg('topic') topic: string,
    @Root() messages: Message
  ): MessageOut {
    return {
      text: messages.text,
      createdAt: new Date(messages.createAt),
      updatedAt: new Date(messages.updatedAt),
    }
  }
}
