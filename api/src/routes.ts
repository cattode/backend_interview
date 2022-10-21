import Hapi from "@hapi/hapi";

export const routes: Hapi.ServerRoute<Hapi.ReqRefDefaults>[] = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!";
    },
  },
];
