# Suipta

Simple boilerplate-code cli generator intended to imporve your experience with Feature-Sliced Design methodology

Based on:
- [plop](https://github.com/plopjs/plop)
- [cmd-ts](https://github.com/Schniz/cmd-ts)
- [chalk](https://github.com/chalk/chalk)
- [ora](https://github.com/sindresorhus/ora)
- ...others


## How-to-use
To use suipta you need one of these package managers:
- npm
- yarn
- pnpm
- volta

### Installation
for npm:
```sh
npm i --save-dev @strwatcher/suipta
```

for yarn:
```sh
yarn add --dev @strwatcher/suipta
```

for pnpm:
```sh
pnpm add -D @strwatcher/suipta
```

for volta:
```sh
volta install @strwatcher/suipta
```

### Simple Usage
To use suipta with out-of-box templates you need to add it to your scripts in package.json

```json
"scripts": {
    ...
    "suipta": "suipta",
    ...
}
```

You can also add aliases for slice and segment generators:

```json
"scripts": {
    ...
    "slice": "suipta slice",
    "segment": "suipta segment",
    ...
}
```

After that simply start suipta from command line:

- In interactive mode:
```sh
pnpm suipta || pnpm slice || pnpm segment
```

- Using arguments bypassing:
```sh
pnpm suipta slice entities user
```

Where:
- <b>slice</b> is generator type (slice | segment)
- <b>entities</b> is one of 5 preconfigured layers
- <b>user</b> is custom name of creating slice

### Arguments

If you wanna use not default settings of generators you can use arguments. (This feature works only in 'slice' generator at this moment):

--ui    :   (react | solid)
--model :   (effector)
--language  :   (js | ts)

Also you can customize path to suipta config using
--configPath    :   string

### Configuration

If you need to customize behaviour of suipta you can write your own config.

Default location is root dir of your project

Configs that are resolving by default:

- suipta.config.js
- suipta.config.cjs
- suipta.config.yaml
- suipta.config.yml
- suipta.config.json

To provide typings for config you can follow this example:

```js
// suipta.config.js

/**
 * @type {import('suipta').SuiptaConfig}
 * **/
export default {
    layers: ['entities', 'features', 'widgets',  'pages'] // Array<string>
    segmentLayers: ['shared'] // Array<string>
    segment: ['lib', 'ui'] // Array<string>
    templatesDir?: './templates' // string which is relative path (from project root dir) to templates directory
    lang?: 'ts' // option to choose language ('js' | 'ts')
    rootDir: './src' // string whic is relative path (from project root dir) to directory where results of generation will be saved
}
```

### Custom templates

If you need more flexibility, you can write own templates
You need to place them in templates dir and set its path to templatesDir option in config.

In templates directory you need to follow next structure:

```sh
templates/
....entities/
........files which will be use in generation
....other layer in which slice will be generated/
........files which will be use in generation
....segments/
........shared/
............files which will be use in generation
........other layer in which segment will be generated/
............files which will be use in generation
```
#### Templates format

Suipta use [handlebars syntax](https://handlebarsjs.com/guide/#what-is-handlebars) to process dynamic values in templates

##### Slice generator:
In templates of slice generator 2 vaiables are avaliable:
- layer
- slice

In segment generator 3:
- layer
- segment
- component

These values can be modified using helpers:
- pascalCase
- camelCase
- snakeCase
- etc...

Example of temlate file with dynamic fields:
```ts
// templates/pages/ui.tsx

import {PageLayout} from '...'

type Props = {

}

export const {{pascalCase slice}}Page = (props: Props) => {
    return <PageLayout></PageLayout>
}
```

Imagine, that slice name is auth. The result of generation will be:
```ts
// src/pages/auth/ui.tsx

import {PageLayout} from '...'

type Props = {

}

export const AuthPage = (props: Props) => {
    return <PageLayout></PageLayout>
}
```

## Contributing

### Requirments:

- [volta](https://volta.sh/)

### Install tooling:

```sh
volta install node pnpm lefthook commitizen
```

### Install dependencies:

```sh
pnpm i
```

### Run tests:

In watch mode

```sh
pnpm test
```

One time

```sh
pnpm test:run
```

### Lint code:

```sh
pnpm lint
```

### Format code:

```sh
pnpm format
```

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
