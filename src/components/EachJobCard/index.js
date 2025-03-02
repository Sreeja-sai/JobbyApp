import {Link} from 'react-router-dom'

import './index.css'

import {BsStarFill} from 'react-icons/bs'

import {IoLocationOutline, IoMedkit} from 'react-icons/io5'

const EachJobCard = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachJob
  console.log(id)
  return (
    <Link to={`/jobs/${id}`}>
      <div className="eachJobContainer">
        <div className="titleContainer">
          <img className="jobIcon" alt="eachJobCardIcon" src={companyLogoUrl} />
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
        <hr className="hrowCard" />
        <div>
          <p>Description</p>
          <p>{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default EachJobCard
