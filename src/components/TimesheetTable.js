function TimesheetTable({ timesheet, onUpdate, calculateTotals }) {
  const totals = calculateTotals()

  const handleInputChange = (e, day, field) => {
    const newValue = e.target.value
    const updatedTimesheet = timesheet.map((d) =>
      d.day === day ? { ...d, [field]: newValue } : d
    )
    onUpdate(updatedTimesheet)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Day of the Week</th>
          <th>Regular Time</th>
          <th>Overtime</th>
          <th>Vacation</th>
          <th>Holiday</th>
          <th>Unpaid Leave</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {timesheet.map(
          (
            { day, regular, overtime, vacation, holiday, unpaidLeave },
            index
          ) => (
            <tr key={day}>
              <td>{day}</td>
              <td>
                <div className='input-wrapper'>
                  <input
                    type='number'
                    value={regular}
                    onChange={(e) => handleInputChange(e, day, 'regular')}
                  />
                </div>
              </td>
              <td>
                <div className='input-wrapper'>
                  <input
                    type='number'
                    value={overtime}
                    onChange={(e) => handleInputChange(e, day, 'overtime')}
                  />
                </div>
              </td>
              <td>
                <div className='input-wrapper'>
                  <input
                    type='number'
                    value={vacation}
                    onChange={(e) => handleInputChange(e, day, 'vacation')}
                  />
                </div>
              </td>
              <td>
                <div className='input-wrapper'>
                  <input
                    type='number'
                    value={holiday}
                    onChange={(e) => handleInputChange(e, day, 'holiday')}
                  />
                </div>
              </td>
              <td>
                <div className='input-wrapper'>
                  <input
                    data-testid='Unpaid Leave'
                    type='number'
                    value={unpaidLeave}
                    onChange={(e) => handleInputChange(e, day, 'unpaidLeave')}
                  />
                </div>
              </td>
              <td>{totals[index]}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}

export default TimesheetTable
