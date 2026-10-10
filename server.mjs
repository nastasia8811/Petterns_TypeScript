import { createServer } from 'node:http';
import { fileDB } from "./src/HW_2/fileDB.js"
import { newspostSchema } from "./src/schemas/newpostSchema.js";

let requestCount = 0;
let port = 3000;

const args = process.argv.slice(2);

args.forEach(arg => {
    if (arg.startsWith('--port=')) {
        port = parseInt(arg.split('=')[1], 10);
    }
});

const server = createServer((req, res) => {
    requestCount++;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        message: 'Request handled successfully',
        requestCount: requestCount
    }));
});

server.listen(port, '127.0.0.1', () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});


// Варіант 2 - Користувач при запуску програми може вказати інший порт для запуску сервера,
// передавши номер порту в аргументах командної строки у наступному вигляді:npm start -- --port=1337.


//import { parseArgs } from 'node:util';

// const { values } = parseArgs({
//     options: {
//         port: { type: 'string', default: '3000' }
//     }
// });
//
// const port = parseInt(values.port, 10);

fileDB.registerSchema("newspost", newspostSchema);
const newspostTable = fileDB.getTable("newspost");

const data = {
    title: 'У зоопарку Чернігова лисичка народила лисеня',
    text: "В Чернігівському заопарку сталася чудова подія! Лисичка на ім'я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!"
}

// додаємо новий запис, та повертаємо його з новим id
const createdNewspost = newspostTable.create(data);
console.log("create:", createdNewspost);

// повертаємо усі записи у базі у вигляді масиву
const newsposts = newspostTable.getAll();
console.log("getAll:", newsposts);

// повертаємо запис за вказаним id
const newspost = newspostTable.getById(createdNewspost.id);
console.log("getById:", newspost);

// оновлюємо поле title за вказаним id та повертаємо оновлений запис
const updatedNewsposts = newspostTable.update(createdNewspost.id, { title: "Маленька лисичка", size: 2 });
console.log("update:", updatedNewsposts);

// видаляємо запис за вказаним id та повертаємо id видаленого запису
const deletedId = newspostTable.delete(createdNewspost.id);
console.log("delete:", deletedId);

const getAllAfterDelete = newspostTable.getAll();
console.log("getAll після delete:", getAllAfterDelete);