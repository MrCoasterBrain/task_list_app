function TaskItem({ task, deleteTask }) {
  return (
    <li className="task-item">
      <span className="task-title">{task.title}</span>
      <button className="delete-btn" onClick={() => deleteTask(task.id)}>Удалить</button>
    </li>
  );
}

export default TaskItem;
