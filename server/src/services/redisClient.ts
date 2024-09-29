import { createClient } from 'redis';

// Connect to our Database
const redisClient = createClient();

redisClient.on('connect', () => {
  console.log('##########################################################');
  console.log('#####            REDIS STORE CONNECTED               #####');
  console.log('##########################################################\n');
});

redisClient.on('error', err => {
  console.log(`Redis error: ${err}`);
});

// Connect to the Redis server
redisClient.connect().catch(console.error);

export default redisClient;
