import {Component} from 'react'

// import Cookies from 'js-cookie'

import JobsHeader from '../JobsHeader'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <JobsHeader />
        <div className="jobsText">
          <h1 className="head">Find The Job That Fits For Your Life</h1>
          <p className="desc">
            Millions of people are searching for jobs,salary information,
            company reviews.Find the job that fits your abilities and potential.
          </p>
          <button type="button" className="findJobBtn">
            Find Jobs
          </button>
        </div>
      </div>
    )
  }
}

export default Home
