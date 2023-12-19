/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import cx from "classnames";
import { memo, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { taskEdit, taskDelete, taskCompleted } from "../../redux/actions";
import { ItemViewModeContext } from "../../App";
import Button from "../Button/Button";
import "./ItemTodo.scss";
import "../AddTask/AddTask.scss";

const ItemTodo = memo(({ todo }) => {
  const { viewMode } = useContext(ItemViewModeContext);
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
    <div
      className={cx( "itemTodo",{ completed: todo.completed },{ gridView: viewMode === "grid" })}>
      {/* Conditional rendering depending on editing mode for input  */}
      {isEditing && editTaskId === todo.id ? (
        <div className="editTask_container">
          <input
            className={cx("editTask_input", { gridView: viewMode === "grid" })}
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
          />
          <div className={cx("editTask_btn", { gridView: viewMode === "grid" })}>
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
          <p className={cx("itemTodo_title",{ completed: todo.completed }, { gridView: viewMode === "grid" })} >
            {todo.title}
          </p>
          <div className={`itemBtn ${viewMode === "grid" ? "gridView" : ""}`}>
            <Button
              className={cx("button", {doneBtn: todo.completed, notCompletedBtn: !todo.completed,
              })}
              onClick={() => handleToggleComplete(todo.id)}
            />
            <Button
              className={cx("button", "editBtn", { completed: todo.completed })}
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
});
ItemTodo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ItemTodo;
