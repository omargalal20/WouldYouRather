import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Image from 'react-bootstrap/Image'

import { connect } from 'react-redux'
import { useState } from 'react'

import { handleAnswerQuestion } from '../../actions/Users'

const CardTemplate = props => {
    const [qid, setQid] = useState();
    const [answer, setAnswer] = useState();

    const handleSubmit = () => {
        props.dispatch(handleAnswerQuestion(qid, answer))
    }

    return (
        <Card className ="m-auto mt-3" style={{ width: '40vw' }}>
        <Card.Header>
            <Card.Title>{props.user.name} asks:</Card.Title>
        </Card.Header>
        <Card.Body className = 'd-flex'>
            <Container>
                <Image className = 'm-auto' src={props.user.avatarURL} roundedCircle />
            </Container>
            {
                (typeof props.children === 'undefined') ?

                ((props.didAnswer === true) ? 
                (
                    <Container >
                        <Card.Title>Results</Card.Title>
                        <Card className ="mt-3" border="secondary" style={{ width: '100%', backgroundColor: props.userAnswer === 'optionOne' ? '#00CED1' : '' }} >
                        <Card.Body>
                            <Card.Text>
                                {`Would you rather ${props.question.optionOne.text}?`}
                            </Card.Text>
                            {
                                props.userAnswer === 'optionOne' ? 
                                (<Card.Subtitle className = "text-muted text-center">
                                Your Answer
                                </Card.Subtitle>) : ''
                            }
                            <ProgressBar animated now={Math.round((props.optionOneVotes / props.totalVotes) * 100)} 
                            label={`${Math.round((props.optionOneVotes / props.totalVotes) * 100)}%`}/>
                            <Card.Text className = 'text-center'>
                                {`${(props.optionOneVotes)} out of ${props.totalVotes} votes`}
                            </Card.Text>
                        </Card.Body>
                        </Card>

                        <Card className ="mt-3" border="secondary" style={{ width: '100%', backgroundColor: props.userAnswer === 'optionTwo' ? '#00CED1' : '' }}>
                        <Card.Body>
                            <Card.Text>
                                {`Would you rather ${props.question.optionTwo.text}?`}
                            </Card.Text>
                            {
                                props.userAnswer === 'optionTwo' ? 
                                (<Card.Subtitle className = "text-muted text-center">
                                Your Answer
                                </Card.Subtitle>) : ''
                            }
                            <ProgressBar animated now={Math.round((props.optionTwoVotes / props.totalVotes) * 100)} 
                            label={`${Math.round((props.optionTwoVotes / props.totalVotes) * 100)}%`}/>
                            <Card.Text className = 'text-center'>
                                {`${(props.optionTwoVotes)} out of ${props.totalVotes} votes`}
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Container>
                ) : (
                    <Container className = 'text-left'>
                    <Card.Title>Would You Rather ...</Card.Title>
                    <Form >
                        <div className="mb-3">
                          <Form.Check 
                            label={props.question.optionOne.text}
                            name="optionOne"
                            type='radio'
                            id="optionOne"
                            value = {props.question.optionOne.text}
                            onClick = {()=>{
                                setQid(props.question.id)
                                setAnswer('optionOne')
                            }}
                          />
    
                          <Form.Check
                            label={props.question.optionTwo.text}
                            name="optionTwo"
                            type='radio'
                            id="optionOne"
                            value = {props.question.optionTwo.text}
                            onClick = {()=>{
                                setQid(props.question.id)
                                setAnswer('optionTwo')
                            }}
                          />
                        </div>
                    </Form>
                    <Button className = 'mt-3 w-100' variant="success" onClick = {handleSubmit}>  
                        Submit
                    </Button>
                    </Container>
                )) : ( props.children )
            }
        </Card.Body>
        </Card>
    )
}


function mapStateToProps ({ users, authedUser }, { question }) {
    let didAnswer = false;
    if (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) {
        didAnswer = true;
    }
    
    return {
      user: users[question.author],
      userAnswer: users[question.author].answers[question.id],
      question,
      didAnswer,
      totalVotes: question.optionOne.votes.length + question.optionTwo.votes.length,
      optionOneVotes: (question.optionOne.votes.length),
      optionTwoVotes: (question.optionTwo.votes.length)
    }
  }

export default connect(mapStateToProps)(CardTemplate)
