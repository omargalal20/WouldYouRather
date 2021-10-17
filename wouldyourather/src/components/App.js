import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import SignInForm from './SignInView/SignIn';
import { connect } from 'react-redux';
import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { handleInitialData } from '../actions';

import Home from './HomeView/Home';
import LeaderboardView from './LeaderboardView/LeaderboardView';
import NewQuestion from './NewQuestionView/NewQuestion';
import NotFound from './NotFound';
import CardTemplate from './HomeView/CardTemplate';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
          <>
            <NavBar/>
            {
              this.props.loggedIn === false
              ? 
              <>
              <SignInForm/>
              </> 
              :
              <>
              <Switch>
              <Route exact path="/">
                <Redirect to="poll" />
              </Route>
              <Route  path = '/poll'>
                <Home/>
              </Route>
              <Route  path = '/add'>
                <NewQuestion/>
              </Route>
              <Route  path = '/leaderboard'>
                <LeaderboardView/>
              </Route>
              <Route path = '/questions/:qID'>
                  <CardTemplate/>
              </Route>
              <Route path="/not-found">
                  <NotFound />
              </Route>
              </Switch>
              </>
            }
          </>
    );
  }
}
function mapStateToProps ({ authedUser }) {
  return {
    loggedIn: authedUser !== null,
    id: authedUser !== null ? authedUser : null
  }
}

export default connect(mapStateToProps)(App)
