## Документация API для Егора (Frontend)

Базовый URL: `https://api.studdler.ru/`

**Аутентификация:**

Большинство запросов требуют аутентификации с помощью JWT-токена.  Токен нужно передавать в заголовке `Authorization` в формате `Bearer <token>`.

**1. Авторизация:**

* **POST /signin:**
    * **Request body (JSON):**  `{"username": "<username>", "password": "<password>"}`
    * **Response (JSON, 200 OK):** `{"token": "<jwt_token>"}`
    * **Response (400 Bad Request):** Неверный формат запроса.
    * **Response (409 Conflict):** Неверный логин или пароль.

* **POST /signup:**
    * **Request body (JSON):** `{"username": "<username>", "password": "<password>", "email": "<email>", "name": "<name>", "surname": "<surname>", "university": "<university>"}`
        * `surname` и `university` опциональны.
    * **Response (JSON, 200 OK):** `{"token": "<jwt_token>"}`
    * **Response (400 Bad Request):** Неверный формат запроса.
    * **Response (409 Conflict):** Пользователь с таким именем уже существует, пароль слишком короткий или пустой.

* **GET /authenticate:** (Защищено аутентификацией)
    * Проверяет валидность токена.
    * **Response (200 OK):** Токен валиден.
    * **Response (401 Unauthorized):** Токен невалиден.

* **GET /userid:** (Защищено аутентификацией)
    * Возвращает ID пользователя, связанного с токеном.
    * **Response (200 OK):** `<user_id>`
    * **Response (401 Unauthorized):** Токен невалиден.


**2. Пользователи:**

* **GET /user/get:** (Защищено аутентификацией)
    * Получить информацию о пользователе (по id, email или username).
    * **Query parameters:** `id=<user_id>`  ИЛИ  `email=<email>`  ИЛИ `username=<username>`
    * **Response (JSON, 200 OK):** `{"id": "<user_id>", "username": "<username>", "rating": "<rating>", "name": "<name>", "surname": "<surname>", "email": "<email>", "university": "<university>"}`
    * **Response (400 Bad Request):** Неверные параметры запроса или пользователь не найден.

* **GET /user/public/get:**
    * Получить публичную информацию о пользователе (по id, email или username).
    * **Query parameters:** `id=<user_id>`  ИЛИ  `email=<email>`  ИЛИ `username=<username>`
    * **Response (JSON, 200 OK):** `{"id": "<user_id>", "username": "<username>",  "university": "<university>"}`
    * **Response (400 Bad Request):** Неверные параметры запроса или пользователь не найден.


* **GET /user/{id}/avatar:**
    * Получить аватар пользователя.
    * **Path parameter:** `id=<user_id>`
    * **Response (200 OK, Content-Type: image/jpeg):** Данные изображения.
    * **Response (400 Bad Request):** Аватар не найден.

* **POST /avatar/upload:** (Защищено аутентификацией)
    * Загрузить аватар пользователя.
    * **Request body (multipart/form-data):**  Файл изображения с именем поля `avatar`.
    * **Response (200 OK):** `Success`
    * **Response (409 Conflict):** Ошибка загрузки.

* **GET /user/{id}/publications:**
    * Получить публикации пользователя.
    * **Path parameter:** `id=<user_id>`
    * **Response (JSON, 200 OK):** Массив объектов `Publication` (см. ниже).
    * **Response (409 Conflict):** У пользователя нет публикаций или пользователь не существует.

* **GET /my-publications:** (Защищено аутентификацией)
    * Получить публикации текущего пользователя.
    * **Response (JSON, 200 OK):** Массив объектов `MyPublication` (см. ниже).
    * **Response (409 Conflict):** У пользователя нет публикаций или пользователь не существует.

* **POST /profile/edit:** (Защищено аутентификацией)
    * Изменить профиль пользователя.
    * **Request body (JSON):** `{"name": "<name>", "surname": "<surname>", "university": "<university>"}`
    * **Response (200 OK):** `true` - если профиль успешно изменен.
    * **Response (400 Bad Request):**  Неверный формат запроса.
    * **Response (409 Conflict):** Ошибка базы данных.

* **POST /users/user/email/confirm:**
    * Подтвердить email пользователя.
    * **Request body (JSON):** `{"userId": "<user_id>", "code": <confirmation_code>}`
    * **Response (200 OK):** `Success`
    * **Response (400 Bad Request):** Неверный формат запроса.
    * **Response (409 Conflict):** Неверный код подтверждения или email уже подтвержден.

* **GET /user/{id}/status:**
    * Получить статус пользователя (подтвержден ли email).
    * **Path parameter:** `id=<user_id>`
    * **Response (JSON, 200 OK):** `{"emailConfirmed": <true/false>}`
    * **Response (400 Bad Request):** Неверные параметры запроса или пользователь не найден.

