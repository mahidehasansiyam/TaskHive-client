import { serverFetch } from '../core/server';


// GET all tasks
export const getAllTasks = async () => {
  return serverFetch('/tasks');
};

// Get all tasks by client email
export const getAllTasksByClientEmail = async (email) => {
  return serverFetch(`/tasks?clientEmail=${email}`);
};


// GET open tasks
export const getOpenTasks = async (queryString) => {
  return serverFetch(`/open/tasks?${queryString}`);
};

// GET task by task id
export const getTasksByTaskId = async (taskId) => {
  return serverFetch(`/tasks/${taskId}`);
};

// GET last 4 task by client id 
export const getLatest4TasksByClientEmail = async (clientEmail) => {
  return serverFetch(`/latest/tasks?clientEmail=${clientEmail}`);
};










