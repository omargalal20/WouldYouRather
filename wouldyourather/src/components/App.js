import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import SignInForm from './SignInView/SignIn';
import { connect } from 'react-redux';
import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions';

import Home from './HomeView/Home';
import LeaderboardView from './LeaderboardView/LeaderboardView';
import NewQuestion from './NewQuestionView/NewQuestion';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
          <Router>
            <NavBar/>
            {
              this.props.loggedIn === false
              ? 
              <>
              <Route path = '/'>
                <SignInForm/>
              </Route>
              </> 
              :
              <>
              <Route exact path = '/poll'>
                <Home/>
              </Route>
              <Route exact path = '/add'>
                <NewQuestion/>
              </Route>
              <Route exact path = '/leaderboard'>
                <LeaderboardView/>
              </Route>
              </>
            }
          </Router>
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
