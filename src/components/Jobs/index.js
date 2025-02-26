import {Component} from 'react'

import Cookies from 'js-cookie'

import JobsHeader from '../JobsHeader'

import './index.css'

// const apiConstants = {
//   initial: 'INITIAL',
//   success: 'SUCCESS',
//   failure: 'FAILURE',
//   inProgress: 'IN_PROGRESS',
// }

class Jobs extends Component {
  componentDidMount() {
    this.getProfileApi()
  }

  getProfileApi = async () => {
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    const data = await response.json()
    console.log(data)
  }

  render() {
    const cookieResult = Cookies.get('jwt_token')
    const {history} = this.props

    if (cookieResult === undefined) {
      history.replace('/login')
    }
    return (
      <div>
        <JobsHeader />
        <div className="jobsContainer">Hello</div>
      </div>
    )
  }
}

export default Jobs
