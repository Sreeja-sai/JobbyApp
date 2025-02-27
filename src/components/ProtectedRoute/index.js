import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const cookieResult = Cookies.get('jwt_token')
  const {history} = this.props

  if (cookieResult === undefined) {
    history.replace('/login')
  }
}
