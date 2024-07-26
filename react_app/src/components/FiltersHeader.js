export default function FiltersHeader(props) {
  return (
    <div>
      {!props.showForm && (
        <div className='d-flex justify-content-between'>
          <div class="mb-4" onClick={props.handleShowForm}>
            <img src={`${process.env.PUBLIC_URL}/images/plus.svg`} className="plus-icon" />
          </div>
          <div className='h4'>
          Filter:
            <select
              className='text-center m-3'
              value={props.statusfilter}
              onChange={(e) => props.handleFilter(e.target.value, props.datefilter)}
            >
              <option value={0}>Pending</option>
              <option value={1}>In Progress</option>
              <option value={2}>Completed</option>
              <option value={3}>All Tasks</option>
            </select>
            <select
              className='text-center m-3'
              value={props.datefilter}
              onChange={(e) => props.handleFilter(props.statusfilter, e.target.value)}
            >
              <option value={0}>Due today</option>
              <option value={1}>Due this week</option>
              <option value={2}>Past Due Date</option>
              <option value={3}>All Tasks</option>
            </select>
          </div>
        </div>
        )
      }
    </div>
  )
}