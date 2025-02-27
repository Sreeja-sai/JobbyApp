import {Component} from 'react'

import './index.css'

class FilterGroup extends Component {
  state = {employee: []}

  componentDidMount() {
    this.getJobsApICall()
  }

  getJobsApICall = () => {
    // const jobsApiUrl = 'https://apis.ccbp.in/jobs'
  }

  employementChange = event => {
    const {employee} = this.state
    const value = event.target
    if (event.target.checked) {
      const element = employee.includes(value)
      if (!element) {
        this.setState(prevState => ({
          employee: [...prevState.employee, event.target.value],
        }))
      }
    } else {
      const newEmployeeList = employee.filter(eachType => eachType !== value)
      this.setState({employee: newEmployeeList})
    }
  }

  employeeTypes = () => {
    const {employmentTypesList} = this.props
    return (
      <div>
        <p>Type of Employement</p>
        <ul>
          {employmentTypesList.map(eachType => (
            <li>
              <input
                type="checkbox"
                onChange={this.employementChange}
                id={eachType.employmentTypeId}
                value={eachType.employmentTypeId}
              />
              <label htmlFor={eachType.employmentTypeId}>
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  salaryRanges = () => {
    const {salaryRangesList} = this.props
    return (
      <div>
        <p>Salary Range</p>
        <ul>
          {salaryRangesList.map(eachType => (
            <li>
              <input
                type="radio"
                id={eachType.salaryRangeId}
                name="jobType"
                value={eachType.salaryRangeId}
              />
              <label htmlFor={eachType.salaryRangeId} className="salaryLabels">
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    // const {employee} = this.state
    // console.log(employee)
    // const {employmentTypesList, salaryRangesList} = this.props
    // console.log(employmentTypesList)
    // console.log(salaryRangesList)

    return (
      <div className="FilterGroupContainer">
        {this.employeeTypes()}
        {this.salaryRanges()}
      </div>
    )
  }
}

export default FilterGroup
