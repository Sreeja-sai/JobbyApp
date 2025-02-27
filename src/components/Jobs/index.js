// import Cookies from 'js-cookie'

import JobsHeader from '../JobsHeader'

import ProfileSection from '../ProfileSection'

import './index.css'

const Jobs = props => {
  const {employmentTypesList, salaryRangesList} = props

  return (
    <div className="jobsContainer">
      <JobsHeader />
      <ProfileSection
        employmentTypesList={employmentTypesList}
        salaryRangesList={salaryRangesList}
      />
    </div>
  )
}

export default Jobs
