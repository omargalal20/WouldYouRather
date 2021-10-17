import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import CardTemplate from './CardTemplate'
import { withRouter, NavLink } from 'react-router-dom'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from "react-bootstrap/Button";

import { connect } from 'react-redux'
import { useState } from 'react'

const ViewQuestions = props => {
    const [questions, setQuestions] = useState(props.view);

    return (
        <Card className = "m-auto mt-3" style={{ width: '50vw' }}>
        <Card.Header>
          <Tabs
              id="controlled-tab-example"
              activeKey={questions}
              onSelect={(k) => {
                setQuestions(k)
                props.history.push(`/poll/${k}`)
              }}
              className="d-flex justify-content-center"
            >
            <Tab eventKey="UnansweredQuestions" title="UnansweredQuestions"/>
            <Tab eventKey="AnsweredQuestions" title="AnsweredQuestions"/>
          </Tabs>
        </Card.Header>
        <Card.Body>
            {
                questions === 'UnansweredQuestions' ? 
                (props.unAnsweredQuestions
                .map(question => (
                    <CardTemplate key = {question.id} question = { question }> 
                        <Container className = 'text-left'>
                        <Card.Title>Would You Rather</Card.Title>
                        <Card.Subtitle className = "text-muted">
                            {question.optionOne.text}
                        </Card.Subtitle>

                        <NavLink to={`/questions/${question.id}`}>
                            <Button className = 'mt-3 w-100' variant="info">
                            View Poll
                            </Button>
                         </NavLink>
                        </Container>
                    </CardTemplate>
                ))) :
                (props.answeredQuestions
                .map(question => (
                    <CardTemplate key = {question.id} question = { question }>
                        <Container className = 'text-left'>
                        <Card.Title>Would You Rather</Card.Title>
                        <Card.Subtitle className = "text-muted">
                            {question.optionOne.text}
                        </Card.Subtitle>

                          <NavLink to={`/questions/${question.id}`}>
                            <Button className = 'mt-3 w-100' variant="info">
                            View Poll
                            </Button>
                          </NavLink>
                        </Container>
                    </CardTemplate>
                )))
            }
        </Card.Body>
      </Card>
    )
}


function mapStateToProps ({ authedUser, users, questions }) {
  const answeredQuestions = Object.values(questions)
  .filter((question) => Object.keys(users[authedUser].answers).includes(question.id)) 
  .map((question) => Object.assign({}, question, { type: "answered" }))
  .sort((a, b) => b.timestamp - a.timestamp); 

const unAnsweredQuestions = Object.values(questions)
  .filter((question) => !Object.keys(users[authedUser].answers).includes(question.id))
  .map((question) => Object.assign({}, question, { type: "unanswered" }))
  .sort((a, b) => b.timestamp - a.timestamp);
return {
    answeredQuestions,
    unAnsweredQuestions,
      questions,
      myInfo: {...users[authedUser]},
      users: {...users}
    }
}

export default withRouter(connect(mapStateToProps)(ViewQuestions))