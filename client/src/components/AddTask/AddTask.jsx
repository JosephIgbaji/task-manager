import React, { useState } from "react";
import "./AddTask.css";

const AddTask = ({ allTask, setAllTask, onToggle }) => {
  const [task, setTask] = useState("");
  const [day, setDay] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();

    if (task && day) {
      fetch("/api/v1/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: task, day }),
      })
        .then((response) => response.json())
        .then((json) => setAllTask([...allTask, json]));

      // console.log("Sumbit task");
      setTask("");
      setDay("");
      onToggle();
    }
  };
  return (
    // <div className="add-task">
    //   <h1>Task Manager</h1>
    //   <div className="add-task-input">
    //     <input type="text" placeholder="Enter Task" />
    //     <button>Add Task</button>
    //   </div>
    // </div>
    <form className="add-form" onSubmit={handleAddTask}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add Task"
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder="Add Day & Time"
        />
      </div>
      {/* <div className="form-control">
        <label>Set Reminder</label>
        <input type="checkbox" placeholder="Add Task"/>
      </div> */}
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
