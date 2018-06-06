import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const options = {
  host: process.env.BROKER_HOST,
  port: process.env.BROKER_PORT,
  retry_strategy: options => {
    // reconnect after
    return Math.max(options.attempt * 100, 3000);
  }
};

export const pubsub = new RedisPubSub({
  connection: options,
  publisher: new Redis(options),
  subscriber: new Redis(options)
});
