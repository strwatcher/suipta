// src/plopfile.ts
import path3 from "node:path";

// src/arguments/index.ts
import yaml from "yaml";

// src/helpers/index.ts
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __packageDir = dirname(fileURLToPath(import.meta.url));
var __dirname = process.cwd();
var plopPath = path.join(__packageDir, "plop.js");
var plopfilePath = path.join(__packageDir, "plopfile.js");

// src/arguments/index.ts
import fs from "node:fs";
import path2 from "node:path";
var getArguments = (filePath) => {
  const args2 = yaml.parse(
    fs.readFileSync(
      filePath ?? path2.join(__packageDir, "arguments.yaml"),
      "utf8"
    ).toString()
  );
  return args2;
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
import yaml2 from "yaml";
import fs2, { promises } from "node:fs";

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
  for (const path4 of paths2) {
    if (fs2.existsSync(path4)) {
      if (/.*\.(yml|yaml)$/.test(path4)) {
        userConfig = loadYamlConfig(path4);
      } else if (/.*\.(json)$/.test(path4)) {
        console.log(path4);
        userConfig = await loadJsonConfig(path4);
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
  const config3 = yaml2.parse(fs2.readFileSync(configPath).toString());
  return config3;
};

// src/plopfile.ts
var config2 = resolveConfig("suipta.config.yaml");
var args = getArguments();
console.log("plopfile arguments", args);
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
        destination: path3.join(
          __dirname,
          config2.rootDir,
          "{{kebabCase layer}}/{{kebabCase slice}}/"
        ),
        base: path3.join(config2.templatesDir, "{{layer}}"),
        templateFiles: path3.join(config2.templatesDir, "{{layer}}/**/*")
      }
    ]
  });
}
export {
  plopfile_default as default
};
