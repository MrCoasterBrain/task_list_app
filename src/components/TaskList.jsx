import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

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

export default TaskList;
