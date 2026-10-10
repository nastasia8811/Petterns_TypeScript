import fs from 'node:fs'
import path from 'node:path'

type Schema = Record<string, unknown>
type Data = Record<string, unknown>
type Item = { id: number; [key: string]: unknown }

// Repository Pattern - Доступ до даних інкапсульований у стандартному наборі операцій.
// Логіка зберігання відокремлена від решти коду, тому спосіб зберігання в майбутньому можна змінити без змін в інших модулях.

interface Table<T> {
  getAll(): T[]
  getById(id: number): T | undefined
  create(data: Data): T
  update(id: number, data: Data): T | null
  delete(id: number): number | null
}

const dataDirPath: string = path.join(import.meta.dirname, '../data')
const schemas: Record<string, Schema> = {}
const filePath = (name: string): string => path.join(dataDirPath, `${name}.json`)

// Singleton Pattern - у класу лише один екземпляр на весь проєкт, оскільки FileDB виконує роль бази даних,
// нам треба мати лише один екземпляр.

class FileDB {
  private static instance: FileDB | undefined

  private constructor() {}

  static getInstance(): FileDB {
    if (!FileDB.instance) {
      FileDB.instance = new FileDB()
    }
    return FileDB.instance
  }

  registerSchema(name: string, schema: Schema): void {
    schemas[name] = schema

    const dataFilePath = filePath(name)

    fs.mkdirSync(dataDirPath, { recursive: true })

    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([]))
    }
  }

  // Factory Pattern
  // Таблиця створюється за назвою зареєстрованої схеми, а деталі, такі як шлях до файлу, схема, не повторюються в
  // наступних файлах, коли ми викликаємо метод getTable.
  getTable<T extends { id: number }>(name: string): Table<T> {
    const dataFilePath = filePath(name)
    const schema = schemas[name]
    if (!schema) throw new Error(`Schema "${name}" is not registered`)

    const matchesType = (value: unknown, type: unknown): boolean => {
      if (type === String) return typeof value === 'string'
      if (type === Number) return typeof value === 'number'
      if (type === Date)
        return (
          value instanceof Date || (typeof value === 'string' && !Number.isNaN(Date.parse(value)))
        )
      return true
    }

    const objectBySchema = (data: Data): Data => {
      const result: Data = {}

      for (const key in data) {
        if (
          key in schema &&
          key !== 'id' &&
          key !== 'createDate' &&
          matchesType(data[key], schema[key])
        ) {
          result[key] = data[key]
        }
      }

      return result
    }

    const readAll = (): Item[] => JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'))
    const saveAll = (items: Item[]): void =>
      fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 2))

    const getAll = (): Item[] => readAll()

    const getById = (id: number): Item | undefined => readAll().find(item => item.id === id)

    const create = (data: Data): Item => {
      const items = readAll()
      const newItem: Item = {
        id: items.length ? Math.max(...items.map(i => i.id)) + 1 : 1,
        ...objectBySchema(data),
        createDate: new Date(),
      }
      saveAll([...items, newItem])
      return newItem
    }

    const update = (id: number, data: Data): Item | null => {
      const items = readAll()
      const index = items.findIndex(item => item.id === id)
      if (index === -1) return null
      const updated = { ...items[index], ...objectBySchema(data) } as Item
      items[index] = updated
      saveAll(items)
      return updated
    }

    const remove = (id: number): number | null => {
      const items = readAll()
      if (!items.some(item => item.id === id)) return null
      saveAll(items.filter(item => item.id !== id))
      return id
    }

    return { getAll, getById, create, update, delete: remove } as Table<T>
  }
}

export const fileDB: FileDB = FileDB.getInstance()
