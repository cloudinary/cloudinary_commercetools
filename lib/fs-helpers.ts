import fs from 'fs'
import {promisify} from 'util'

export const readFile = promisify(fs.readFile)
export const exists = promisify(fs.exists)
export const writeFile = promisify(fs.writeFile)
export const deleteFile = promisify(fs.unlink)
export const readStats = promisify(fs.stat)
