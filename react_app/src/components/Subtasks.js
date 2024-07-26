export default function Subtasks(props) {
  return (
    <div>
      {props.task.subtasks && props.task.subtasks.length > 0 ? (
        <div>
          {props.task.subtasks.map((subtask) => (
            <div>
              <p>{subtask.description} - {subtask.status === 0 ? 'Pending' : subtask.status === 1 ? 'In Progress' : 'Completed'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No subtasks available.</p>
      )}
    </div>
  )
}