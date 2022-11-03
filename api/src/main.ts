import Hapi from "@hapi/hapi";
import { routes } from "./routes";
import { AMQPClient } from "@cloudamqp/amqp-client";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route(routes);

  await server.start();
  console.log("Server running on %s", server.info.uri);

  try {
    const amqp = new AMQPClient("amqp://localhost");
    const conn = await amqp.connect();
    const ch = await conn.channel();
    const q = await ch.queue("api");

    let myCounter = 0;
    //console.log({ conn, ch, q });
    const consumer = await q.subscribe({ noAck: true }, async (msg) => {
      //console.log(msg.bodyToString());
      if (myCounter <= 10) {
        queueTest[myCounter] = msg.bodyToString() || "";
        myCounter = myCounter + 1;
        if (myCounter == 10) {
          console.log({ queueTest });
        }
      }
    });

    //await q.publish("Hello World", {deliveryMode: 2})
    await consumer.wait(); // will block until consumer is canceled or throw an error if server closed channel/connection*/
    await conn.close();
  } catch (e) {
    console.error("ERROR", e);
    //e.connection.close()
    //setTimeout(run, 1000) // will try to reconnect in 1s
  }
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();

export const queueTest: string[] = ["Salut"];
