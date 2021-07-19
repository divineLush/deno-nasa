import { Router } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import planets from "./models/planets.ts";

const router = new Router();
router.get("/", (context) => {
  context.response.body = "Hello World";
});

router.get("/planets", (context) => {
  context.response.body = planets;
});

export default router;
