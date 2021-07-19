import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";

// interface Planet {
//   [key: string]: string;
// }

type Planet = Record<string, string>;

export const filterHabitablePlanets = (planets: Planet[]) =>
  planets
    .filter((planet: any) => {
      const getVal = (val: string) => Number(planet[val]);

      const radius = getVal("koi_prad");
      const mass = getVal("koi_smass");
      const stellarRadius = getVal("koi_srad");

      return planet["koi_disposition"] === "CONFIRMED" && radius > 0.5 &&
        radius < 1.5 && mass > 0.78 && mass < 1.04 && stellarRadius > 0.99 &&
        stellarRadius < 1.01;
    });

export const mapPlanets = (planets: Planet[]) =>
  // NOTE: keep in sync with loadPlanets in /public/script.js
  planets.map((planet) => ({
    name: planet.kepler_name,
    numberOfPlanets: planet.koi_count,
    temperature: planet.koi_steff,
    planetaryRadius: planet.koi_prad,
    stellarMass: planet.koi_smass,
    stellarRadius: planet.koi_srad,
  }));

export default await (async () => {
  const path = join("data", "kepler_exoplanets_nasa.csv");
  const file = await Deno.open(path);

  const bufReader = new BufReader(file);
  const data = await parse(bufReader, {
    skipFirstRow: true,
    comment: "#",
  });
  Deno.close(file.rid);

  return mapPlanets(filterHabitablePlanets(data as Array<Planet>));
})();
