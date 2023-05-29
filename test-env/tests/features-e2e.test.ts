import { it, expect, describe, beforeAll } from 'vitest'
import fs from 'fs'
import { suiptaHandler } from 'suipta'
import path from 'path'
import { generationPath, testFeatures } from '../src/helpers'

describe('Check if features generation works with args and without them', () => {
  beforeAll(() => {
    if (fs.existsSync(generationPath)) {
      fs.rmdirSync(generationPath, { recursive: true })
    }
  })

  it('without extra args', async () => {
    const slice = 'without-extra'
    await suiptaHandler({
      generator: 'slice',
      layer: 'features',
      slice,
    })

    const slicePath = path.join(generationPath, 'features', 'without-extra')
    expect(fs.existsSync(slicePath)).toBeTruthy()

    testFeatures(slice)
  })

  it('with model argument = effector', async () => {
    const slice = 'with-effector'
    await suiptaHandler({
      generator: 'slice',
      layer: 'features',
      slice,
      model: 'effector',
    })

    const slicePath = path.join(generationPath, 'features', slice)
    expect(fs.existsSync(slicePath)).toBeTruthy()
    testFeatures(slice)
  })

  it('with ui argument = react', async () => {
    const slice = 'with-react'
    await suiptaHandler({
      generator: 'slice',
      layer: 'features',
      slice,
      ui: 'react',
    })

    const slicePath = path.join(generationPath, 'features', slice)
    expect(fs.existsSync(slicePath)).toBeTruthy()
    testFeatures(slice)
  })

  it('with ui argument = solid', async () => {
    const slice = 'with-solid'
    await suiptaHandler({
      generator: 'slice',
      layer: 'features',
      slice,
      ui: 'solid',
    })

    const slicePath = path.join(generationPath, 'features', slice)

    expect(fs.existsSync(slicePath)).toBeTruthy()
    testFeatures(slice)
  })

  it('with ui argument = react and model = effector', async () => {
    const slice = 'with-effector-react'
    await suiptaHandler({
      generator: 'slice',
      layer: 'features',
      slice,
      ui: 'react',
      model: 'effector',
    })

    const slicePath = path.join(generationPath, 'features', slice)

    expect(fs.existsSync(slicePath)).toBeTruthy()
    testFeatures(slice)
  })

  it('with ui argument = solid and model = effector', async () => {
    const slice = 'with-effector-solid'
    await suiptaHandler({
      generator: 'slice',
      layer: 'features',
      slice,
      ui: 'solid',
      model: 'effector',
    })

    const slicePath = path.join(generationPath, 'features', slice)

    expect(fs.existsSync(slicePath)).toBeTruthy()
    testFeatures(slice)
  })
})
