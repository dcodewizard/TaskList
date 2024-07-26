export default function NewTaskForm(props) {
  return (
    <form onSubmit={props.handleCreateTask} className='mb-4'>
      <div className='mb-3'>
        <input 
          placeholder="Heading"
          type='text'
          name='heading'
          className='form-control'  
          value={props.newTask.heading} 
          onChange={props.handleInputChange} 
          required 
        />
      </div>
      <div className='mb-3'>
        <input 
          placeholder="Description"
          type='text'
          name='description'
          className='form-control' 
          value={props.newTask.description} 
          onChange={props.handleInputChange} 
          required 
        />
      </div>
      <div className='mb-3'>
        <input 
          type='date'
          name='deadline'
          className='form-control'
          value={props.newTask.deadline} 
          onChange={props.handleInputChange} 
          required 
        />
      </div> 
      <div className='mb-3'>
        {
          (props.newTask.subtasks_attributes.length > 0) && (
            <label className='form-label'>Subtasks</label>
          )
        }
        {props.newTask.subtasks_attributes.map((subtask, index) => (
          <div key={index} className='input-group mb-2'>
            <input 
              type='text' 
              className='form-control' 
              placeholder='Subtask Description' 
              name='description' 
              value={subtask.description} 
              onChange={(e) => props.handleSubtaskChange(index, e)} 
              required
            />
            <button 
              type='button' 
              className='btn btn-danger' 
              onClick={() => props.handleRemoveSubtask(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button 
          type='button' 
          className='btn btn-primary' 
          onClick={props.handleAddSubtask}
        >
          Add Subtask
        </button>
      </div>
      <button type='submit' className='btn btn-success'>Create Task</button>
      <div className="mt-3">
        <button className='btn btn-danger' onClick={props.handleShowForm}>Cancel</button>
      </div>
    </form>
  )
}