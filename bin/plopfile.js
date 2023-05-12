// src/plopfile.ts
import Case from "case";
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
  layers: ["entities", "features", "widgets", "pages", "processes"],
  segmentLayers: ["shared"],
  segment: ["ui", "lib"],
  rootDir: "src"
};

// src/config/resolve.ts
import yaml2 from "yaml";
import fs2, { promises } from "node:fs";

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
import path2 from "node:path";
var resolveConfig = async (configPath) => {
  let paths2;
  if (configPath) {
    paths2 = [configPath, ...paths];
  } else {
    paths2 = [...paths];
  }
  let userConfig;
  for (const configPath2 of paths2) {
    if (fs2.existsSync(configPath2)) {
      if (/.*\.js$/.test(configPath2)) {
        userConfig = (await import(path2.join(process.cwd(), configPath2))).default;
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
  let language = "ts";
  if (config2.lang) {
    language = config2.lang;
  }
  if (args.language) {
    language = args.language;
  }
  const defaultTemplatesDir = path3.join(__packageDir, "..", "templates");
  plop.setGenerator("segment", {
    prompts: [
      {
        type: "list",
        name: "layer",
        choices: config2.segmentLayers,
        message: "Choose the layer in which segment will be updated"
      },
      {
        type: "list",
        name: "segment",
        choices: config2.segment,
        message: "Choose segment in which generation result will placed"
      },
      {
        type: "input",
        name: "component",
        message: "Enter the name of new generation result"
      }
    ],
    actions: (data) => {
      if (!data)
        return [];
      const { layer, segment, component } = data;
      const layerPath = path3.join(__dirname, config2.rootDir, layer);
      const segmentPath = path3.join(layerPath, segment);
      const actions = [];
      if (!fs3.existsSync(layerPath)) {
        fs3.mkdirSync(layerPath);
      }
      if (!fs3.existsSync(segmentPath)) {
        fs3.mkdirSync(segmentPath);
      }
      const indexPath = path3.join(segmentPath, `index.${language}`);
      if (!fs3.existsSync(indexPath)) {
        fs3.writeFileSync(indexPath, "");
      }
      actions.push({
        type: "modify",
        path: indexPath,
        transform: (template) => {
          template += `export * from './${Case.kebab(component)}'
`;
          return template;
        }
      });
      const base = path3.join(
        config2.templatesDir ?? defaultTemplatesDir,
        "segments",
        "{{kebabCase layer}}",
        "{{kebabCase segment}}"
      );
      actions.push({
        type: "addMany",
        destination: path3.join(segmentPath, "{{kebabCase component}}"),
        base,
        templateFiles: path3.join(base, "**", "*")
      });
      return actions;
    }
  });
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
      const destinationBase = path3.join(
        __dirname,
        config2.rootDir,
        "{{kebabCase layer}}",
        "{{kebabCase slice}}",
        "/"
      );
      const actions = [];
      if (!isAdditionalArgs && data?.layer && config2.templatesDir && fs3.existsSync(path3.join(config2.templatesDir, data.layer))) {
        const templateFiles = path3.join(
          config2.templatesDir,
          data.layer,
          "**",
          "*"
        );
        const base = path3.join(config2.templatesDir, data.layer);
        actions.push({
          type: "addMany",
          destination: destinationBase,
          base,
          templateFiles
        });
      } else if (isAdditionalArgs) {
        const templatesDir = defaultTemplatesDir;
        const base = path3.join(templatesDir, data?.layer);
        const modelBase = path3.join(
          base,
          path3.join("model", args.model ?? "effector", language)
        );
        const uiBase = path3.join(
          base,
          path3.join("ui", args.ui ?? "react", language)
        );
        actions.push(
          {
            type: "addMany",
            destination: path3.join(destinationBase, "model", "/"),
            base: modelBase,
            templateFiles: path3.join(modelBase, "**", "*")
          },
          {
            type: "addMany",
            destination: path3.join(destinationBase, "ui", "/"),
            base: uiBase,
            templateFiles: path3.join(uiBase, "**", "*")
          },
          {
            type: "add",
            path: path3.join(destinationBase, `index.${language}`),
            templateFile: path3.join(base, `index.${language}`)
          }
        );
        if (language === "ts") {
          actions.push({
            type: "add",
            path: path3.join(destinationBase, `types.${language}`),
            templateFile: path3.join(base, `types.${language}`)
          });
        }
      } else {
        const templatesDir = defaultTemplatesDir;
        const templateFiles = path3.join(
          templatesDir,
          data?.layer,
          "default",
          "**",
          "*"
        );
        const base = path3.join(templatesDir, data?.layer, "default");
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
