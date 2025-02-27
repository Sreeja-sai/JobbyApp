import Cookies from 'js-cookie'

import {Route, Redirect} from 'react-router-dom'

// import Home from '../Home'

// import Jobs from '../Jobs'

const ProtectedRoute = props => {
  // const {typesEmployeList, salaryRangeList} = props
  const cookieResult = Cookies.get('jwt_token')
  if (cookieResult === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
