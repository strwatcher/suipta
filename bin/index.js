#!/usr/bin/env node

// src/executable.ts
import path from "node:path";
import minimist from "minimist";
import { Plop, run } from "plop";

// src/helpers/index.ts
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __packageDir = dirname(fileURLToPath(import.meta.url));
var __dirname = process.cwd();

// src/executable.ts
var args = process.argv.slice(2);
var argv = minimist(args);
Plop.prepare(
  {
    cwd: argv.cwd,
    configPath: path.join(__packageDir, "./plopfile.js"),
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
