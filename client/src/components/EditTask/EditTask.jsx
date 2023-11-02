import React, { useState } from "react";
import "./EditTask.css";
import Button from "../Button/Button";

const EditTask = ({ task, onShowEdit, onShowTask }) => {
  const [text, setText] = useState(task?.text);
  const [day, setDay] = useState(task?.day);
  const [completed, setCompleted] = useState(task?.completed);

  const handleClose = () => {
    onShowEdit();
    onShowTask();
    window.localStorage.clear();
  };

  const handleEditTask = (e) => {
    e.preventDefault();

    fetch(`/api/v1/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, completed, day }),
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
          <p>TASK ID</p>
          <p>{task?.id}</p>
        </div>
        <div className="edit-form-control">
          <label>Task</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="edit-form-control">
          <label>Day & Time</label>
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>
        <div className="edit-form-control">
          <label>Completed</label>
          <input
            type="checkbox"
            value={completed}
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
