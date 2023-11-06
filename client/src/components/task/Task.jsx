import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./task.css";

const Task = ({
  task,
  onDeleteTask,
  onShowEdit,
  onShowTask,
  setTaskToEdit,
}) => {
  const handleEdit = (task) => {
    setTaskToEdit(task);
    onShowEdit();
    onShowTask();
    window.localStorage.setItem("taskID", task._id);
  };
  return (
    <div className="mytask">
      <div className="task-left">
        {/* {task.completed && <i className="color-green bi bi-check-circle"></i>} */}
        <i
          className={
            task.completed
              ? "color-green bi bi-check-circle"
              : "transparent bi bi-check-circle"
          }
        ></i>
        <div className="tasks">
          <h3>{task.name}</h3>
          <p>{task.day}</p>
        </div>
      </div>
      <div className="task-right">
        <i
          onClick={() => handleEdit(task)}
          className="cursor color-green bi bi-pencil-square"
        ></i>
        <i
          onClick={() => onDeleteTask(task)}
          className="cursor color-red bi bi-trash3"
        ></i>
      </div>
    </div>
  );
};

export default Task;
