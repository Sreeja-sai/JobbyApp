import Cookies from 'js-cookie'

import JobsHeader from '../JobsHeader'

import ProfileSection from '../ProfileSection'

import './index.css'

const Jobs = props => {
  const cookieResult = Cookies.get('jwt_token')
  const {history} = props

  if (cookieResult === undefined) {
    history.replace('/login')
  }

  return (
    <div className="jobsContainer">
      <JobsHeader />
      <ProfileSection />
    </div>
  )
}

export default Jobs
