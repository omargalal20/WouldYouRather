import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom'

import { useState } from 'react'

import { connect } from 'react-redux'
import { setAuthedUser } from '../../actions/AuthedUsers'

const SignInForm = props => {
    const [user, setUser] = useState('');
    console.log(props)
    const handleChange = (e) => {
        const text = e.target.value
        setUser(text);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.dispatch(setAuthedUser(user));

        props.location.pathname === '/signin' 
        ? props.history.push('/poll') 
        : props.history.push(props.location.path)
    }

    return  (
        <Container>
        <Card className ="text-center m-auto mt-5" style={{ width: '40vw' }}>
        <Card.Header>Welcome to the Would You Rather App!</Card.Header>
        <Card.Body>  
            <Card.Title>Sign In</Card.Title>
            <Form.Select aria-label="Default select example" size="lg" onChange = {handleChange}>
                <option value = ''>Select User</option>
                {
                Object.keys(props.users).map((item) => (
                <option value={item} key = {item}>{item}</option>
                ))
                }
            </Form.Select>
         
            <Button className = 'mt-3 w-100' variant="success" onClick = {handleSubmit} 
            disabled={user === ''}>      
                Sign In
            </Button>

        </Card.Body>
        </Card>
        </Container>
    )
}

function mapStateToProps ({ users }) {
    return {
      users: users
    }
  }

export default withRouter(connect(mapStateToProps)(SignInForm))