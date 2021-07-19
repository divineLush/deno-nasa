import { Application } from "https://deno.land/x/oak@v7.7.0/mod.ts";

const app = new Application();
const port = 8000;

// next is async function that allows to control when the next middleware gets called
app.use(async (context, next) => {
  await next();
  // after next resolves we can access everything
  // that the downstream(next) middleware has done
  const time = context.response.headers.get("X-Response-Time");
  console.log(`${context.request.method} ${context.request.url}: ${time}`);
});

app.use(async (context, next) => {
  const start = Date.now();
  await next();
  const delta = Date.now() - start;
  context.response.headers.set("X-Response-Time", `${delta}ms`);
});

// endpoint
// a middleware that doesn't call any downstream middleware
app.use((context) => {
  context.response.body = "Hello World";
});

if (import.meta.main) {
  app.listen({ port });
}
