import config from './services/api.cfg';

// Получаем DOM элементы
const fetchButton = document.getElementById('fetchButton');
const responseForm = document.getElementById('responseForm');
const responseColor = document.getElementById('responseColor');
const randomData = document.getElementById('randomData');

// Присваиваем адрес запроса
const serverUrl = `${config.server}:${config.port}`;

// Отправка запроса на сервер при нажатии кнопки
fetchButton.addEventListener('click', () => {
    // Блокируем кнопку и меняем её цвет на серый
    fetchButton.disabled = true;
    fetchButton.style.backgroundColor = 'grey';

    // Отправка запроса на сервер
    fetch(`${serverUrl}/api/button/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Обработка полученного ответа
            responseForm.textContent = data.form;
            responseColor.textContent = data.color;
            fetchButton.style.backgroundColor = data.color;
            fetchButton.className = `button ${data.form}`;

        })
        .catch(error => {
            // Вывод ошибки, если запрос не удался
            console.error('There was a problem with the fetch operation:', error);
            responseForm.textContent = 'Error';
            responseColor.textContent = 'Error';
        })
        .finally(() => {
            // Восстанавливаем кнопку после завершения запроса
            fetchButton.disabled = false;
        });
});

// Обновление третьего поля каждую секунду
setInterval(() => {
    fetch(`${serverUrl}/api/random/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Обработка полученного ответа
            randomData.textContent = data.answer;
        })
        .catch(error => {
            // Вывод ошибки, если запрос не удался
            console.error('There was a problem with the fetch operation:', error);
            randomData.textContent = 'Error';
        });
}, 1000);
