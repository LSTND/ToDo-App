import { createAction } from "@reduxjs/toolkit";

export const tasks = createAction("TASKS");
export const addTask = createAction("ADD_TASK");
export const taskEdit = createAction("TASK_EDIT");
export const taskDelete = createAction("TASK_DELETE");
export const taskCompleted = createAction("TASK_COMPLETED");

