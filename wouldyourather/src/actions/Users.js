import { _saveQuestionAnswer } from '../utils/_DATA'
import { _answerQuestion } from '../actions/Questions'

export const GET_USERS = 'GET_USERS'
export const USER_ANSWER_QUESTION = 'USER_ANSWER_QUESTION'
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION'

export function receiveUsers (users) {
    return {
      type: GET_USERS,
      users,
    }
}



export function answerQuestion (authedUser, qid, answer) {
  return {
    type: USER_ANSWER_QUESTION,
    authedUser, 
    qid, 
    answer
  }
}

export function addQuestionToUser(authedUser, qid) {
  return {
    type: USER_ADD_QUESTION,
    authedUser,
    qid,
  };
}

export function handleAnswerQuestion (qid, answer) {
  return (dispatch, getState) => {
    //dispatch(showLoading());
    const { authedUser } = getState();
    return _saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        console.log("Your Answered Question 1");
        //dispatch(hideLoading())
        dispatch(answerQuestion( authedUser, qid, answer ));
      })
      .then(() => {
        console.log("Your Answered Question 2");
        dispatch(_answerQuestion( authedUser, qid, answer ));
      })
      .catch((e) => {
        console.warn("Error adding the question", e);
      });
  };
}
