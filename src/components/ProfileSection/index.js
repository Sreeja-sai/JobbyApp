import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileSection extends Component {
  state = {apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getProfileApi()
  }

  getProfileApi = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    console.log(profileApiUrl)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApiUrl, options)
    // const data = await response.json()

    if (response.ok === true) {
      this.setState({apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  inProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successView = () => <div>Success</div>

  failureView = () => <h1>Failed...........</h1>

  apiStatusResult = apiStatus => {
    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.inProgressView()
      case apiConstants.failure:
        return this.failureView()
      case apiConstants.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state
    return (
      <div className="profileFilteration">
        <div className="profileSectionContainer">
          {this.apiStatusResult(apiStatus)}
        </div>
      </div>
    )
  }
}

export default ProfileSection
