
export default function SingleTask(props) {
  const dateObj = new Date(props.task.deadline);
  const formattedDate = dateObj.toLocaleDateString();

  const status = ['Pending', 'In Progress', 'Completed']
  
  return (
    <div class="card mb-3" style={{backgroundColor: `${parseInt(props.task.status) === 0 ? 'white' : parseInt(props.task.status) === 1 ? '#FFFDD0' : '#e6ffe6'}`}}>
      <div class="card-header">
        <div className='d-flex justify-content-between'>
          {props.task.heading}
          <div className='d-flex'>
            <h4>Status:</h4>
            <select
              className='status-drpdn h4 me-5'
              value={props.task.status}
              onChange={(e) => props.handleStatusChange(props.task.id, e.target.value, props.tasks)}
            >
              <option value="0">Pending</option>
              <option value="1">In Progress</option>
              <option value="2">Completed</option>
            </select>
            <img onClick={() => props.removeTask(props.task.id)}
                 src={`${process.env.PUBLIC_URL}/images/trashcan.svg`}
                 className="plus-icon" 
                 alt='delete-icon'
                 height='20px' width='20px'/>
          </div>
        </div>
      </div>
      <div class="card-body text-start" onClick={() => props.handleDivClick(props.task.id)} style={{ cursor: 'pointer' }}>
        <blockquote class="blockquote mb-0">
          <p>{props.task.description}</p>
          <footer className="blockquote-footer">Status: {status[props.task.status]} ( <i className='text-danger'>{formattedDate}</i> )</footer>
        </blockquote>
      </div>
    </div>
  )
}