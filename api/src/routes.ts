import Hapi from "@hapi/hapi";
import { queueTest } from "./main";

export const routes: Hapi.ServerRoute<Hapi.ReqRefDefaults>[] = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World! Test";
    },
  },
  {
    method: "GET",
    path: "/lastMessages",
    handler: (request, h) => {
      return queueTest;
    },
  },
];
