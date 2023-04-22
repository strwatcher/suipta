import { it, expect, describe, beforeAll } from 'vitest'
import fs from 'fs'
import { suiptaHandler } from 'suipta'
import path from 'path'
import { generationPath } from '../src/helpers'

describe('Check if generation works with args and without them', () => {
  beforeAll(() => {
    if (fs.existsSync(generationPath)) {
      fs.rmdirSync(generationPath, { recursive: true })
    }
  })

  it('without extra args', async () => {
    await suiptaHandler({
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
      layer: 'entities',
      slice: 'with-solid',
      configPath: undefined,
      ui: 'solid',
      model: undefined,
      language: undefined,
    })
    const slicePath = path.join(generationPath, '/entities/with-solid')

    expect(fs.existsSync(slicePath)).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'model'))).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'ui'))).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'index.ts'))).toBeTruthy()
    expect(fs.existsSync(path.join(slicePath, 'types.ts'))).toBeTruthy()
  })
})
