import React, { useState, useEffect } from "react";
import axios from "axios";
import Tasks from "./components/tasks/Tasks";
import AddTask from "./components/AddTask/AddTask";
import Header from "./components/Header/Header";
import EditTask from "./components/EditTask/EditTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showTask, setShowTask] = useState(true);
  const [showEditTask, setShowEditTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleAddToggle = () => {
    setShowAdd(!showAdd);
  };

  const handleShowTaskToggle = () => {
    setShowTask(!showTask);
  };

  const handleShowEditToggle = () => {
    setShowEditTask(!showEditTask);
  };

  const handleSetTaskToEdit = (task) => {
    setTaskToEdit(task);
  };
  useEffect(() => {
    fetch("/api/v1/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, [showEditTask]);

  // useEffect(() => {
  //   axios
  //     .get("/api/v1/tasks")
  //     .then((response) => {
  //       setTasks(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [<EditTask />]);

  useEffect(() => {
    const id = window.localStorage.getItem("taskID");
    if (id && tasks?.length > 0) {
      setShowEditTask(true);
      setShowTask(false);
      const tsk = tasks.filter((todo) => todo.id == id);
      console.log("tsk", tsk);
      setTaskToEdit(tsk[0]);
    }
  }, [tasks?.length]);

  const handleDeleteTask = (task) => {
    fetch(`/api/v1/tasks/${task.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    console.log(`Task with ID: ${task.id} is deleted`);

    setTasks(tasks.filter((todo) => todo.id !== task.id));
  };

  return (
    <div className="container">
      <Header
        title="Task Manager"
        onToggle={handleAddToggle}
        showAdd={showAdd}
      />
      {showAdd && (
        <AddTask
          onToggle={handleAddToggle}
          allTask={tasks}
          setAllTask={setTasks}
        />
      )}

      {showTask && (
        <Tasks
          tasks={tasks}
          onDelete={handleDeleteTask}
          onShowEdit={handleShowEditToggle}
          onShowTask={handleShowTaskToggle}
          setTaskToEdit={handleSetTaskToEdit}
        />
      )}
      {showEditTask && (
        <EditTask
          onShowEdit={handleShowEditToggle}
          onShowTask={handleShowTaskToggle}
          task={taskToEdit}
        />
      )}
    </div>
  );
}

export default App;
