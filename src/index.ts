// import { allroutes } from "./routes/routes.js";
// import { serve } from "@hono/node-server";



// serve(allroutes,(info)=>{
//   console.log(`Server is running on port ${info.port}`)
// })

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { allroutes } from "./routes/routes.js";

const app = new Hono();






serve(allroutes, ({ port }) => {
  console.log(`\tRunning @ http://localhost:${port}`);
});