import { it, expect, describe, beforeAll } from 'vitest'
import fs from 'fs'
import { suiptaHandler } from 'suipta'
import path from 'path'
import { generationPath, testEntities } from '../src/helpers'

describe('Check if entities generation works with args and without them', () => {
  beforeAll(() => {
    if (fs.existsSync(generationPath)) {
      fs.rmdirSync(generationPath, { recursive: true })
    }
  })

  it('without extra args', async () => {
    const slice = 'without-extra'
    await suiptaHandler({
      generator: 'slice',
      layer: 'entities',
      slice,
    })

    const slicePath = path.join(generationPath, 'entities', 'without-extra')
    expect(fs.existsSync(slicePath)).toBeTruthy()

    testEntities(slice)
  })

  it('with model argument = effector', async () => {
    const slice = 'with-effector'
    await suiptaHandler({
      generator: 'slice',
      layer: 'entities',
      slice,
      model: 'effector',
    })

    const slicePath = path.join(generationPath, 'entities', slice)
    expect(fs.existsSync(slicePath)).toBeTruthy()
    testEntities(slice)
  })

  it('with ui argument = react', async () => {
    const slice = 'with-react'
    await suiptaHandler({
      generator: 'slice',
      layer: 'entities',
      slice,
      ui: 'react',
    })

    const slicePath = path.join(generationPath, 'entities', slice)
    expect(fs.existsSync(slicePath)).toBeTruthy()
    testEntities(slice)
  })

  it('with ui argument = solid', async () => {
    const slice = 'with-solid'
    await suiptaHandler({
      generator: 'slice',
      layer: 'entities',
      slice,
      ui: 'solid',
    })

    const slicePath = path.join(generationPath, 'entities', slice)

    expect(fs.existsSync(slicePath)).toBeTruthy()
    testEntities(slice)
  })

  it('with ui argument = react and model = effector', async () => {
    const slice = 'with-effector-react'
    await suiptaHandler({
      generator: 'slice',
      layer: 'entities',
      slice,
      ui: 'react',
      model: 'effector',
    })

    const slicePath = path.join(generationPath, 'entities', slice)

    expect(fs.existsSync(slicePath)).toBeTruthy()
    testEntities(slice)
  })

  it('with ui argument = solid and model = effector', async () => {
    const slice = 'with-effector-solid'
    await suiptaHandler({
      generator: 'slice',
      layer: 'entities',
      slice,
      ui: 'solid',
      model: 'effector',
    })

    const slicePath = path.join(generationPath, 'entities', slice)

    expect(fs.existsSync(slicePath)).toBeTruthy()
    testEntities(slice)
  })
})
