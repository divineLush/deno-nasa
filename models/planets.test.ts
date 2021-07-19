// Deno includes:
// 1. Test runner in the CLI
// 2. Assertions in the standard library
// 3. Built-in text features with Deno.test()
import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test("shorthand version of dummy test", () => {
  assertEquals(0, 0);
});

Deno.test({
  name: "dummy test",
  // if ignore is true test isn't gonna run
  // run this test only on linux
  ignore: Deno.build.os !== "linux",
  fn() {
    console.log("hello from out tests");
    assertEquals("deno", "deno");
    assertNotEquals("node", "deno");
  },
});
