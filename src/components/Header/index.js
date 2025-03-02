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
    <ul className="headerContainer">
      <li>
        <Link to="/">
          <img
            className="homePageIcon"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
      </li>
      <li className="headerText">
        <Link to="/">
          <p className="homeText">Home</p>
        </Link>
        <Link to="/jobs">
          <p className="jobText">Jobs</p>
        </Link>
      </li>
      <li>
        <button type="button" onClick={logoutBtn} className="logoutButton">
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
