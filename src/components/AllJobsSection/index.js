import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import ProfileSection from '../ProfileSection'

import FilterGroup from '../FilterGroup'

import JobsHeader from '../JobsHeader'

import EachJobCard from '../EachJobCard'

// import Header from '../Header'

import './index.css'

const apiConstantsStages = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}
class AllJobsSection extends Component {
  state = {
    apiStatus: apiConstantsStages.initial,
    jobsList: [],
    activeEmployeeList: [],
    activeSalaryRange: '',
    activeSearchInput: '',
  }

  componentDidMount() {
    this.getJobsApICall()
  }

  getJobsApICall = async () => {
    this.setState({apiStatus: apiConstantsStages.inProgress})
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
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeTypeValue}&minimum_package=${activeSalaryRange}&search=${activeSearchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const {jobs} = data
      console.log(jobs)
      const updatedData = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiConstantsStages.success,
      })
    } else {
      this.setState({apiStatus: apiConstantsStages.failure})
    }
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

  successView = () => {
    const {jobsList} = this.state
    const jobsCount = jobsList.length > 0
    console.log(jobsCount)
    if (jobsCount) {
      return (
        <div>
          {jobsList.map(eachJob => (
            <EachJobCard eachJob={eachJob} />
          ))}
        </div>
      )
    }
    return (
      <div className="noFoundContainer">
        <img
          className="notFoundImage"
          alt="not found"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  failureView = () => (
    <div className="failureCaseDivContainer">
      <img
        className="failureImage"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />

      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page ypu are looking for</p>
    </div>
  )

  inProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  apiResultData = apiStatus => {
    switch (apiStatus) {
      case apiConstantsStages.success:
        return this.successView()
      case apiConstantsStages.failure:
        return this.failureView()
      case apiConstantsStages.inProgress:
        return this.inProgressView()
      default:
        return null
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props

    const {
      activeEmployeeList,
      activeSalaryRange,
      activeSearchInput,
      apiStatus,
    } = this.state

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
          {this.apiResultData(apiStatus)}
        </div>
      </div>
    )
  }
}

export default AllJobsSection
