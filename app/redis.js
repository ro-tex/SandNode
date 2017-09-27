const redis = require('redis');
const client = redis.createClient();

// https://github.com/NodeRedis/node_redis
// http://redis.js.org/

client.on("error", function(err) {
  console.log("Error " + err);
});

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function(err, replies) {
  console.log(replies.length + " replies:");
  replies.forEach(function(reply, i) {
    console.log("    " + i + ": " + reply);
  });
  client.quit();
});
