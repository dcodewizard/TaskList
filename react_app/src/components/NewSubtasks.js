export default function NewSubtasks(props) {
  return (
    <ul>
      {props.newSubTasks.length > 0 && (
        props.newSubTasks.map((subtask, index) => (
          <form onSubmit={(e) => props.handleNewSubtaskCreate(props.task.id, props.newSubTasks[index], index, e)} className="d-flex justify-content-between">
            <input
              type="text"
              className="card-text fields-size"
              value={subtask.description}
              onChange={(e) => props.UpdateNewSubtask(index, {description: e.target.value, status: subtask.status})} 
              required
            />
            <button type='submit'>Save</button>
            <div>
              <img onClick={() => props.handleNewSubtaskDelete(index)} src={`${process.env.PUBLIC_URL}/images/trashcan.svg`} className="plus-icon" />
            </div>
          </form>
        )))
      }
    </ul>
  )
} 