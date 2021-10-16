import ViewQuestions from './ViewQuestions'
import CardTemplate from './CardTemplate'

import { connect } from 'react-redux'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

const Home = props => {
    const [viewQuestions, setViewQuestions] = useState(true)
    const [chosenPoll, setChosenPoll] = useState();

    const handleChoosePoll = (qid) => {
        setChosenPoll(qid)
        setViewQuestions(!viewQuestions)
    }

    return (
        <Router>
        {
            viewQuestions === true 
            ?
            <Switch>
            <Route exact path="/poll">
                <Redirect to="poll/UnansweredQuestions" />
            </Route>
            <Route path="/poll/UnansweredQuestions">
                <ViewQuestions view = 'UnansweredQuestions' handleChoosePoll = { handleChoosePoll }/>
            </Route> 
            <Route path="/poll/AnsweredQuestions">
                <ViewQuestions view = 'AnsweredQuestions' handleChoosePoll = { handleChoosePoll }/>
            </Route> 
            </Switch>
            : 
            <Route path = {`/questions/:qID`}>
                <CardTemplate question = { props.questions[chosenPoll] }/>
            </Route>
        }
        </Router>
    )
}

function mapStateToProps ({ authedUser, users, questions }) {
    return {
      questions,
      myInfo: {...users[authedUser]},
      users: {...users}
    }
}

export default connect(mapStateToProps)(Home)