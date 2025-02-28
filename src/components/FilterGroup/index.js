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
        <li>
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
        <li>
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
      <p>Salary Range</p>
      <ul className="salary-list">{renderSalaryList()}</ul>
    </div>
  )

  const employeeTypes = () => (
    <div>
      <p>Types of Employment</p>
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
