import {Component} from 'react'

import Cookies from 'js-cookie'

import ProfileSection from '../ProfileSection'

import FilterGroup from '../FilterGroup'

import JobsHeader from '../JobsHeader'

import './index.css'

class AllJobsSection extends Component {
  state = {activeEmployeeList: [], activeSalaryRange: '', activeSearchInput: ''}

  componentDidMount() {
    this.getJobsApICall()
  }

  getJobsApICall = async () => {
    const {
      activeEmployeeList,
      activeSalaryRange,
      activeSearchInput,
    } = this.state
    let employeeTypeValue
    if (activeEmployeeList.length === 0) {
      employeeTypeValue = ''
    } else {
      employeeTypeValue = activeEmployeeList.join(',')
    }
    console.log(activeEmployeeList)
    console.log(activeSalaryRange)
    console.log(activeSearchInput)
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeTypeValue}&minimum_package=${activeSalaryRange}&search=${activeSearchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    const data = await response.json()
    console.log(data)
  }

  changeEmployeeList = employeElement => {
    const {activeEmployeeList} = this.state
    const elementValue = employeElement.value
    if (employeElement.checked) {
      const element = activeEmployeeList.includes(elementValue)
      if (!element) {
        this.setState(
          prevState => ({
            activeEmployeeList: [...prevState.activeEmployeeList, elementValue],
          }),
          this.getJobsApICall,
        )
      }
    } else {
      const newEmployeeList = activeEmployeeList.filter(
        eachType => eachType !== elementValue,
      )
      this.setState({activeEmployeeList: newEmployeeList}, this.getJobsApICall)
    }
  }

  changeSalaryRangeId = salaryId => {
    this.setState({activeSalaryRange: salaryId}, this.getJobsApICall)
  }

  changeSearchInput = searchInput => {
    this.setState({activeSearchInput: searchInput})
  }

  searchIconClick = () => {
    this.getJobsApICall()
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {
      activeEmployeeList,
      activeSalaryRange,
      activeSearchInput,
    } = this.state
    // console.log(activeSearchInput)
    return (
      <div className="allJobsContainer">
        <div className="profileAndFilteration">
          <ProfileSection />
          <FilterGroup
            activeSalaryRange={activeSalaryRange}
            changeSalaryRangeId={this.changeSalaryRangeId}
            salaryRangesList={salaryRangesList}
            activeEmployeeList={activeEmployeeList}
            changeEmployeeList={this.changeEmployeeList}
            employmentTypesList={employmentTypesList}
          />
        </div>
        <div className="jobsHeaderAndEachJobs">
          <JobsHeader
            activeSearchInput={activeSearchInput}
            changeSearchInput={this.changeSearchInput}
            searchIconInputClick={this.searchIconClick}
          />
        </div>
      </div>
    )
  }
}

export default AllJobsSection
