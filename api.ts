import { Router, send } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import planets from "./models/planets.ts";

const router = new Router();
router.get("/", async (context) => {
  await send(context, "/index.html", { root: `${Deno.cwd()}/public` });
});

router.get("/planets", (context) => {
  context.response.body = planets;
});

router.get("/hello", (context) => {
  context.response.body = "Hello World";
});

export default router;
