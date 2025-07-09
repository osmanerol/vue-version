import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const versionFile = path.join(__dirname, '/public/version.json')

const incrementVersion = version => {
  const parts = version.split('.')
  const patch = parseInt(parts[2], 10) + 1
  return `${parts[0]}.${parts[1]}.${patch}`
}

const data = fs.readFileSync(versionFile, 'utf8')
const json = JSON.parse(data)
//const oldVersion = json.version
//const newVersion = incrementVersion(oldVersion)
const newVersion = new Date().getTime()
json.version = newVersion
fs.writeFileSync(versionFile, JSON.stringify(json, null, 2))