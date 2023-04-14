#!/usr/bin/env node

// src/executable.ts
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

// src/plop/index.ts
var runPlop = async (args, customPath) => {
  const plop = await nodePlop(customPath ?? plopfilePath);
  const generator = plop.getGenerator(args.generator);
  const answers = await generator.runPrompts([args.layer, args.slice]);
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
  rootDir: "src",
  templatesDir: "../templates"
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
  for (const path3 of paths2) {
    if (fs.existsSync(path3)) {
      if (/.*\.(yml|yaml)$/.test(path3)) {
        userConfig = loadYamlConfig(path3);
      } else if (/.*\.(json)$/.test(path3)) {
        console.log(path3);
        userConfig = await loadJsonConfig(path3);
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
var models = ["effector", "mobx", "redux"];
var uis = ["react", "solid"];
var languages = ["js", "ts"];

// src/arguments/index.ts
import yaml2 from "yaml";
import fs2 from "node:fs";
import path2 from "node:path";
var writeArguments = (args, filePath) => {
  const yamlString = yaml2.stringify(args);
  fs2.writeFileSync(
    filePath ?? path2.join(__packageDir, "arguments.yaml"),
    yamlString,
    "utf-8"
  );
};

// src/executable.ts
var config2 = await resolveConfig("suipta.config.yaml");
var app = command({
  name: "suipta",
  args: {
    layer: positional({ type: oneOf(config2.layers), displayName: "layer" }),
    slice: positional({ type: string, displayName: "slice" }),
    model: option({ type: optional(oneOf(models)), long: "model", short: "m" }),
    ui: option({ type: optional(oneOf(uis)), long: "ui" }),
    language: option({
      type: optional(oneOf(languages)),
      long: "language",
      short: "l"
    })
  },
  handler: async ({ layer, slice, model, ui, language }) => {
    writeArguments({ model, ui, language });
    const result = await runPlop({ layer, slice, generator: "slice" });
    printResult(result);
  }
});
run(app, process.argv.slice(2));
