import Cookies from 'js-cookie'

import JobsHeader from '../JobsHeader'

import ProfileSection from '../ProfileSection'

import './index.css'

const Jobs = props => {
  const {typesEmployeList, salaryRangeList} = props
  console.log(typesEmployeList)
  console.log(salaryRangeList)
  const cookieResult = Cookies.get('jwt_token')
  const {history} = props

  if (cookieResult === undefined) {
    history.replace('/login')
  }

  return (
    <div className="jobsContainer">
      <JobsHeader />
      <ProfileSection
        employementType={typesEmployeList}
        salaryRange={salaryRangeList}
      />
    </div>
  )
}

export default Jobs
