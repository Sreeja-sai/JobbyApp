import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const {history} = props
  const logoutBtn = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="headerContainer">
      <div>
        <img
          className="homePageIcon"
          alt="homeIcon"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </div>
      <div className="headerText">
        <Link to="/">
          <p className="homeText">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="jobText">Jobs</p>
        </Link>
      </div>
      <div>
        <button type="button" onClick={logoutBtn} className="logoutButton">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
