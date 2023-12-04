/* eslint-disable no-irregular-whitespace */
import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
// Take tasks from local storage
const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks")) || [];
// Initial state of the storage
export const initialState = {
  tasks: tasksFromLocalStorage,
};
// Function to update local storage
const updateLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export default createReducer(initialState, (builder) => {
  builder
    // Action for tasks
    .addCase(actions.tasks, (state, { payload }) => {
      const storedTasks =
        tasksFromLocalStorage.length > 0 ? tasksFromLocalStorage : payload;
      state.tasks = storedTasks;
      if (storedTasks.length === 0) {
        updateLocalStorage(payload);
      }
    })

    // action for add new task
    .addCase(actions.addTask, (state, { payload }) => {
      state.tasks.push(payload);
      updateLocalStorage(state.tasks);
    })

    // action for edit task
    .addCase(actions.taskEdit, (state, { payload }) => {
      // Search task in the list
      const index = state.tasks.findIndex(
        (item) => item && item.id === payload.id
      );
      // If a task is found, update task's content
      if (index !== -1) {
        state.tasks[index] = payload.updateTask;
        updateLocalStorage(state.tasks);
      }
    })

    // action for delete task
    .addCase(actions.taskDelete, (state, { payload }) => {
      const taskId = payload.taskId;
      // Filtering tasks to find only those that match by id
      state.tasks = state.tasks.filter((item) => {
        return item.id !== taskId;
      });
      updateLocalStorage(state.tasks);
    })

    // action for completed task
    .addCase(actions.taskCompleted, (state, { payload }) => {
      const index = state.tasks.findIndex((item) => item.id === payload.taskId);
      // change the completed values ​for the found task
      state.tasks[index].completed = !state.tasks[index].completed;
      updateLocalStorage(state.tasks);
    });
});
