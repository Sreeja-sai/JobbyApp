import {BsStarFill} from 'react-icons/bs'

import {IoLocationOutline, IoMedkit} from 'react-icons/io5'

import './index.css'

const SimilarJobData = props => {
  const {eachSimilarJobDetails} = props
  const {
    similarJobDataCompanyUrl,
    title,
    rating,
    similarJobDescription,
    location,
    employmentType,
  } = eachSimilarJobDetails
  return (
    <li className="similarJobsContainer">
      <div className="titleContainer">
        <img
          alt="job details company logo"
          className="jobIcon"
          src={similarJobDataCompanyUrl}
        />
        <div className="titleRateContainer">
          <h1 className="title">{title}</h1>
          <div className="ratingContainer">
            <BsStarFill fill="#fbbf24" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="headings">Description</h1>
      <p>{similarJobDescription}</p>
      <div className="locTypeContainer">
        <IoLocationOutline />
        <p className="location">{location}</p>
        <IoMedkit className="medkit" />
        <p className="empType">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobData
