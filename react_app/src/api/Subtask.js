import axios from 'axios';

export async function deleteSubtask(id) {
  try{
    await axios.delete(`subtasks/${id}`);
  }
  catch(error) {
    console.error('There was an error deleting the task!', error);
  }
  return [];
}

export async function createSubtask(newSubtask) {
  try{
    const res = await axios.post(`subtasks`, newSubtask);
    return res;
  }
  catch(error) {
    console.error('There was an error deleting the task!', error);
  }
  return [];
}

export async function updateSubtask(subtaskId, updatedSubtask) {
  try{
    const res = await axios.put(`subtasks/${subtaskId}`, updatedSubtask);
    return res;
  }
  catch(error) {
    console.error('There was an error deleting the task!', error);
  }
  return [];
}

export async function updateSubtaskPatch(subtaskId, data) {
  try{
    const res = await axios.patch(`subtasks/${subtaskId}`, data);
    return res;
  }
  catch(error) {
    console.error('There was an error deleting the task!', error);
  }
  return [];
}

