import {Component} from 'react'

import {Link} from 'react-router-dom'

// import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="homeContainer">
        <Header />
        <div className="jobsText">
          <h1 className="head">Find The Job That Fits Your Life</h1>
          <p className="desc">
            Millions of people are searching for jobs,salary information,
            company reviews.Find the job that fits your abilities and potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="findJobBtn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
