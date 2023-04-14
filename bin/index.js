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
import fs from "node:fs";
import path2 from "node:path";
var resolveConfig = (configPath) => {
  let userConfig;
  if (configPath.includes("yaml")) {
    userConfig = loadYamlConfig(configPath);
  }
  return { ...config, ...userConfig };
};
var loadYamlConfig = (configPath) => {
  if (!fs.existsSync(configPath)) {
    return {};
  }
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
import path3 from "node:path";
var writeArguments = (args) => {
  const yamlString = yaml2.stringify(args);
  fs2.writeFileSync(
    path3.join(__packageDir, "arguments.yaml"),
    yamlString,
    "utf-8"
  );
};

// src/executable.ts
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
