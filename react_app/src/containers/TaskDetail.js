import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import TaskSection from '../components/TaskSection';
import ExistingSubtasks from '../components/ExistingSubtasks';
import NewSubtasks from '../components/NewSubtasks'

import { updateTask, getTask } from '../api';
import { deleteSubtask, createSubtask, updateSubtask, updateSubtaskPatch } from '../api';

const TaskDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [task, setTask] = useState({});
  const [oldTask, setOldTask] = useState({});
  const [subtasks, setSubtasks] = useState([]);
  const [oldSubtasks, setOldSubtasks] = useState([]);
  
  const [taskEdit, setTaskEdit] = useState(false);
  const [newSubTasks, setnewSubTasks] = useState([]);
  const [subtaskEdit, setSubtaskEdit] = useState(false)

  useEffect(() => {
    const fetchTask = async (id)=>{
      const fetchedTask  = await getTask(id);
      setTask(fetchedTask);
      setOldTask(fetchedTask);
      setSubtasks(fetchedTask.subtasks || []);
      setOldSubtasks(fetchedTask.subtasks || []);
    }
    fetchTask(id);
  }, [id]);

  async function handleTaskUpdate(updatedTask) {
    const _tasks  = await updateTask(updatedTask, id);
    setTask(_tasks.data);
    setOldTask(_tasks.data);
    setTaskEdit(!taskEdit);
  }

  async function handleSubtaskDelete(subtaskId) {
    await deleteSubtask(subtaskId);
    setSubtasks(subtasks.filter(subtask => subtask.id !== subtaskId));
  }

  async function handleNewSubtaskCreate(task_id, updatedSubtask, index, e) {
    e.preventDefault();
    updatedSubtask['task_id'] = task_id
    const _subtask  = await createSubtask(updatedSubtask);
    let updatedArray = [_subtask.data.task, ...subtasks]
    setSubtasks(updatedArray);
    setOldSubtasks(updatedArray);
    setnewSubTasks(newSubTasks.filter((subtask, i) => i !== index));
  };

  async function handleSubtaskUpdate(subtaskId, updatedSubtask) {
    const _subtask  = await updateSubtask(subtaskId, updatedSubtask);
    setSubtasks(subtasks.map(subtask => (subtask.id === subtaskId ? _subtask.data : subtask)));
    setOldSubtasks(subtasks);
    alert('Subtask updated successfully');
  }

  async function subtaskStatusUpdate(subtaskId, data) {
    const _subtask  = await updateSubtaskPatch(subtaskId, data);
    setSubtasks(subtasks.map(subtask => (subtask.id === subtaskId ? _subtask.data : subtask)));
  }

  const handleNewSubtaskDelete = (subtaskId) => {
    setnewSubTasks(newSubTasks.filter((subtask, i) => i !== subtaskId));
  }

  function UpdateSubtask(subtaskId, updatedSubtask) {
    setSubtasks(subtasks.map(subtask => (subtask.id === subtaskId ? updatedSubtask : subtask)));
  }

  function UpdateNewSubtask(index, e) {
    setnewSubTasks(newSubTasks.map((subtask, i) => i === index ? e : subtask));
  }

  const handleAddSubtask = () => {
    setnewSubTasks([...newSubTasks, { description: '', status: 0 }]);
  };

  const handleSubtaskEdit = () => {
    setSubtaskEdit(!subtaskEdit)
  }

  return (
    <div className="card mt-5 w-50" >
      <div className="card-body">
        <div className='d-flex justify-content-between'>
          <div>
            <img onClick={() => navigate('/')} src={`${process.env.PUBLIC_URL}/images/return.svg`} width='30px' height='30px'/>
          </div>
          <div>
            <img onClick={() => setTaskEdit(!taskEdit)} src={`${process.env.PUBLIC_URL}/images/pen.svg`}/>
          </div>
        </div>
        <TaskSection 
          task={task}
          oldTask={oldTask}
          taskEdit={taskEdit}
          onUpdateTask={handleTaskUpdate}
        />
        <div className='subtasks mt-33'>
          <div className='d-flex justify-content-between'>
            <div className='d-inline-flex align-items-center ps-4'>
              <h5 className="card-title mb-0 me-2">Subtasks</h5> {/* Adjust margin-right with me-2 */}
              <div onClick={handleAddSubtask}>
                <img src={`${process.env.PUBLIC_URL}/images/plus.svg`} width={20} height={20} />
              </div>
            </div>
            <div>
              { 
                subtasks.length > 0 &&
                !subtaskEdit &&
                <img onClick={() => handleSubtaskEdit()} src={`${process.env.PUBLIC_URL}/images/pen.svg`}/>
              }
            </div>
          </div>
          <ExistingSubtasks 
            subtasks={subtasks}
            oldSubtasks={oldSubtasks}
            subtaskEdit={subtaskEdit}
            UpdateSubtask={UpdateSubtask}
            handleSubtaskEdit={handleSubtaskEdit}
            handleSubtaskDelete={handleSubtaskDelete}
            handleSubtaskUpdate={handleSubtaskUpdate}
            subtaskStatusUpdate={subtaskStatusUpdate}
          />
          <NewSubtasks
            newSubTasks={newSubTasks}
            UpdateNewSubtask={UpdateNewSubtask}
            handleNewSubtaskCreate={handleNewSubtaskCreate}
            task={task}
            handleNewSubtaskDelete={handleNewSubtaskDelete}            
          />
        </div>
        {subtaskEdit && <button onClick={handleSubtaskEdit}>Done</button>}
      </div>
    </div>
  )
}

export default TaskDetail;
