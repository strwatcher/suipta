#!/usr/bin/env node

// src/executable.ts
import { fork } from "node:child_process";
import { command, run, string, option, optional } from "cmd-ts";
import path2 from "node:path";

// src/helpers/index.ts
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __packageDir = dirname(fileURLToPath(import.meta.url));
var __dirname = process.cwd();
var plopPath = path.join(__packageDir, "plop.js");
var plopfilePath = path.join(__packageDir, "plopfile.js");

// src/executable.ts
var app = command({
  name: "suipta",
  args: {
    configPath: option({
      type: optional(string),
      long: "config-path",
      short: "c"
    })
  },
  handler: ({ configPath }) => {
    fork(path2.join(__packageDir, "plop.js"));
  }
});
run(app, process.argv.slice(2));