* **GET /universities/get:**
    * Получить список университетов.
    * **Response (JSON, 200 OK):** Массив строк с названиями университетов.
    * **Response (500 Internal Server Error):** Ошибка сервера.


**3. Публикации:**

* **Модель Publication (JSON):**
    ```json
    {
      "id": "<publication_id>",
      "imageUrl": "<image_url>",
      "title": "<title>",
      "description": "<description>",
      "price": <price>, // может быть null
      "priceType": "<price_type>",
      "district": "<district>", // может быть null
      "timestamp": <timestamp>,
      "category": "<category>",
      "userId": "<user_id>",
      "socials": "<socials>",
      "approved": <true/false/null>
    }
    ```

* **Модель MyPublication (JSON):**
    ```json
    {
      "id": "<publication_id>",
      "imageUrl": "<image_url>",
      "title": "<title>",
      "description": "<description>",
      "price": <price>,  // может быть null
      "priceType": "<price_type>",
      "timestamp": <timestamp>,
      "userId": "<user_id>",
      "approved": <true/false/null>,
      "views": <views_count>,
      "favorites": <favorites_count>
    }
    ```


* **GET /publications/fetch:**
    * Получить все публикации.
    * **Response (JSON, 200 OK):** Массив объектов `Publication`.

* **GET /publications/id/{id}:** (Защищено аутентификацией)
    * Получить публикацию по ID.
    * **Path parameter:** `id=<publication_id>`
    * **Response (JSON, 200 OK):** Объект `DetailedPublication`.
    * **Response (400 Bad Request):** Публикация не найдена.

* **Модель DetailedPublication (JSON):**
    ```json
    {
        "publication": {<publication_object>},
        "user": {<user_response_object>},
        "userIsOwner": <true/false>
    }
    ```

* **POST /publications/new:** (Защищено аутентификацией)
    * Создать новую публикацию.
    * **Request body (multipart/form-data):**
        * `images`: Массив файлов изображений.
        * `publicationData`: JSON-строка с данными публикации (объект `PublicationRequest`).
    * **JSON for `publicationData` field:**
        ```json
        {
          "title": "<title>",
          "description": "<description>",
          "price": <price>,
          "priceType": "<price_type>",
          "district": "<district>", // может быть null
          "category": "<category>",
          "userId": "<user_id>",
          "socials": "<socials>"
        }
        ```

    * **Response (200 OK):**  `<publication_id>`
    * **Response (400 Bad Request):** Неверный формат запроса или отсутствуют изображения.
    * **Response (409 Conflict):** Ошибка базы данных или загрузки изображений.

* **GET /publications/query/{query}:**
    * Получить публикации по поисковому запросу.
    * **Path parameter:** `query=<search_query>`
    * **Response (JSON, 200 OK):** Массив объектов `Publication`.
    * **Response (409 Conflict):** Ошибка базы данных.

* **GET /publications/category/{category}:**
    * Получить публикации по категории.
    * **Path parameter:** `category=<category_name>`
    * **Response (JSON, 200 OK):** Массив объектов `Publication`.

* **GET /publications/{id}/views:**
    * Получить количество просмотров публикации.
    * **Path parameter:** `id=<publication_id>`
    * **Response (200 OK):** `<views_count>`

* **GET /publications/favorites/count/{id}:**
    * Получить количество пользователей, добавивших публикацию в избранное.
    * **Path parameter:** `id=<publication_id>`
    * **Response (200 OK):**  `<favorites_count>`

* **GET /publication/categories:**
    * Получить список категорий.
    * **Response (JSON, 200 OK):**  `{<category_id>: "<category_name>", ...}`

* **GET /publication/priceTypes:**
    * Получить список типов цен.
    * **Response (JSON, 200 OK):**  `{<price_type_id>: "<price_type_name>", ...}`

* **GET /publication/districts:**
    * Получить список районов.
    * **Response (JSON, 200 OK):** Массив строк с названиями районов.
    * **Response (409 Conflict):** Ошибка получения районов.


* **POST /publications/filtered:**
    * Получить отфильтрованные публикации.
    * **Request body (JSON):** Объект `FilterRequest` (см. ниже).
    * **Response (JSON, 200 OK):** Массив объектов `Publication`.
    * **Response (400 Bad Request):** Неверный формат запроса.
    * **Response (409 Conflict):** Ошибка базы данных.

* **Модель FilterRequest (JSON):**
    ```json
    {
      "minPrice": <min_price>, // может быть null
      "maxPrice": <max_price>, // может быть null
      "priceTypes": ["<price_type_1>", "<price_type_2>", ...], // может быть null
      "districts": ["<district_1>", "<district_2>", ...], // может быть null
      "categories": ["<category_1>", "<category_2>", ...], // может быть null
      "minUserRating": <min_user_rating> // может быть null
    }
    ```

