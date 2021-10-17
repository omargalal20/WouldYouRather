import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { NavLink, withRouter } from 'react-router-dom'

import { connect } from 'react-redux';
import { logOut } from '../actions/AuthedUsers'
 
const NavBar = props => {
  console.log('navv', props)
    return (
        <Navbar expand="lg" variant="light" bg="light">
          <Container>
            <Tabs
                activeKey= {props.location.pathname}
                onSelect={(k) => {
                  props.history.push(`${k}`)
                }}
                className="me-auto"
              >
              <Tab eventKey="/poll/UnansweredQuestions" title="Home"/>
              <Tab eventKey="/add" title="New Question"/>
              <Tab eventKey="/leaderboard" title="Leaderboard"/>
            </Tabs>
            <Nav className="ml-auto" onSelect={(selectedKey) => props.dispatch(logOut())}>
                <Nav.Item>
                  {
                    props.loggedIn !== false ? (
                      <>
                      <Tabs>
                        <Tab title = {`Hello ${props.myInfo.name}`}/>
                      </Tabs>
                      <Nav.Item>
                        <Nav.Link as={NavLink} to="/signin" eventKey="logOut" >Log Out</Nav.Link>
                      </Nav.Item>
                      </>
                    ) : ''
                  }
                </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
    )
}

function mapStateToProps ({ authedUser, users }) {
  return {
    myInfo: {...users[authedUser]},
    loggedIn : authedUser !== null
  }
}

export default withRouter(connect(mapStateToProps)(NavBar))