// import {Component} from 'react'

// import Cookies from 'js-cookie'

import './index.css'

const FilterGroup = props => {
  const renderEmployeeTypesList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(eachEmployeType => {
      const {changeEmployeeList} = props
      const changeEmployeeType = event => changeEmployeeList(event.target)
      return (
        <li key={eachEmployeType.employmentTypeId}>
          <input
            type="checkbox"
            onChange={changeEmployeeType}
            id={eachEmployeType.employmentTypeId}
            value={eachEmployeType.employmentTypeId}
          />
          <label htmlFor={eachEmployeType.employmentTypeId}>
            {eachEmployeType.label}
          </label>
        </li>
      )
    })
  }
  const renderSalaryList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(eachSalaryItem => {
      const {changeSalaryRangeId} = props
      const changeSalaryClick = () =>
        changeSalaryRangeId(eachSalaryItem.salaryRangeId)
      return (
        <li key={eachSalaryItem.salaryRangeId}>
          <input
            onChange={changeSalaryClick}
            type="radio"
            id={eachSalaryItem.salaryRangeId}
            name="jobType"
            value={eachSalaryItem.salaryRangeId}
          />
          <label
            htmlFor={eachSalaryItem.salaryRangeId}
            className="salaryLabels"
          >
            {eachSalaryItem.label}
          </label>
        </li>
      )
    })
  }
  const salaryRanges = () => (
    <div>
      <h1>Salary Range</h1>
      <ul className="salary-list">{renderSalaryList()}</ul>
    </div>
  )

  const employeeTypes = () => (
    <div>
      <h1>Type of Employment</h1>
      <ul className="employee-list">{renderEmployeeTypesList()}</ul>
    </div>
  )

  return (
    <div className="FilterGroupContainer">
      {employeeTypes()}
      {salaryRanges()}
    </div>
  )
}

export default FilterGroup
