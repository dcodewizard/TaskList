export default function NewSubtasks(props) {
  return (
    <ul>
      {props.newSubTasks.length > 0 && (
        props.newSubTasks.map((subtask, index) => (
          <form onSubmit={(e) => props.handleNewSubtaskCreate(props.task.id, props.newSubTasks[index], index, e)} className="d-flex justify-content-between">
            <input
              type="text"
              className="card-text fields-size w-75"
              value={subtask.description}
              onChange={(e) => props.UpdateNewSubtask(index, {description: e.target.value, status: subtask.status})} 
              required
            />
            <div>
              <button type='submit' className="me-3">Save</button>
              <img onClick={() => props.handleNewSubtaskDelete(index)}
                   src={`${process.env.PUBLIC_URL}/images/trashcan.svg`} 
                   className="plus-icon" 
                   alt='plus-icon'/>
            </div>
          </form>
        )))
      }
    </ul>
  )
} 