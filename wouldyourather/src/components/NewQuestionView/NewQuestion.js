import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { handleAddQuestion } from '../../actions/Questions'

import { connect } from 'react-redux'
import { useState } from 'react'
import { withRouter } from 'react-router-dom'

const NewQuestion = props => {

    const [optionOne, setOptionOne] = useState('')
    const [optionTwo, setOptionTwo] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()
      props.dispatch(handleAddQuestion(optionOne,optionTwo))
      props.history.push('/poll')
    }

    return (
      <>
        <Card className ="m-auto mt-3" style={{ width: '50vw' }}>
        <Card.Header as="h5" className = "text-center">Create New Question</Card.Header>
        <Card.Body>
          <Card.Title>Would You Rather ...</Card.Title>
          <Form noValidate onSubmit = {handleSubmit}>
                  <Form.Group md="4" controlId="validationFormik01" className = "m-auto">
                    <Form.Label>Option One: </Form.Label>
                    <Form.Control
                      type="text"
                      name="optionOne"
                      className = "w-100"
                      placeholder = "Enter Option One Here"
                      onChange = {(e) => {
                        setOptionOne(e.target.value)
                      }}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Card.Title className = 'text-center mt-2 mb-2'>OR</Card.Title>
                  <Form.Group md="4" controlId="validationFormik02" className = "m-auto">
                    <Form.Label>Option Two: </Form.Label>
                    <Form.Control
                      type="text"
                      name="optionOne"
                      className = "w-100"
                      placeholder = "Enter Option Two Here"
                      onChange = {(e) => {
                        setOptionTwo(e.target.value)
                      }}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="success"
                  className = "m-auto w-100 mt-3" 
                  disabled = {optionOne === '' || optionTwo === ''}
                  onClick = {handleSubmit} 
                  >Submit</Button>
          </Form>
        </Card.Body>
      </Card>
      </>
    )
}

export default withRouter(connect()(NewQuestion))