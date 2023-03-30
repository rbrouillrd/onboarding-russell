import React from "react";
import { TodoItem } from "../types";

interface TaskItemProps {
  item: TodoItem;
  viewCompleted: boolean;
  editItem: (item: TodoItem) => void;
  handleDelete: (item: TodoItem) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  item,
  viewCompleted,
  editItem,
  handleDelete,
}) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span
        className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
        title={item.title}
      >
        {item.title}
      </span>
      <span
        className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
        title={item.description}
      >
        {item.description}
      </span>
      <span
        className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
        title={item.priority}
      >
        {item.priority}
      </span>
      <span
        className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
        title={item.due_date}
      >
        {item.due_date}
      </span>
      <span>
        <button
          className="btn btn-secondary mr-2"
          onClick={() => editItem(item)}
        >
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => handleDelete(item)}>
          Delete
        </button>
      </span>
    </li>
  );
};

export default TaskItem;
