import React, { useEffect, useState } from "react";

export default function TaskSection({task, oldTask, taskEdit, toggleTaskEdit, onUpdateTask}) {
  const [taskSection, setTaskSection] = useState(task);

  useEffect(() => {
    setTaskSection(task);
  }, [task]);

  const updateTaskSection = (newVal)=>{
    setTaskSection(taskSection=> ({...taskSection, ...newVal}));
  }

  const onSubmit = () =>{
    onUpdateTask(taskSection);
  }

  return (
    <div className='mx-auto d-inline-block mt-3 w-100'>
      <div
        className={`card-text h2 w-100 text-center ${taskEdit ? 'd-none' : ''}`}
      >
        {oldTask.heading}
      </div>
      <input
        type="text"
        value={taskSection.heading}
        onChange={e=> updateTaskSection({heading: e.target.value})}
        className={`card-text h2 w-100 text-center ${taskEdit ? '' : 'd-none'}`}
      />
      <div
        className={`card-text text-center w-100 p ${taskEdit ? 'd-none' : ''}`}
      >
        {oldTask.description}
      </div>
      <input
        type="text"
        value={taskSection.description}
        onChange={e=> updateTaskSection({description: e.target.value})}
        className={`card-text text-center p w-100 ${taskEdit ? '' : 'd-none'}`}
      />
      <div>
        Status: 
        <select
          value={taskSection.status}
          onChange={e=> updateTaskSection({status: e.target.value})}
          className={`card-title text-center custom-select w-25 mt-4 p ${!taskEdit ? 'hide-field' : ''}`}
        >
          <option value={0}>Pending</option>
          <option value={1}>In Progress</option>
          <option value={2}>Completed</option>
        </select>
      </div>
      <div>
        <input 
          type='date' 
          className={`card-text text-center custom-date w-50 ${!taskEdit ? 'hide-field' : ''}`}
          value={taskSection.deadline ? taskSection.deadline.split('T')[0] : ''}
          onChange={e=> updateTaskSection({deadline: e.target.value})}
        />
      </div>
    { taskEdit && <button className='btn btn-primary mt-3 me-3' onClick={onSubmit}>Update Task</button> }
    { taskEdit && <button className='btn btn-danger mt-3' onClick={toggleTaskEdit}>Cancel</button> }
    </div>
  )
}