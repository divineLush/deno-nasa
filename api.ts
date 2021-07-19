import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const router = new Router();
router.get("/", (context) => {
  context.response.body = "Hello World";
});

export default router;
