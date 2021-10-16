import { combineReducers } from 'redux'
import questions from './Questions'
import users from './Users'
import authedUser from './AuthedUsers'
//import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
    users,
    questions,
    authedUser
  //loadingBar: loadingBarReducer,
})