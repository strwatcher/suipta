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
        console.log(path2);
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
var config2 = await resolveConfig();
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
