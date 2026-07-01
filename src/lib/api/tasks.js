import { serverFetch } from '../core/server';


// GET all tasks
export const getAllTasks = async () => {
  return serverFetch('/tasks');
};


// GET open tasks
export const getOpenTasks = async () => {
  return serverFetch('/open/tasks');
};

// GET task by task id
export const getTasksByTaskId = async (taskId) => {
  return serverFetch(`/tasks/${taskId}`);
};

// GET all tasks by client id
export const getAllTasksByClientId = async (clientId) => {
  return serverFetch(`/tasks/clientid?clientId=${clientId}`);
};

// GET last 4 task by client id 
export const getLatest4TasksByClientId = async (clientId) => {
  return serverFetch(`/latest/tasks?clientId=${clientId}`);
};









