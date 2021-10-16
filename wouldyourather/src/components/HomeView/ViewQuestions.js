import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import CardTemplate from './CardTemplate'
import { withRouter } from 'react-router-dom'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

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
                (Object.keys(props.questions)
                .filter(checkQuestion => !Object.keys(props.myInfo.answers).includes(checkQuestion))
                .map(question => (
                    <CardTemplate key = {question} question = { props.questions[question] }> 
                        <Container className = 'text-left'>
                        <Card.Title>Would You Rather</Card.Title>
                        <Card.Subtitle className = "text-muted">
                            {props.questions[question].optionOne.text}
                        </Card.Subtitle>

                        <Button className = 'mt-3 w-100' variant="success" onClick = { () => {
                          props.handleChoosePoll(question)
                          props.history.push(`/questions/${question}`)
                          } } >      
                            View Poll
                        </Button>
                        </Container>
                    </CardTemplate>
                ))) :
                (Object.keys(props.myInfo.answers)
                .map(question => (
                    <CardTemplate key = {question} question = { props.questions[question] }>
                        <Container className = 'text-left'>
                        <Card.Title>Would You Rather</Card.Title>
                        <Card.Subtitle className = "text-muted">
                            {props.questions[question].optionOne.text}
                        </Card.Subtitle>
                          <Button className = 'mt-3 w-100' variant="success" onClick = { () => {
                            props.handleChoosePoll(question)
                            props.history.push(`/questions/${question}`)
                            } } >      
                              View Poll
                          </Button>
                        </Container>
                    </CardTemplate>
                )))
            }
        </Card.Body>
      </Card>
    )
}

// eslint-disable-next-line no-lone-blocks
{/* <Button className = 'mt-3' variant = "outline-success" 
onClick = { () => props.handleChoosePoll(question) }>
  <NavLink to = {`/home/${question}`} style = {{color: 'white', textDecoration: 'none'}}>  
      View Poll
  </NavLink>
</Button> */}

function mapStateToProps ({ authedUser, users, questions }) {
    return {
      questions,
      myInfo: {...users[authedUser]},
      users: {...users}
    }
}

export default withRouter(connect(mapStateToProps)(ViewQuestions))