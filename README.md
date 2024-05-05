## **Fetch styles app**

### Тестовое приложение для запроса с локального сервера данных и отображения их в стилизованном виде

    Приложение состоит из пользовательской части, логика которой написана на нативном Javascript и серверной части на базе Node.js.

    Логика работы:
    1. У приложения есть 1 кнопка и 3 поля вывода информации
    2. При первом запуске приложения, кнопка имеет случайные цвет и форму, все поля пусты и ничего не отображают
    3. После нажатия на кнопку, кнопка меняет цвет на серый и становится неактивной до момента получения информации от сервера или до завершения таймаута. Таймаут составляет 5 секунд
    4. При получении ответа от сервера, в зависимости от полученного ответа, кнопка меняет свой цвет и форму, в два поля из трех выводится информация о цвете и форме.
       Если приходит неверный ответ, выводится сообщение об ошибке получаемых данных. Если ответа нет, выводится сообщение об таймауте.
    5. В третье поле, с периодом 1 секунда, выводится дополнительная информация (в данном случае случайное число от 1 до 100), запрашиваемая с сервера независимо от работы кнопки.
       Запрос ведется на отдельный эндпоинт. Если формат ответа не соответствует заданным параметрам, в поле выводится информация об ошибке данных,
       если ответа по запросу нет по таймауту (3 секунды), выводится сообщение о таймауте.


#### Для установки потребуется:

1. скопировать себе репозиторий
2. установить npm `npm install`
3. использовать команду `npm start` для запуска сервера
4. открыть файл `index.html` в браузере
 
#### Для дополнительной настройки:

1. в файле `package.json` находится информация о проекте, в том числе команда для запуска сервере. При необходимости можно изменить имеющуюся команду или добавить новые в свойстве `scripts` значения.
2. в файле `api.cfg` находится объект со значениями адреса сервера