import React from "react";
import TaskItem from "./TaskItem";
import { TodoItem } from "../types";

interface TaskListProps {
  todoList: TodoItem[];
  viewCompleted: boolean;
  editItem: (item: TodoItem) => void;
  handleDelete: (item: TodoItem) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  todoList,
  viewCompleted,
  editItem,
  handleDelete,
}) => {
  const newItems = todoList.filter(
    (item) => item.completed === viewCompleted
  );

  return (
    <ul className="list-group list-group-flush border-top-0">
      {newItems.map((item) => (
        <TaskItem
          key={item.id}
          item={item}
          viewCompleted={viewCompleted}
          editItem={editItem}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
