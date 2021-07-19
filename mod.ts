import { Application } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const app = new Application();
const port = 8000;

app.use((context) => {
  context.response.body = "Hello World";
});

if (import.meta.main) {
  app.listen({ port });
}
