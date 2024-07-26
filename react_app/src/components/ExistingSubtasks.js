export default function ExistingSubtasks(props) {
  return (
    <ul>
      {props.subtasks.length > 0 && (
        props.subtasks.map((subtask) => (
          <li key={subtask.id} className="d-flex justify-content-between mt-3">
            <div>
              <div
                className={`card-text text-start fields-size ${props.subtaskEdit ? 'd-none' : ''}`}
                style={{ textDecoration: subtask.completed ? 'line-through' : 'none' }}
              >
                {subtask.description}
              </div>
              <input
                type="text"
                value={subtask.description}
                className={`card-text fields-size ${props.subtaskEdit ? '' : 'd-none'}`}
                onChange={(e) => {
                  const updatedSubtask = { ...subtask, description: e.target.value };
                  props.UpdateSubtask(subtask.id, updatedSubtask);
                }}
              />
            </div>
            <div className="d-flex">
              { props.subtaskEdit &&
                <button className="me-3" onClick={() => {props.handleSubtaskUpdate(subtask.id, subtask)}}>Update</button>
              }
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={(e) => props.subtaskStatusUpdate(subtask.id, {completed: e.target.checked})}
                className="custom-checkbox"
              />
              <div>
                <img onClick={() => props.handleSubtaskDelete(subtask.id, subtask)} src={`${process.env.PUBLIC_URL}/images/trashcan.svg`} className="plus-icon" />
              </div>
            </div>
          </li>
        )))
      }
    </ul>
  )
}