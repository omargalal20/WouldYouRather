import { _saveQuestion } from  '../utils/_DATA'
import { addQuestionToUser } from '../actions/Users'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions (questions) {
    return {
      type: GET_QUESTIONS,
      questions,
    }
}

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}
export function _answerQuestion( authedUser, qid, answer ) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function handleAddQuestion (optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    //dispatch(showLoading())
    console.log('handlee 1')
    return _saveQuestion({
      optionOneText : optionOne,
      optionTwoText : optionTwo,
      author: authedUser
    })
    .then((question) => {
      console.log("Your new question: ", question);
      dispatch(addQuestion(question));
      dispatch(addQuestionToUser(authedUser, question.id));
      //dispatch(hideLoading());
    });
  }
}

