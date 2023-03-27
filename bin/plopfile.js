// src/plopfile.ts
import path2 from "node:path";

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

// src/helpers/index.ts
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __packageDir = dirname(fileURLToPath(import.meta.url));
var __dirname = process.cwd();
var plopPath = path.join(__packageDir, "plop.js");
var plopfilePath = path.join(__packageDir, "plopfile.js");

// src/plopfile.ts
var config2 = resolveConfig("suipta.config.yaml");
function plopfile_default(plop) {
  plop.setGenerator("slice", {
    prompts: [
      {
        type: "list",
        name: "layer",
        choices: config2.layers,
        message: "Choose the layer in which slice will be created"
      },
      {
        type: "input",
        name: "slice",
        message: "Enter the name of slice"
      }
    ],
    actions: [
      {
        type: "addMany",
        destination: path2.join(
          __dirname,
          config2.rootDir,
          "{{kebabCase layer}}/{{kebabCase slice}}/"
        ),
        base: path2.join(config2.templatesDir, "{{layer}}"),
        templateFiles: path2.join(config2.templatesDir, "{{layer}}/**/*")
      }
    ]
  });
}
export {
  plopfile_default as default
};
