// src/plopfile.ts
import path2 from "node:path";

// src/arguments/index.ts
import yaml from "yaml";

// src/helpers/index.ts
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
var __packageDir = dirname(fileURLToPath(import.meta.url));
var __dirname = process.cwd();
var plopPath = path.join(__packageDir, "plop.js");
var plopfilePath = path.join(__packageDir, "plopfile.js");
var argumentsPath = path.join(__packageDir, "arguments.yaml");

// src/arguments/index.ts
import fs from "node:fs";
var getArguments = (filePath) => {
  const args = yaml.parse(
    fs.readFileSync(filePath ?? argumentsPath, "utf8").toString()
  );
  return args;
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
  for (const path3 of paths2) {
    if (fs2.existsSync(path3)) {
      if (/.*\.(yml|yaml)$/.test(path3)) {
        userConfig = loadYamlConfig(path3);
      } else if (/.*\.(json)$/.test(path3)) {
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
  const config2 = yaml2.parse(fs2.readFileSync(configPath).toString());
  return config2;
};

// src/plopfile.ts
import fs3 from "node:fs";
async function plopfile_default(plop) {
  let args;
  try {
    args = getArguments() ?? {};
  } catch (e) {
    args = {};
  }
  const config2 = await resolveConfig(args.configPath);
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
    actions: (data) => {
      const isAdditionalArgs = !!(args.ui || args.model || args.language);
      const destinationBase = path2.join(
        __dirname,
        config2.rootDir,
        "{{kebabCase layer}}",
        "{{kebabCase slice}}",
        "/"
      );
      const actions = [];
      if (!isAdditionalArgs && data?.layer && config2.templatesDir && fs3.existsSync(path2.join(config2.templatesDir, data.layer))) {
        const templateFiles = path2.join(
          config2.templatesDir,
          data.layer,
          "**",
          "*"
        );
        const base = path2.join(config2.templatesDir, data.layer);
        actions.push({
          type: "addMany",
          destination: destinationBase,
          base,
          templateFiles
        });
      } else if (isAdditionalArgs) {
        const templatesDir = path2.join(__packageDir, "..", "templates");
        const base = path2.join(templatesDir, data?.layer);
        const language = args.language ?? "ts";
        const modelBase = path2.join(
          base,
          path2.join("model", args.model ?? "effector", language)
        );
        const uiBase = path2.join(
          base,
          path2.join("ui", args.ui ?? "react", language)
        );
        actions.push(
          {
            type: "addMany",
            destination: path2.join(destinationBase, "model", "/"),
            base: modelBase,
            templateFiles: path2.join(modelBase, "**", "*")
          },
          {
            type: "addMany",
            destination: path2.join(destinationBase, "ui", "/"),
            base: uiBase,
            templateFiles: path2.join(uiBase, "**", "*")
          },
          {
            type: "add",
            path: path2.join(destinationBase, `index.${language}`),
            templateFile: path2.join(base, `index.${language}`)
          }
        );
        if (language === "ts") {
          actions.push({
            type: "add",
            path: path2.join(destinationBase, `types.${language}`),
            templateFile: path2.join(base, `types.${language}`)
          });
        }
      } else {
        const templatesDir = path2.join(__packageDir, "..", "templates");
        const templateFiles = path2.join(
          templatesDir,
          data?.layer,
          "default",
          "**",
          "*"
        );
        const base = path2.join(templatesDir, data?.layer, "default");
        actions.push({
          type: "addMany",
          destination: destinationBase,
          base,
          templateFiles
        });
      }
      return actions;
    }
  });
}
export {
  plopfile_default as default
};
