import { remove } from 'bull/lib/job';
import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (error) => {
      console.error(error);
    });
  }

  isAlive() {
    if (this.client.connected) {
      return true;
    } else {
      return false;
    }
  }

  /* asynchronous function get that takes a string key as argument and returns the Redis value stored for this key */
  async get(key) {
    const valueByKey = await this.client.get(key);
    return await valueByKey;
  }

  /* asynchronous function set that takes a string key, a value and a duration in second as arguments to store it in Redis */
  async set(key, value, setTimeout) {
    const storedValue = this.client.set(key, value, setTimeout);
    return await storedValue;
  }

  /* asynchronous function del that takes a string key as argument and remove the value in Redis for this key */
  async del(key) {
    this.client.remove(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
