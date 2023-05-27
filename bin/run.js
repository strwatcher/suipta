#!/usr/bin/env node

// src/run.ts
import { run } from "cmd-ts";

// src/index.ts
import {
  command,
  string,
  option,
  optional,
  positional,
  oneOf,
  subcommands
} from "cmd-ts";

// src/config/config.default.ts
var config = {
  layers: ["entities", "features", "widgets", "pages", "processes"],
  segmentLayers: ["shared"],
  segment: ["ui", "lib"],
  rootDir: "src"
};

// src/config/resolve.ts
import yaml from "yaml";
import fs, { promises } from "node:fs";

// src/config/paths.ts
var paths = [
  // 'suipta.config.ts',
  "suipta.config.js",
  "suipta.config.cjs",
  "suipta.config.yaml",
  "suipta.config.yml",
  "suipta.config.json"
];

// src/config/resolve.ts
import path from "node:path";
var resolveConfig = async (configPath) => {
  let paths2;
  if (configPath) {
    paths2 = [configPath, ...paths];
  } else {
    paths2 = [...paths];
  }
  let userConfig;
  for (const configPath2 of paths2) {
    if (fs.existsSync(configPath2)) {
      if (/.*\.js$/.test(configPath2)) {
        userConfig = (await import(path.join(process.cwd(), configPath2))).default;
      } else if (/.*\.(yml|yaml)$/.test(configPath2)) {
        userConfig = loadYamlConfig(configPath2);
      } else if (/.*\.json$/.test(configPath2)) {
        userConfig = await loadJsonConfig(configPath2);
      }
    }
  }
  return { ...config, ...userConfig };
};
var loadJsonConfig = async (configPath) => {
  try {
    const data = await promises.readFile(configPath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    throw new Error(e);
  }
};
var loadYamlConfig = (configPath) => {
  const config3 = yaml.parse(fs.readFileSync(configPath).toString());
  return config3;
};

// src/arguments/types.ts
var models = ["effector", "redux"];
var uis = ["react", "solid"];
var languages = ["js", "ts"];

// src/arguments/index.ts
import yaml2 from "yaml";

// src/helpers/index.ts
import path2, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __packageDir = dirname(fileURLToPath(import.meta.url));
var __dirname = process.cwd();
var plopPath = path2.join(__packageDir, "plop.js");
var plopfilePath = path2.join(__packageDir, "plopfile.js");
var argumentsPath = path2.join(__packageDir, "arguments.yaml");

// src/arguments/index.ts
import fs2 from "node:fs";
var writeArguments = (args, filePath) => {
  const yamlString = yaml2.stringify(args);
  if (fs2.existsSync(filePath ?? argumentsPath)) {
    fs2.rmSync(filePath ?? argumentsPath);
  }
  fs2.writeFileSync(filePath ?? argumentsPath, yamlString, "utf-8");
};

// src/plop/index.ts
import nodePlop from "node-plop";
var runPlop = async (args, customPath) => {
  const plop = await nodePlop(customPath ?? plopfilePath);
  const generator = plop.getGenerator(args.generator);
  const plopArgs = [];
  if (args.layer) {
    plopArgs.push(args.layer);
  }
  if (args.generator === "slice") {
    if (args.slice) {
      plopArgs.push(args.slice);
    }
  }
  if (args.generator === "segment") {
    if (args.segment) {
      plopArgs.push(args.segment);
    }
    if (args.component) {
      plopArgs.push(args.component);
    }
  }
  const answers = await generator.runPrompts(plopArgs);
  const result = await generator.runActions(answers);
  return result;
};

// src/plop/result.ts
import chalk from "chalk";
var printResult = (result) => {
  if (result.failures.length > 0) {
    result.failures.forEach((failure) => console.log(chalk.red(failure.error)));
  } else {
    result.changes.forEach((change) => console.log(chalk.green(change.path)));
  }
};

// src/suipta-handler.ts
async function suiptaHandler(args) {
  writeArguments(args);
  const result = await runPlop(args);
  printResult(result);
}

// src/index.ts
var config2 = await resolveConfig("suipta.config.yaml");
var segment = command({
  name: "segment",
  args: {
    layer: positional({
      type: optional(oneOf(config2.segmentLayers)),
      displayName: "layer"
    }),
    segment: positional({
      type: optional(oneOf(config2.segment)),
      displayName: "segment"
    }),
    component: positional({
      type: optional(string),
      displayName: "component"
    }),
    configPath: option({
      type: optional(string),
      long: "configPath",
      short: "c"
    })
  },
  handler: async (args) => {
    suiptaHandler({ ...args, generator: "segment" });
  }
});
var slice = command({
  name: "slice",
  args: {
    layer: positional({
      type: optional(oneOf(config2.layers)),
      displayName: "layer"
    }),
    slice: positional({ type: optional(string), displayName: "slice" }),
    model: option({ type: optional(oneOf(models)), long: "model", short: "m" }),
    ui: option({ type: optional(oneOf(uis)), long: "ui" }),
    language: option({
      type: optional(oneOf(languages)),
      long: "language",
      short: "l"
    }),
    configPath: option({
      type: optional(string),
      long: "configPath",
      short: "c"
    })
  },
  handler: async (args) => {
    suiptaHandler({ ...args, generator: "slice" });
  }
});
var app = subcommands({
  name: "suipta",
  cmds: { slice, segment }
});

// src/run.ts
console.log("here");
run(app, process.argv.slice(2));
