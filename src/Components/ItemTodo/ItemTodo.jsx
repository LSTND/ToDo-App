/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { taskEdit, taskDelete, taskCompleted } from "../../redux/actions";
import Button from "../Button/Button";
import "./ItemTodo.scss";
import "../AddTask/AddTask.scss";

const ItemTodo = ({ todo }) => {
  const [editTaskId, setEditTaskId] = useState(0);
  const [editTask, setEditTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  // Edit button click handler
  const handleEditClick = (taskId, taskText) => {
    setEditTaskId(taskId);
    setEditTask(taskText);
    setIsEditing(true);
  };

  // Handler for saving the edited task
  const handleSaveEdit = () => {
    // Create an updated task with a new title
    const updatedTodo = {
      ...todo,
      title: editTask,
    };
    // / Dispatching a taskEdit action with an updated task
    dispatch(
      taskEdit({
        id: editTaskId,
        updateTask: updatedTodo,
      })
    );
    // Reset state after editing
    setEditTaskId(null);
    setEditTask("");
  };
  // // Undo handler
  const handleCancelEdit = () => {
    setEditTaskId(null);
    setEditTask("");
    setIsEditing(false);
  };

  // Delete button click handler
  const handleDeleteTask = (taskId) => {
    dispatch(taskDelete({ taskId }));
  };

  // Handler for switching task execution state
  const handleToggleComplete = (taskId) => {
    dispatch(taskCompleted({ taskId }));
  };

  return (
    <div className={`itemTodo ${todo.completed ? "completed" : ""}`}>
      {/* Conditional rendering depending on editing mode for input  */}
      {isEditing && editTaskId === todo.id ? (
        <div className="editTask_container">
          <input
            className="editTask_input"
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
          />
          <div className="editTask_btn">
            <Button
              text="Save"
              className="newTask_btn btn"
              onClick={handleSaveEdit}
            />
            <Button
              text="Cancel"
              className="newTask_btn btn"
              onClick={handleCancelEdit}
            />
          </div>
        </div>
      ) : (
        <>
          <p className={`itemTodo_title ${todo.completed ? "completed" : ""}`}>
            {todo.title}
          </p>
          <div className="itemBtn">
            <Button
              className={`button ${
                todo.completed ? "doneBtn" : "notCompletedBtn"
              }`}
              onClick={() => handleToggleComplete(todo.id)}
            />
            <Button
              className={`button editBtn ${todo.completed ? "completed" : ""}`}
              onClick={() => handleEditClick(todo.id, todo.title)}
            />
            <Button
              className="button deleteBtn"
              onClick={() => handleDeleteTask(todo.id)}
            />
          </div>
        </>
      )}
    </div>
  );
};
ItemTodo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ItemTodo;
