import ViewQuestions from './ViewQuestions'

import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'

const Home = props => {
    return (
        props.authedUser !== null ? (
        <Switch>
            <Route exact path="/poll">
                <Redirect to="poll/UnansweredQuestions" />
            </Route>
            <Route path="/poll/UnansweredQuestions">
                <ViewQuestions view = 'UnansweredQuestions' />
            </Route> 
            <Route path="/poll/AnsweredQuestions">
                <ViewQuestions view = 'AnsweredQuestions'/>
            </Route> 
        </Switch>
        ) : (
            <div>Loading</div>
        )
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