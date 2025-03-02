import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsStarFill} from 'react-icons/bs'

import {IoLocationOutline, IoMedkit} from 'react-icons/io5'

import {FiExternalLink} from 'react-icons/fi'

import {Component} from 'react'

import Header from '../Header'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiConstants.initial,
    jobsData: [],
    similarProductData: [],
  }

  componentDidMount() {
    this.individualJobIdApiCall()
  }

  individualJobIdApiCall = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const jobIdapiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobIdapiUrl, options)
    if (response.ok) {
      const data = await response.json()
      // console.log(data.job_details)
      const jobDetails = data.job_details
      const lifeAtCompany = {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      }
      const similarJobs = data.similar_jobs
      const updatedJobData = {
        id: jobDetails.id,
        title: jobDetails.title,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        rating: jobDetails.rating,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        jobDataDescription: jobDetails.job_description,
        skills: jobDetails.skills,
        employmentType: jobDetails.employment_type,
        lifeAtCompany,
      }
      const updateSimilarData = similarJobs.map(eachSimilarJob => ({
        id: eachSimilarJob.id,
        title: eachSimilarJob.title,
        companyLogoUrl: eachSimilarJob.company_logo_url,
        location: eachSimilarJob.location,
        employmentType: eachSimilarJob.employment_type,
        similarJobDescription: eachSimilarJob.job_description,
        rating: eachSimilarJob.rating,
      }))
      this.setState({
        apiStatus: apiConstants.success,
        jobsData: updatedJobData,
        similarProductData: updateSimilarData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  successView = () => {
    const {jobsData, similarProductData} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      rating,
      location,
      packagePerAnnum,
      jobDataDescription,
      skills,
      employmentType,
      lifeAtCompany,
    } = jobsData
    const {imageUrl} = lifeAtCompany

    const updatedSkills = skills.map(eachSkill => ({
      name: eachSkill.name,
      imageUrl: eachSkill.image_url,
    }))

    return (
      <div className="jobsAndSimilarJobsContainer">
        <div className="eachJobDeatilContainer">
          <div className="titleContainer">
            <img alt="jobIcon" className="jobIcon" src={companyLogoUrl} />
            <div className="titleRateContainer">
              <h1 className="title">{title}</h1>
              <div className="ratingContainer">
                <BsStarFill fill="#fbbf24" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="packDetailContainer">
            <div className="locTypeContainer">
              <IoLocationOutline />
              <p className="location">{location}</p>
              <IoMedkit className="medkit" />
              <p className="empType">{employmentType}</p>
            </div>
            <div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="hrow" />
          <div className="descVisit">
            <p className="headings">Description</p>
            <a href={companyWebsiteUrl} className="companyWebsiteUrl">
              Visit <FiExternalLink />
            </a>
          </div>
          <p>{jobDataDescription}</p>
          <p className="headings">Skills</p>
          <div className="skillsContainer">
            {updatedSkills.map(eachJob => (
              <div className="eachSkill">
                <img
                  alt="eachImageIcon"
                  className="eachImageIcon"
                  src={eachJob.imageUrl}
                />
                <p>{eachJob.name}</p>
              </div>
            ))}
          </div>
          <p className="headings">Life at Company</p>
          <div className="lifeAtCompanyContainer">
            <p>{jobDataDescription}</p>
            <img alt="imageIcon" src={imageUrl} />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <div className="allSimilarJobsContainer">
          {similarProductData.map(eachSimilarJob => (
            <div className="similarJobsContainer">
              <div className="titleContainer">
                <img
                  alt="jobIcon"
                  className="jobIcon"
                  src={eachSimilarJob.companyLogoUrl}
                />
                <div className="titleRateContainer">
                  <h1 className="title">{eachSimilarJob.title}</h1>
                  <div className="ratingContainer">
                    <BsStarFill fill="#fbbf24" />
                    <p className="rating">{eachSimilarJob.rating}</p>
                  </div>
                </div>
              </div>
              <p className="headings">Description</p>
              <p>{eachSimilarJob.similarJobDescription}</p>
              <div className="locTypeContainer">
                <IoLocationOutline />
                <p className="location">{location}</p>
                <IoMedkit className="medkit" />
                <p className="empType">{employmentType}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  inProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="failureContainer">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        onClick={this.individualJobIdApiCall}
        className="retryBtn"
      >
        Retry
      </button>
    </div>
  )

  apiStatusResult = apiStatus => {
    switch (apiStatus) {
      case apiConstants.success:
        return this.successView()
      case apiConstants.failure:
        return this.failureView()
      case apiConstants.inProgress:
        return this.inProgressView()
      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state

    return (
      <div>
        <Header />
        {this.apiStatusResult(apiStatus)}
      </div>
    )
  }
}

export default JobItemDetails
