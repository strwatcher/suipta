#!/usr/bin/env node
import { run } from 'cmd-ts'
import { app } from './index'

console.log('here')
run(app, process.argv.slice(2))
