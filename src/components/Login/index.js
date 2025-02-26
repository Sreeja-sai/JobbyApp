import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {username: '', password: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  getUsernamePassword = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    console.log(userDetails)
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
  }

  render() {
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
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
