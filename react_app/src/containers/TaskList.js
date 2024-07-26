import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NewTaskForm from '../components/NewTaskForm'
import SingleTask from '../components/SingleTask'
import {getTasks, deleteTask, createTask, updateTask, filteredTasks} from '../api';
import FiltersHeader from '../components/FiltersHeader';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ heading: '', description: '', deadline: '', subtasks_attributes: [] });
  const [showForm, setShowForm] = useState(false);
  const [statusfilter, setStatusFilter] = useState(3);
  const [datefilter, setDateFilter] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async ()=>{
      const _tasks  = await getTasks();
      setTasks(_tasks);
    }
    fetchTasks();
  }, [])

  async function removeTask(taskId) {
    await deleteTask(taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  async function handleCreateTask(e) {
    e.preventDefault();
    const _tasks  = await createTask(newTask);
    setTasks([_tasks.data.task, ...tasks]);
    setNewTask({ heading: '', description: '', subtasks_attributes: [{ description: '' }] });
    setShowForm(false)
  };

  async function handleStatusChange(taskId, newStatus, tasks) {
    const _tasks  = await updateTask({status: newStatus}, taskId);
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  }

  async function handleFilter(statusval, dateval) {
    setStatusFilter(statusval);
    setDateFilter(dateval);
    const _tasks  = await filteredTasks({statusfilter: statusval, datefilter: dateval});
    setTasks(_tasks);
  }

  const handleDivClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubtaskChange = (index, e) => {
    const { name, value } = e.target;
    const newSubtasks = newTask.subtasks_attributes.map((subtask, sIndex) => {
      if (index !== sIndex) return subtask;
      return { ...subtask, [name]: value };
    });
    setNewTask({ ...newTask, subtasks_attributes: newSubtasks });
  };

  const handleAddSubtask = () => {
    setNewTask({ ...newTask, subtasks_attributes: [...newTask.subtasks_attributes, { description: '' }] });
  };

  const handleRemoveSubtask = (index) => {
    const newSubtasks = newTask.subtasks_attributes.filter((_, sIndex) => index !== sIndex);
    setNewTask({ ...newTask, subtasks_attributes: newSubtasks });
  };

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  return (
    <div className='w-50'>
      <h1 className='mb-4 mt-4'>Task List</h1>
      <FiltersHeader
        showForm={showForm}
        handleShowForm={handleShowForm}
        statusfilter={statusfilter}
        handleFilter={handleFilter}
        datefilter={datefilter}
      />
      {showForm &&
          (<NewTaskForm
            handleInputChange={handleInputChange}
            handleCreateTask={handleCreateTask}
            newTask={newTask}
            handleShowForm={handleShowForm}
            handleSubtaskChange={handleSubtaskChange}
            handleRemoveSubtask={handleRemoveSubtask}
            handleAddSubtask={handleAddSubtask}
          />)
      }
      <ul className='list-group'>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <SingleTask 
              key={task.id}
              removeTask={removeTask}
              handleDivClick={handleDivClick}
              task={task}
              index={index}
              handleStatusChange={handleStatusChange}
              tasks={tasks}
            />
          ))
        ) : (
          <div className='no-task-div'>No tasks</div>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
