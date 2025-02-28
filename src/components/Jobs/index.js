// import Cookies from 'js-cookie'

import Header from '../Header'

// import ProfileSection from '../ProfileSection'

import AllJobsSection from '../AllJobsSection'

import './index.css'

const Jobs = props => {
  const {employmentTypesList, salaryRangesList} = props

  return (
    <div className="jobsContainer">
      <Header />
      <AllJobsSection
        employmentTypesList={employmentTypesList}
        salaryRangesList={salaryRangesList}
      />
    </div>
  )
}

export default Jobs
