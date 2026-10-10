import { fs } from 'fs'

// ===== ЧИТАННЯ ФАЙЛІВ =====
fs.readFile('demofile1.html', function (err, data) {
  // data — вміст файлу (Buffer/string)
  if (err) throw err
  console.log(data)
})

// ===== СТВОРЕННЯ ФАЙЛІВ =====

// appendFile() — додає вміст у файл; якщо файлу нема — створює його
fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err
  console.log('Saved!')
})

// open() з прапорцем 'w' — створює порожній файл (або відкриває для запису)
fs.open('mynewfile2.txt', 'w', function (err) {
  if (err) throw err
  console.log('Saved!')
})

// writeFile() — створює новий файл із вмістом; якщо файл існує — перезаписує його
fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
  if (err) throw err
  console.log('Saved!')
})

// ===== ОНОВЛЕННЯ ФАЙЛІВ =====

// appendFile() — дописує текст у КІНЕЦЬ існуючого файлу
fs.appendFile('mynewfile1.txt', ' Це мій текст.', function (err) {
  if (err) throw err
  console.log('Оновлено!')
})

// ===== ВИДАЛЕННЯ ФАЙЛІВ =====

// unlink() — видаляє вказаний файл
fs.unlink('mynewfile2.txt', function (err) {
  if (err) throw err
  console.log('File deleted!')
})

// ===== ПЕРЕЙМЕНУВАННЯ ФАЙЛІВ =====

// rename() — перейменовує (або переміщує) файл: (старе_ім'я, нове_ім'я, callback)
fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
  if (err) throw err
  console.log('Файл перейменовано!')
})
