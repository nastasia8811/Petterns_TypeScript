import { createServer } from 'node:http'
import { fileDB } from './src/fileDB.ts'
import { newspostSchema } from './src/schemas/newpostSchema.js'
import type { NewpostSchema } from './src/schemas/newpostSchema.ts'

let requestCount: number = 0
let port: number = 3000

const args: string[] = process.argv.slice(2)

args.forEach((arg: string): void => {
  if (arg.startsWith('--port=')) {
    port = parseInt(arg.split('=')[1] as string, 10)
  }
})

const server = createServer((req, res): void => {
  requestCount++

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(
    JSON.stringify({
      message: 'Request handled successfully',
      requestCount: requestCount,
    })
  )
})

server.listen(port, '127.0.0.1', (): void => {
  console.log(`Listening on 127.0.0.1:${port}`)
})

fileDB.registerSchema('newspost', newspostSchema)
const newspostTable = fileDB.getTable<NewpostSchema>('newspost')

const data = {
  title: 'У зоопарку Чернігова лисичка народила лисеня',
  text: "В Чернігівському заопарку сталася чудова подія! Лисичка на ім'я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!",
}

// додаємо новий запис, та повертаємо його з новим id
const createdNewspost: NewpostSchema = newspostTable.create(data)
console.log('create:', createdNewspost)

// повертаємо усі записи у базі у вигляді масиву
const newsposts: NewpostSchema[] = newspostTable.getAll()
console.log('getAll:', newsposts)

// повертаємо запис за вказаним id
const newspost: NewpostSchema | undefined = newspostTable.getById(createdNewspost.id)
console.log('getById:', newspost)

// оновлюємо поле title за вказаним id та повертаємо оновлений запис
const updatedNewsposts: NewpostSchema | null = newspostTable.update(createdNewspost.id, {
  title: 'Маленька лисичка',
  size: 2,
})
console.log('update:', updatedNewsposts)

// видаляємо запис за вказаним id та повертаємо id видаленого запису
const deletedId: number | null = newspostTable.delete(createdNewspost.id)
console.log('delete:', deletedId)

const getAllAfterDelete: NewpostSchema[] = newspostTable.getAll()
console.log('getAll після delete:', getAllAfterDelete)
