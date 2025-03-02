import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', invalidText: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  validUser = jwtToken => {
    const {history} = this.props
    console.log(history)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  invalidUser = errorMsg => {
    this.setState({invalidText: errorMsg})
  }

  getUsernamePassword = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.validUser(data.jwt_token)
    } else {
      this.invalidUser(data.error_msg)
    }
  }

  render() {
    const {invalidText} = this.state
    const {history} = this.props
    const CookiesResult = Cookies.get('jwt_token')
    if (CookiesResult !== undefined) {
      history.replace('/')
    }
    return (
      <div className="loginContainer">
        <div className="loginCardContainer">
          <div className="loginLogoContainer">
            <img
              alt="icon"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>
          <form onSubmit={this.getUsernamePassword}>
            <div className="usernameContainer">
              <div className="labelContainer">
                <label className="nameLabel" htmlFor="username">
                  USERNAME
                </label>
              </div>
              <div className="inputContainer">
                <input
                  onChange={this.changeUsername}
                  className="passwordLabelInput"
                  placeholder="Username"
                  id="username"
                  type="text"
                />
              </div>
            </div>
            <div className="passwordContainer">
              <div className="labelContainer">
                <label className="passwordLabel" htmlFor="password">
                  PASSWORD
                </label>
              </div>
              <div className="inputContainer">
                <input
                  onChange={this.changePassword}
                  className="passwordLabelInput"
                  placeholder="Password"
                  id="password"
                  type="password"
                />
              </div>
            </div>

            <div className="loginButtonContainer">
              <button type="submit" className="loginBtn">
                Login
              </button>
              <p className="invalidText">{invalidText}</p>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
