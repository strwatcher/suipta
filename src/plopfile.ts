import { NodePlopAPI } from 'plop'

export default function(plop: NodePlopAPI) {
  plop.setGenerator('slice', {
    prompts: [
      {
        type: 'list',
        name: 'layer',
        choices: [
          'app',
          'processes',
          'pages',
          'widgets',
          'features',
          'entities',
          'shared',
        ],
        message: 'Choose the layer in which slice will be created',
      },
      {
        type: 'input',
        name: 'slice',
        message: 'Enter the name of slice',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: '../src/{{kebabCase layer}}/{{kebabCase slice}}/',
        base: '../templates/{{layer}}',
        templateFiles: '../templates/{{layer}}/**/*',
      },
    ],
  })
}
