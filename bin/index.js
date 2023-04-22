#!/usr/bin/env node

// src/index.ts
import {
  command,
  run,
  string,
  option,
  optional,
  positional,
  oneOf
} from "cmd-ts";

// src/plop/index.ts
import nodePlop from "node-plop";

// src/helpers/index.ts
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __packageDir = dirname(fileURLToPath(import.meta.url));
var __dirname = process.cwd();
var plopPath = path.join(__packageDir, "plop.js");
var plopfilePath = path.join(__packageDir, "plopfile.js");
var argumentsPath = path.join(__packageDir, "arguments.yaml");

// src/plop/index.ts
var runPlop = async (args, customPath) => {
  const plop = await nodePlop(customPath ?? plopfilePath);
  const generator = plop.getGenerator(args.generator ?? "slice");
  const plopArgs = [];
  if (args.layer) {
    plopArgs.push(args.layer);
  }
  if (args.slice) {
    plopArgs.push(args.slice);
  }
  const answers = await generator.runPrompts(plopArgs);
  const result = await generator.runActions(answers);
  return result;
};

// src/config/config.default.ts
var config = {
  layers: [
    "shared",
    "entities",
    "features",
    "widgets",
    "pages",
    "processes",
    "app"
  ],
  rootDir: "src"
};

// src/config/resolve.ts
import yaml from "yaml";
import fs, { promises } from "node:fs";

// src/config/paths.ts
var paths = [
  "suipta.config.yaml",
  "suipta.config.yml",
  "suipta.config.json"
];

// src/config/resolve.ts
var resolveConfig = async (configPath) => {
  let paths2;
  if (configPath) {
    paths2 = [configPath, ...paths];
  } else {
    paths2 = [...paths];
  }
  let userConfig;
  for (const path2 of paths2) {
    if (fs.existsSync(path2)) {
      if (/.*\.(yml|yaml)$/.test(path2)) {
        userConfig = loadYamlConfig(path2);
      } else if (/.*\.(json)$/.test(path2)) {
        userConfig = await loadJsonConfig(path2);
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

// src/plop/result.ts
import chalk from "chalk";
var printResult = (result) => {
  if (result.failures.length > 0) {
    result.failures.forEach((failure) => console.log(chalk.red(failure.error)));
  } else {
    result.changes.forEach((change) => console.log(chalk.green(change.path)));
  }
};

// src/arguments/types.ts
var models = ["effector", "redux"];
var uis = ["react", "solid"];
var languages = ["js", "ts"];

// src/arguments/index.ts
import yaml2 from "yaml";
import fs2 from "node:fs";
var writeArguments = (args, filePath) => {
  const yamlString = yaml2.stringify(args);
  if (fs2.existsSync(filePath ?? argumentsPath)) {
    fs2.rmSync(filePath ?? argumentsPath);
  }
  fs2.writeFileSync(filePath ?? argumentsPath, yamlString, "utf-8");
};
var getArguments = (filePath) => {
  const args = yaml2.parse(
    fs2.readFileSync(filePath ?? argumentsPath, "utf8").toString()
  );
  return args;
};

// src/index.ts
var config2 = await resolveConfig("suipta.config.yaml");
var app = command({
  name: "suipta",
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
  handler: async ({ layer, slice, model, ui, language, configPath }) => {
    writeArguments({ model, ui, language, configPath });
    const result = await runPlop({ layer, slice, generator: "slice" });
    printResult(result);
    return layer;
  }
});
var suiptaHandler = app.handler;
run(app, process.argv.slice(2));
export {
  __dirname,
  __packageDir,
  app,
  argumentsPath,
  getArguments,
  languages,
  models,
  plopPath,
  plopfilePath,
  resolveConfig,
  runPlop,
  suiptaHandler,
  uis,
  writeArguments
};
