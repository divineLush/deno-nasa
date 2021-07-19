// Deno includes:
// 1. Test runner in the CLI
// 2. Assertions in the standard library
// 3. Built-in text features with Deno.test()
// run tests with "deno test"

import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { filterHabitablePlanets } from "./planets.ts";

// Deno.test({
//   name: "dummy test",
// if ignore is true test isn't gonna run
// run this test only on linux
//   ignore: Deno.build.os !== "linux",
//   fn() {
//     console.log("hello from out tests");
//     assertEquals("deno", "deno");
//     assertNotEquals("node", "deno");
//   },
// });

const HABITABLE_PLANET = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1",
};

const NOT_CONFIRMED = {
  koi_disposition: "FALSE POSITIVE",
};

const TOO_LARGE_RADIUS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1.01",
  koi_smass: "1",
};

const TOO_LARGE_MASS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1.04",
};

Deno.test("filter only habitable planets", () => {
  const filtered = filterHabitablePlanets([
    HABITABLE_PLANET,
    NOT_CONFIRMED,
    TOO_LARGE_RADIUS,
    TOO_LARGE_MASS,
  ]);

  assertEquals(filtered, [HABITABLE_PLANET]);
});
