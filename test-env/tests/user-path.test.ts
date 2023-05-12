import { it, expect, describe, beforeAll } from 'vitest'
import fs from 'fs'
import { suiptaHandler } from 'suipta'
import path from 'path'
import { generationPath, resultsPath } from '../src/helpers'

describe('Check if generation works with args and without them', () => {
  beforeAll(() => {
    if (fs.existsSync(generationPath)) {
      fs.rmdirSync(generationPath, { recursive: true })
    }
  })

  it('without extra args', async () => {
    await suiptaHandler({
      generator: 'slice',
      layer: 'entities',
      slice: 'without-extra',
      configPath: undefined,
      ui: undefined,
      model: undefined,
      language: undefined,
    })
    const slicePath = path.join(generationPath, '/entities/without-extra')

    expect(fs.existsSync(slicePath)).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'model'))).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'ui'))).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'index.ts'))).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'types.ts'))).toBeTruthy()
  })

  it('with model argument = effector', async () => {
    await suiptaHandler({
      generator: 'slice',
      layer: 'entities',
      slice: 'with-effector',
      configPath: undefined,
      ui: undefined,
      model: 'effector',
      language: undefined,
    })
    const slicePath = path.join(generationPath, '/entities/with-effector')

    expect(fs.existsSync(slicePath)).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'model'))).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'ui'))).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'index.ts'))).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'types.ts'))).toBeTruthy()
  })

  it('with ui argument = react', async () => {
    await suiptaHandler({
      generator: 'slice',
      layer: 'entities',
      slice: 'with-react',
      configPath: undefined,
      ui: 'react',
      model: undefined,
      language: undefined,
    })
    const slicePath = path.join(generationPath, '/entities/with-react')

    expect(fs.existsSync(slicePath)).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'model'))).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'ui'))).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'index.ts'))).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'types.ts'))).toBeTruthy()
  })

  it('with ui argument = solid', async () => {
    await suiptaHandler({
      generator: 'slice',
      layer: 'entities',
      slice: 'with-solid',
      configPath: undefined,
      ui: 'solid',
      model: undefined,
      language: undefined,
    })

    const slicePath = path.join(generationPath, 'entities', 'with-solid')
    const resultPath = path.join(resultsPath, 'entities', 'with-solid')

    expect(fs.existsSync(slicePath)).toBeTruthy()
    const pathsToCheck = [
      path.join('ui', 'index.tsx'),
      path.join('ui', 's.module.scss'),
      path.join('model', 'index.ts'),
      'types.ts',
      'index.ts',
    ]
    pathsToCheck.forEach(item => {
      expect(fs.readFileSync(path.join(slicePath, item)).toString()).toMatch(
        fs.readFileSync(path.join(resultPath, item)).toString()
      )
    })
  })
})
