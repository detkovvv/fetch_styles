const http = require('http');
const fs = require('fs');

// Чтение конфигурационного файла
const config = JSON.parse(fs.readFileSync('./src/services/api.cfg', 'utf8'));

// Функция для генерации случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Объекты для сообщений об ошибках и заголовков CORS
const errors = {
    methodNotAllowed: 'Method Not Allowed',
    notFound: 'Not Found'
};

const corsHeaders = {
    origin: '*',
    methods: 'GET',
    headers: 'origin, content-type, accept'
};

const contentType = {'Content-Type': 'application/json'};

// Функция для обработки запроса на /api/button/
const handleButtonRequest = (req, res) => {
    if (req.method === 'GET') {

        // Моделируем задержку сервера
        setTimeout(() => {
            const forms = ['square', 'rectangle', 'triangle', 'circle'];
            const colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];

            // Генерируем случайную форму и цвет
            const randomForm = forms[getRandomInt(0, forms.length - 1)];
            const randomColor = colors[getRandomInt(0, colors.length - 1)];

            const responseData = JSON.stringify({form: randomForm, color: randomColor});

            setCorsHeaders(res);

            res.writeHead(200, contentType);
            res.end(responseData);
        }, getRandomInt(1000, 7000)); // Случайная задержка от 1 до 7 секунд
    } else {
        res.writeHead(405, contentType);
        res.end(errors.methodNotAllowed);
    }
}

// Функция для обработки запроса на /api/random/
const handleRandomRequest = (req, res) => {
    if (req.method === 'GET') {
        // Моделируем задержку сервера
        setTimeout(() => {
            const responseData = JSON.stringify({answer: getRandomInt(1, 100)});

            setCorsHeaders(res);

            res.writeHead(200, contentType);
            res.end(responseData);
        }, getRandomInt(0, 2000));
    } else {
        res.writeHead(405, contentType);
        res.end(errors.methodNotAllowed);
    }
}

//Установка CORS-заголовков
const setCorsHeaders = (res) => {
    res.setHeader('Access-Control-Allow-Origin', corsHeaders.origin);
    res.setHeader('Access-Control-Allow-Methods', corsHeaders.methods);
    res.setHeader('Access-Control-Allow-Headers', corsHeaders.headers);
};

// Создание HTTP-сервера
const server = http.createServer((req, res) => {
    if (req.url === '/api/button') {
        handleButtonRequest(req, res);
    } else if (req.url === '/api/random') {
        handleRandomRequest(req, res);
    } else {
        res.writeHead(404, contentType);
        res.end(errors.notFound);
    }
});

// Слушаем порт из конфигурации
server.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
