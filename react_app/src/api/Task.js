import axios from 'axios';

export async function getTasks() {
  try{
    const res = await axios.get(`tasks`);
    const tasks = res.data.tasks;
    return tasks;
  }
  catch(error) {
    console.error('There was an error fetching the tasks!', error);
  }
  return [];
}

export async function getTask(id) {
  try{
    const res = await axios.get(`tasks/${id}`);
    const task = res.data;
    return task;
  }
  catch(error) {
    console.error('There was an error fetching the tasks!', error);
  }
  return [];
}

export async function deleteTask(id) {
  try{
    await axios.delete(`tasks/${id}`);
  }
  catch(error) {
    console.error('There was an error deleting the task!', error);
  }
  return [];
}

export async function createTask(newTask) {
  try{
    const res = await axios.post(`tasks`, { task: newTask })
    return res;
  }
  catch(error) {
    console.error('There was an error deleting the task!', error);
  }
  return [];
}

export async function updateTask(data, id) {
  try{
    const res = await axios.put(`tasks/${id}`, data );
    return res;
  }
  catch(error) {
    console.error('There was an error deleting the task!', error);
  }
  return null;
}

export async function filteredTasks(data) {
  try{
    debugger
    const res = await axios.get(`tasks/get_filtered_tasks`, {params: data});
    return res.data;
  }
  catch(error) {
    console.error('There was an error deleting the task!', error);
  }
  return [];
}
