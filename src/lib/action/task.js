'use server';

import { serverMutation } from "../core/server";

// POST Task
export const postTask = async newTaskData => {
  return serverMutation('/tasks', newTaskData);
};

// PATCH Task
export const updateTask = async (taskId,newTaskData)=> {
  return serverMutation(`/tasks/${taskId}`, newTaskData, 'PATCH');
};

// DELETE Task
export const deleteTask = async taskId => {
  return serverMutation(`/tasks/${taskId}`, {}, 'DELETE');
};





