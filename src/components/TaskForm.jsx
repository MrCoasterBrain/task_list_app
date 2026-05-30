import { useState } from 'react';

function TaskForm({ addTask }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim() === '') return;
    addTask(text);
    setText('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите задачу"
        className="task-input"
      />
      <button type="submit" className="task-btn">Добавить</button>
    </form>
  );
}

export default TaskForm;
