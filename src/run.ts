#!/usr/bin/env node
import { run } from 'cmd-ts'
import { app } from './index'

run(app, process.argv.slice(2))