* **GET /image/{id}/{name}:**
    * Получить изображение публикации.
    * **Path parameters:** `id=<publication_id>`, `name=<image_name>`
    * **Response (200 OK, Content-Type: image/jpeg):** Данные изображения.
    * **Response (400 Bad Request):** Изображение не найдено.


**4. Избранное:**

* **POST /favorites/publication/add:** (Защищено аутентификацией)
    * Добавить публикацию в избранное.
    * **Request body (JSON):** `{"publicationId": "<publication_id>"}`
    * **Response (200 OK):** `<true/false>` - успешно ли добавлено.
    * **Response (400 Bad Request):** Неверный формат запроса.

* **POST /favorites/publication/remove-single:** (Защищено аутентификацией)
    * Удалить публикацию из избранного.
    * **Request body (JSON):** `{"publicationId": "<publication_id>"}`
    * **Response (200 OK):** `<true/false>` - успешно ли удалено.
    * **Response (400 Bad Request):** Неверный формат запроса.
    * **Response (401 Unauthorized):** Невалидный токен.

* **GET /favorites/publication/{id}/check:** (Защищено аутентификацией)
    * Проверить, находится ли публикация в избранном.
    * **Path parameter:** `id=<publication_id>`
    * **Response (200 OK):** `<true/false>`
    * **Response (400 Bad Request):** Неверный `id`.
    * **Response (401 Unauthorized):** Невалидный токен.
    * **Response (500 Internal Server Error):** Ошибка сервера.

* **GET /favorites/publication/fetch:** (Защищено аутентификацией)
    * Получить список избранных публикаций пользователя.
    * **Response (JSON, 200 OK):** Массив объектов `Publication`.
    * **Response (409 Conflict):** Ошибка JWT.

* **POST /publications/favorites/remove-all:** (Защищено аутентификацией)
    * Удалить все избранные публикации пользователя.
    * **Response (200 OK):**  Запрос выполнен успешно.
    * **Response (409 Conflict):** Ошибка JWT.



**5. Отзывы:**

* **POST /reviews/new:** (Защищено аутентификацией)
    * Добавить новый отзыв.
    * **Request body (JSON):** `{"taskId": "<task_id>", "reviewValue": <review_value>, "reviewMessage": "<review_message>"}`
        * `reviewMessage` - опционально.
    * **Response (200 OK):** Объект `Review`.
    * **Response (400 Bad Request):** Неверный формат запроса или задача не существует.
    * **Response (409 Conflict):** Ошибка добавления отзыва, JWT ошибка.


* **GET /users/reviews/user/{userid}:** (Защищено аутентификацией)
    * Получить отзывы о пользователе.
    * **Path parameter:** `userid=<user_id>`
    * **Response (JSON, 200 OK):** Массив объектов `Review`.
    * **Response (400 Bad Request):** Пользователь не существует.

* **GET /users/reviews/author/{authorid}:** (Защищено аутентификацией)
    * Получить отзывы, оставленные пользователем.
    * **Path parameter:** `authorid=<user_id>`
    * **Response (JSON, 200 OK):** Массив объектов `Review`.
    * **Response (400 Bad Request):** Пользователь не существует.


* **Модель Review (JSON):**
    ```json
    {
      "id": "<review_id>",
      "reviewerId": "<reviewer_id>",
      "executorId": "<executor_id>",
      "reviewValue": <review_value>, // может быть null
      "reviewMessage": "<review_message>", // может быть null
      "timestamp": <timestamp>,
      "publicationId": "<publication_id>"
    }
    ```

**6. Задачи:**

* **GET /tasks:** (Защищено аутентификацией)
    * Получить задачи пользователя.
    * **Query parameters:** `userId=<user_id>`, `userStatus=<executor/customer>`, `taskStatus=<accepted/declined/complete/closed>`
    * **Response (JSON, 200 OK):** Массив объектов `WideTask`.
    * **Response (400 Bad Request):** Недостаточно информации для запроса или некорректный статус задачи.
    * **Response (409 Conflict):** Неверный запрос.


* **Модель WideTask (JSON):**
    ```json
    {
        "task": {<task_object>},
        "executor": {<user_response_object>},
        "publication": {<publication_object>}
    }
    ```

* **GET /chat/task:** (Защищено аутентификацией)
    * Получить задачу по ID чата или публикации.
    * **Query parameters:** `chatId=<chat_id>` ИЛИ `pubId=<publication_id>`
    * **Response (JSON, 200 OK):** Объект `Task`.
    * **Response (400 Bad Request):** Неверный запрос, некорректные параметры.
    * **Response (409 Conflict):** Задача не найдена, JWT ошибка.


