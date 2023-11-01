import Task from "../task/Task";
import "./tasks.css";

const Tasks = ({ tasks, onDelete, onShowEdit, onShowTask, setTaskToEdit }) => {
  return (
    <div className="tasks">
      {tasks.map((task) => (
        <Task
          task={task}
          key={task.id}
          onDeleteTask={onDelete}
          onShowEdit={onShowEdit}
          onShowTask={onShowTask}
          setTaskToEdit={setTaskToEdit}
        />
      ))}
    </div>
  );
};

export default Tasks;
