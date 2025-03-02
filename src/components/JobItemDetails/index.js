import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsStarFill} from 'react-icons/bs'

import {IoLocationOutline, IoMedkit} from 'react-icons/io5'

import {FiExternalLink} from 'react-icons/fi'

import {Component} from 'react'

import SimilarJobData from '../SimilarJobData'

import Header from '../Header'

import SkillsList from '../SkillsList'

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
        jobDataCompanyUrl: jobDetails.company_logo_url,
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
        similarJobDataCompanyUrl: eachSimilarJob.company_logo_url,
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
      jobDataCompanyUrl,
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
            <img
              alt="job details company logo"
              className="jobIcon"
              src={jobDataCompanyUrl}
            />
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
            <h1 className="headings">Description</h1>
            <a href={companyWebsiteUrl} className="companyWebsiteUrl">
              Visit <FiExternalLink />
            </a>
          </div>
          <p>{jobDataDescription}</p>
          <h1 className="headings">Skills</h1>
          <ul className="skillsContainer">
            {updatedSkills.map(eachSkill => (
              <SkillsList key={eachSkill.name} eachSkillDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="headings">Life at Company</h1>
          <div className="lifeAtCompanyContainer">
            <p>{jobDataDescription}</p>
            <img alt="imageIcon" src={imageUrl} />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul className="allSimilarJobsContainer">
          {similarProductData.map(eachSimilarJob => (
            <SimilarJobData
              key={eachSimilarJob.id}
              eachSimilarJobDetails={eachSimilarJob}
            />
          ))}
        </ul>
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
