import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class FilterGroup extends Component {
  state = {employee: [], salary: ''}

  componentDidMount() {
    this.getJobsApICall()
  }

  getJobsApICall = async () => {
    const {employee, salary} = this.state
    let employeeTypeValue
    if (employee.length === 0) {
      employeeTypeValue = ''
    } else {
      employeeTypeValue = employee.join(',')
    }
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeTypeValue}&minimum_package=${salary}&search=`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    console.log(response)
  }

  employementChange = event => {
    const {employee} = this.state
    const elementValue = event.target.value
    if (event.target.checked) {
      const element = employee.includes(elementValue)
      if (!element) {
        this.setState(
          prevState => ({
            employee: [...prevState.employee, elementValue],
          }),
          this.getJobsApICall,
        )
      }
    } else {
      const newEmployeeList = employee.filter(
        eachType => eachType !== elementValue,
      )
      this.setState({employee: newEmployeeList}, this.getJobsApICall)
    }
  }

  salaryRangeChanges = event => {
    this.setState({salary: event.target.value}, this.getJobsApICall)
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
                onChange={this.salaryRangeChanges}
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
    const {employee} = this.state
    console.log(employee)
    // const {employmentTypesList, salaryRangesList} = this.props
    return (
      <div className="FilterGroupContainer">
        {this.employeeTypes()}
        {this.salaryRanges()}
      </div>
    )
  }
}

export default FilterGroup
