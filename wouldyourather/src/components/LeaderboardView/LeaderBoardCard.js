import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'

import { connect } from 'react-redux'

const LeaderBoardCard = props => {
    return (
        <Card className ="m-auto mt-2 w-100" >
        <Card.Body className = 'd-flex'>
            <Container>
                <Image src={props.user.avatarURL} roundedCircle />
            </Container>
    
            <Container className = 'm-auto text-left'>
            <Card.Title>{props.user.name}</Card.Title>
            <Card.Text>
                    Answered Questions: {Object.keys(props.user.answers).length}
            </Card.Text>
            <Card.Text>
                    Unanswered Questions: {props.user.questions.length}
            </Card.Text>
            </Container>

            <Container className = 'text-left'>
            <Card className = 'm-auto text-center'>
                <Card.Header>
                    <Card.Title>Score</Card.Title>
                </Card.Header>
                <Card.Text>
                    {
                        (Object.keys(props.user.answers).length + props.user.questions.length)
                    }
                </Card.Text>
            </Card>
            </Container>
    
        </Card.Body>
        </Card>
    )
}

function mapStateToProps ({ users }, { id }) {
    return {
      user: users[id]
    }
}

export default connect(mapStateToProps)(LeaderBoardCard)