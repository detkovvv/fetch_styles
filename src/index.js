// Получаем DOM элементы
const fetchButton = document.getElementById('fetchButton');
const responseForm = document.getElementById('responseForm');
const responseColor = document.getElementById('responseColor');
const randomData = document.getElementById('randomData');

// Задаем изначальный случайный стиль кнопке
const styleClasses = {
    form: ['triangle', 'circle', 'square', 'square', 'rectangle'],
    color: ['red', 'orange', 'yellow', 'green', 'cian', 'blue', 'violet']
};

const randomIndex = (param) => Math.floor(Math.random() * param);
const randomForm = styleClasses.form[randomIndex(styleClasses.form.length)];
const randomColor = styleClasses.color[randomIndex(styleClasses.color.length)];

fetchButton.className = `button ${randomForm}`;
fetchButton.style.backgroundColor = randomColor;

fetch('src/api.cfg')
    .then(response =>  response.json())
    .then(config => {
        // Присваиваем адрес запроса
        const serverUrl = `${config.server}:${config.port}`;

// Отправка запроса на сервер при нажатии кнопки
        fetchButton.addEventListener('click', () => {
            // Блокируем кнопку и меняем её цвет на серый
            fetchButton.disabled = true;
            fetchButton.style.backgroundColor = 'grey';

            // Отправка запроса на сервер
            fetch(`${serverUrl}/api/button`, {signal: AbortSignal.timeout(5000)})
                .then(response => response.json())
                .then(data => {

                    // Обработка полученного ответа
                    responseForm.textContent = data.form;
                    responseColor.textContent = data.color;
                    fetchButton.style.backgroundColor = data.color;
                    fetchButton.className = `button ${data.form}`;

                })
                .catch(error => {
                    // Вывод ошибки, если запрос не удался
                    if (error.name === 'TimeoutError') {
                        console.log('Timeout', error);
                        responseForm.textContent = 'Timeout error';
                        responseColor.textContent = 'Timeout error';
                    } else {
                        console.error('There was a problem with the fetch operation:', error);
                        responseForm.textContent = 'Fetch error';
                        responseColor.textContent = 'Fetch error';
                    }
                })
                .finally(() => {
                    // Восстанавливаем кнопку после завершения запроса
                    fetchButton.disabled = false;
                });
        });

// Обновление третьего поля каждую секунду
        setInterval(() => {
            fetch(`${serverUrl}/api/random`, {signal: AbortSignal.timeout(3000)})
                .then(response => response.json())
                .then(data => {
                    // Обработка полученного ответа
                    randomData.textContent = data.answer;
                })
                .catch(error => {
                    if (error.name === 'TimeoutError') {
                        console.log('Timeout', error);
                        randomData.textContent = 'Timeout error';
                    } else {
                        console.error('There was a problem with the fetch operation:', error);
                        randomData.textContent = 'Fetch error';
                    }
                });
        }, 1000);

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });