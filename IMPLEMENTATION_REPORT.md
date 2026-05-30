# Практическая работа №3: Работа с данными и маршрутизация

## Описание выполненной работы

Успешно реализовано React-приложение "Менеджер задач" с поддержкой маршрутизации и загрузкой данных из открытого API.

---

## 1. Установленные зависимости

```bash
npm install react-router-dom
```

**Версия:** react-router-dom ^6.x

---

## 2. Структура маршрутов

### Основные маршруты приложения:

| Маршрут | Компонент | Описание |
|---------|-----------|---------|
| `/` | `TasksPage` | Главная страница со списком задач |
| `/about` | `AboutPage` | Страница информации о приложении |

### Реализация маршрутов в `App.jsx`:

```jsx
import { Routes, Route } from 'react-router-dom';
import TasksPage from './pages/TasksPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TasksPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
```

---

## 3. Структура приложения

### Директория `src/pages/`

#### `TasksPage.jsx`
- Главная страница приложения
- Отображает заголовок "Список задач"
- Подключает компонент `TaskList` для вывода задач

#### `AboutPage.jsx`
- Страница информации о приложении
- Содержит описание функциональности
- Информация о технологиях, используемых в проекте

### Обновленные компоненты

#### `Header.jsx` (с навигацией)
```jsx
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <h1>Менеджер задач</h1>
      <nav className="app-nav">
        <Link to="/">Задачи</Link>
        <Link to="/about">О приложении</Link>
      </nav>
    </header>
  );
}
```

**Особенности:**
- Использует компонент `Link` из React Router
- Навигация без перезагрузки страницы (SPA)
- Две ссылки: на главную страницу и страницу "О приложении"

#### `TaskList.jsx` (с API интеграцией)
```jsx
import { useState, useEffect } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading-message">Загрузка задач...</p>;
  }

  if (error) {
    return <p className="error-message">Ошибка: {error}</p>;
  }

  return (
    <section className="task-list-section">
      <h2>Список задач на сегодня</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span className="task-title">{task.title}</span>
            <span className="task-status">{task.completed ? '✔' : '❌'}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

**Особенности:**
- Использует `useState` для управления состоянием (tasks, loading, error)
- Использует `useEffect` для загрузки данных при монтировании компонента
- Обработка трех состояний: загрузка, ошибка, успешная загрузка
- Отображение статуса выполнения задачи (✔ или ❌)
- Ограничение на 10 задач через параметр `_limit=10`

---

## 4. API интеграция

### Используемый API
**URL:** `https://jsonplaceholder.typicode.com/todos?_limit=10`

### Структура данных задачи
```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

### Используемые поля
- **id** - уникальный идентификатор (используется как ключ React)
- **title** - текст задачи
- **completed** - статус выполнения (boolean)

---

## 5. Обработка состояний

### Состояния загрузки

1. **Загрузка (loading = true)**
   - Отображается сообщение: "Загрузка задач..."
   - Пользователь видит, что происходит загрузка данных

2. **Ошибка (error !== null)**
   - Отображается сообщение об ошибке
   - Пользователь информируется о проблеме

3. **Успешная загрузка (loading = false, error = null)**
   - Отображается список задач
   - Каждая задача показывает статус выполнения

---

## 6. Настройка BrowserRouter

### `main.jsx`
```jsx
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

**Назначение:**
- `BrowserRouter` оборачивает приложение
- Позволяет использовать маршруты и навигацию
- Отслеживает изменения URL в адресной строке

---

## 7. Проверка работы

### Запуск приложения
```bash
npm run dev
```

### Доступные URL
- **http://localhost:5173/** - Главная страница со списком задач
- **http://localhost:5173/about** - Страница информации о приложении

### Функциональность
✅ Навигация между страницами без перезагрузки  
✅ Загрузка задач из API при открытии главной страницы  
✅ Отображение статуса загрузки  
✅ Обработка ошибок  
✅ Отображение статуса выполнения каждой задачи  

---

## 8. Сборка проекта

```bash
npm run build
```

**Результат:**
- ✓ 48 модулей успешно преобразовано
- ✓ Размер: 232.12 kB (gzip: 74.45 kB)
- ✓ Сборка завершена без ошибок

---

## 9. Файловая структура проекта

```
src/
├── pages/
│   ├── TasksPage.jsx      (новый файл)
│   └── AboutPage.jsx      (новый файл)
├── components/
│   ├── Header.jsx         (обновлен)
│   ├── TaskList.jsx       (обновлен)
│   ├── TaskItem.jsx
│   ├── TaskForm.jsx
│   └── Footer.jsx
├── App.jsx                (обновлен)
├── main.jsx               (обновлен)
├── App.css
├── index.css
└── assets/
```

---

## 10. Выполненные требования

✅ **Шаг 1:** Анализ структуры данных API  
✅ **Шаг 2:** Получение данных с API через useEffect  
✅ **Шаг 3:** Обработка состояний загрузки и ошибок  
✅ **Шаг 4:** Установка и настройка React Router  
✅ **Шаг 5:** Создание страниц приложения (TasksPage, AboutPage)  
✅ **Шаг 6:** Реализация навигации через Header компонент  

---

## Заключение

Практическая работа №3 успешно завершена. Приложение полностью функционально:
- Реализована многостраничная структура SPA
- Интегрирована работа с асинхронными данными
- Настроена маршрутизация с React Router
- Обработаны все состояния загрузки и ошибок
- Приложение готово к использованию и развертыванию
