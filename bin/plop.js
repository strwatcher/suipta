// src/plop.ts
import minimist from "minimist";
import { Plop, run } from "plop";

// src/helpers/index.ts
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __packageDir = dirname(fileURLToPath(import.meta.url));
var __dirname = process.cwd();
var plopPath = path.join(__packageDir, "plop.js");
var plopfilePath = path.join(__packageDir, "plopfile.js");

// src/plop.ts
var args = process.argv.slice(2);
var argv = minimist(args);
Plop.prepare(
  {
    cwd: argv.cwd,
    configPath: plopfilePath,
    preload: argv.preload || [],
    completion: argv.completion ?? true
  },
  (env) => Plop.execute(env, (env2) => {
    const options = {
      ...env2
    };
    return run(options, void 0, true);
  })
);