* **Модель Task (JSON):**
    ```json
    {
      "id": "<task_id>",
      "executorId": "<executor_id>",
      "customerId": "<customer_id>",
      "publicationId": "<publication_id>",
      "chatId": "<chat_id>",
      "status": "<status>",
      "timestamp": <timestamp>,
      "deadline": <deadline_timestamp>
    }
    ```

**7. Обновления:**

* **GET /update/check/{version}:**
    * Проверить наличие обновлений.
    * **Path parameter:** `version=<current_app_version>`
    * **Response (JSON, 200 OK):** `{"exists": <true/false>}`
    * **Response (400 Bad Request):** Неверный формат запроса.
    * **Response (409 Conflict):** Ошибка облака.

* **GET /update/download/{version}:**
    * Скачать обновление.
    * **Path parameter:** `version=<app_version>`
    * **Response (200 OK, Content-Type: application/octet-stream):** APK-файл обновления.
    * **Response (400 Bad Request):** Обновление не найдено.

* **GET /update/download/last:**
    * Скачать последнее доступное обновление.
    * **Response (200 OK, Content-Type: application/octet-stream):** APK-файл обновления.
    * **Response (409 Conflict):** Ошибка облака.


**8. Чат:**

* **WebSocket /chat:** (Защищено аутентификацией)
    * **Query parameters:**  `chatID=<chat_id>` ИЛИ `pubID=<publication_id>`
    * **Incoming/Outgoing messages (JSON):** Объекты `IncomingTextFrame`.
    * **Response (400 Bad Request):** Неверный запрос или ID чата/публикации.
    * **Response (401 Unauthorized):** Невалидный токен.
    * **Response (409 Conflict):** Ошибка базы данных или JWT ошибка.


* **Модель IncomingTextFrame (JSON):**
    ```json
    {
        "type": "<message/deal_request/deal_response/task>",
        "data": {<data_object>}
    }
    ```

    * `data` - объект, соответствующий типу сообщения (например, `MessageDTO`, `DealRequest`, `Task`).


* **GET /chats/get:** (Защищено аутентификацией)
    * Получить список чатов пользователя.
    * **Response (JSON, 200 OK):** Массив объектов `DetailedChat`.
    * **Response (401 Unauthorized):** Невалидный токен.
    * **Response (409 Conflict):** Ошибка базы данных.


* **Модель DetailedChat (JSON):**
    ```json
    {
      "chatId": "<chat_id>",
      "sellerId": "<seller_id>",
      "avatar": "<avatar_url>",
      "lastMessage": "<last_message>",
      "publicationTitle": "<publication_title>",
      "timestamp": <timestamp>
    }
    ```

* **GET /chat/by-chat_id/{chatID}/messages:** (Защищено аутентификацией)
    * Получить сообщения чата по ID.
    * **Path parameter:** `chatID=<chat_id>`
    * **Response (JSON, 200 OK):** Массив объектов `Message`.
    * **Response (400 Bad Request):** Неверный запрос.
    * **Response (409 Conflict):** Ошибка получения сообщений.

* **GET /chat/by-publication_id/{pubID}/messages:** (Защищено аутентификацией)
    * Получить сообщения чата по ID публикации.
    * **Path parameter:** `pubID=<publication_id>`
    * **Response (JSON, 200 OK):** Массив объектов `Message`.
    * **Response (400 Bad Request):** Неверный запрос.
    * **Response (409 Conflict):** Ошибка получения сообщений, JWT ошибка.



* **Модель Message (JSON):**
    ```json
    {
      "id": "<message_id>",
      "fromId": "<sender_id>",
      "timestamp": <timestamp>,
      "messageBody": "<message_text>",
      "chatId": "<chat_id>",
      "messageType": "<message_type>"
    }
    ```

* **Модель MessageDTO (JSON):**
    ```json
    {
      "messageBody": "<message_text>",
      "messageType": "<message_type>"
    }
    ```

* **Модель DealRequest (JSON):**
    ```json
    {
        "jobTime": <job_deadline_timestamp>
    }
    ```

**9. Администрирование (только для администратора):**

* **POST /publications/moderate:** (Защищено аутентификацией)
    * Подтвердить/отклонить публикацию.
    * **Request body (JSON):** `{"publicationId": "<publication_id>", "approved": <true/false>}`
    * **Response (200 OK):** `Success\nApproved: <true/false>`
    * **Response (400 Bad Request):** Неверный формат запроса.
    * **Response (401 Unauthorized):** Невалидный токен или недостаточно прав.
    * **Response (409 Conflict):** Ошибка пользователя.
    * **Response (500 Internal Server Error):** Ошибка сервера.



Это основная информация по API. Если возникнут вопросы – обращайся!
