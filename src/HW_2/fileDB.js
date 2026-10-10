import fs from 'node:fs'
import path from 'node:path'

const dataDirPath = path.join(import.meta.dirname, '../data')
const schemas = {}
const filePath = name => path.join(dataDirPath, `${name}.json`)

export const fileDB = {
  registerSchema(name, schema) {
    schemas[name] = schema

    const dataFilePath = filePath(name)

    fs.mkdirSync(dataDirPath, { recursive: true })

    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([]))
    }
  },

  getTable(name) {
    const dataFilePath = filePath(name)
    const schema = schemas[name]

    const objectBySchema = data => {
      const result = {}

      for (const key in data) {
        if (key in schema && key !== 'id' && key !== 'createDate') {
          result[key] = data[key]
        }
      }

      return result
    }

    const readAll = () => JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'))
    const saveAll = items => fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 2))

    const getAll = () => readAll()

    const getById = id => readAll().find(item => item.id === id)

    const create = data => {
      const items = readAll()
      const newItem = {
        id: items.length ? Math.max(...items.map(i => i.id)) + 1 : 1,
        ...objectBySchema(data),
        createDate: new Date(),
      }
      saveAll([...items, newItem])
      return newItem
    }

    const update = (id, data) => {
      const items = readAll()
      const index = items.findIndex(item => item.id === id)
      if (index === -1) return null
      const updated = { ...items[index], ...objectBySchema(data) }
      items[index] = updated
      saveAll(items)
      return updated
    }

    const remove = id => {
      const items = readAll()
      saveAll(items.filter(item => item.id !== id))
      return id
    }

    return { getAll, getById, create, update, delete: remove }
  },
}
