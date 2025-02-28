import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

// import FilterGroup from '../FilterGroup'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileSection extends Component {
  state = {apiStatus: apiConstants.initial, profileData: []}

  componentDidMount() {
    this.getProfileApi()
  }

  getProfileApi = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const updatedProfileData = {
        profileImageUrl: profileDetails.profile_image_url,
        name: profileDetails.name,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        apiStatus: apiConstants.success,
        profileData: updatedProfileData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  inProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="successContainer">
        <img alt="profileIcon" className="profileIcon" src={profileImageUrl} />
        <h1 className="profileName">{name}</h1>
        <p className="profileBio">{shortBio}</p>
      </div>
    )
  }

  failureView = () => (
    <div>
      <button type="button" onClick={this.getProfileApi} className="retryBtn">
        Retry
      </button>
    </div>
  )

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
    // const {employmentTypesList, salaryRangesList} = this.props
    return (
      <div>
        <div className="profileSectionContainer">
          {this.apiStatusResult(apiStatus)}
        </div>
        <hr />
      </div>
    )
  }
}

export default ProfileSection
