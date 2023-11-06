import React, { useState } from "react";
import "./EditTask.css";
import Button from "../Button/Button";

const EditTask = ({ task, onShowEdit, onShowTask }) => {
  const [name, setName] = useState(task?.name);
  const [day, setDay] = useState(task?.day);
  const [completed, setCompleted] = useState(task?.completed);

  const handleClose = () => {
    onShowEdit();
    onShowTask();
    window.localStorage.clear();
  };

  const handleEditTask = (e) => {
    e.preventDefault();

    fetch(`/api/v1/tasks/${task._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, completed, day }),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    // console.log(`Task with ID: ${task.id} has been updated`);

    // if (task && day) {
    //   fetch("http://localhost:5000/api/v1/tasks", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ text: task, day }),
    //   })
    //     .then((response) => response.json())
    //     .then((json) => setAllTask([...allTask, json]));

    //   // console.log("Sumbit task");
    //   setTask("");
    //   setDay("");
    // }
    // console.log(completed);
    // console.log(text);
    onShowEdit();
    onShowTask();
    window.localStorage.clear();
  };
  return (
    <div className="form-section">
      <form className="edit-form" onSubmit={handleEditTask}>
        <div className="edit-form-control">
          <p className="label-title">Task ID</p>
          <p className="task-id">{task?._id}</p>
        </div>
        <div className="edit-form-control">
          <label className="label-title">Task</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="edit-form-control">
          <label className="label-title">Day & Time</label>
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="edit-form-control">
          <label className="label-title">Completed</label>
          <input
            type="checkbox"
            value={completed}
            checked={completed}
            onChange={(e) => setCompleted(e.currentTarget.checked)}
          />
        </div>
        <input type="submit" value="Update Task" className="btn btn-block" />
      </form>
      <Button text="Back" color="Red" onClick={handleClose} />
    </div>
  );
};

export default EditTask;
