import { _getUsers, _getQuestions } from '../utils/_DATA'
import { receiveQuestions } from './Questions'
import { receiveUsers } from './Users'

export function handleInitialData () {
    return (dispatch) => {
        Promise.all([
            _getQuestions(),
            _getUsers()
          ]).then(([ questions, users ]) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
          })
      }
  }