/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch} from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../../redux/actions";
import Button from "../Button/Button";
import "./AddTask.scss";

const AddTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [taskdesc, setTaskdesc] = useState("");
  const dispatch = useDispatch();

  // Function for close and open modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
//  Function to handle adding a new task
  const handleAddTask = () => {
    const newTaskData = {
      id: uuidv4(),
      title: newTask,
      description: taskdesc,
      completed: false,
    };
    dispatch(addTask(newTaskData));
// Clear input fields and close the modal
    setNewTask("");
    setTaskdesc("");
    closeModal();
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    handleAddTask();
  };
  return (
    <div>
      <Button
        text={"New Task"}
        className={"newTask_btn btn"}
        onClick={openModal}
      />
      {isModalOpen && (
        <div className="modal">
          <div className="modal_container ">
            <Button
              type="button"
              className="modal_closeBtn btn"
              onClick={closeModal}
              text={"x"}
            />
            <form onSubmit={onSubmitForm}>
              <input
                type="text"
                placeholder="Add Task"
                value={newTask}
                onChange={(e) => {
                  setNewTask(e.target.value);
                }}
                className="modal_inputTask"
              />
              <Button
                text={"Add Task"}
                className={"newTask_btn btn"}
                onClick={handleAddTask}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
