// src/plopfile.ts
import path4 from "node:path";

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
var getArguments = () => {
  const args2 = yaml.parse(
    fs.readFileSync(path2.join(__packageDir, "arguments.yaml"), "utf8").toString()
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
import fs2 from "node:fs";
import path3 from "node:path";
var resolveConfig = (configPath) => {
  let userConfig;
  if (configPath.includes("yaml")) {
    userConfig = loadYamlConfig(configPath);
  }
  return { ...config, ...userConfig };
};
var loadYamlConfig = (configPath) => {
  if (!fs2.existsSync(configPath)) {
    return {};
  }
  const config3 = yaml2.parse(fs2.readFileSync(configPath).toString());
  return config3;
};

// src/plopfile.ts
var config2 = resolveConfig("suipta.config.yaml");
var args = getArguments();
console.log("plopfile", args);
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
        destination: path4.join(
          __dirname,
          config2.rootDir,
          "{{kebabCase layer}}/{{kebabCase slice}}/"
        ),
        base: path4.join(config2.templatesDir, "{{layer}}"),
        templateFiles: path4.join(config2.templatesDir, "{{layer}}/**/*")
      }
    ]
  });
}
export {
  plopfile_default as default
};
