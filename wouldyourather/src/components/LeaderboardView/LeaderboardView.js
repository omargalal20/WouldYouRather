import Card from 'react-bootstrap/Card'
import LeaderBoardCard from "./LeaderBoardCard"

import { connect } from 'react-redux'

const LeaderboardView = props => {
    return (
        <Card className ="m-auto mt-3" style={{ width: '50vw' }}>
        <Card.Header as="h5" className = "text-center">LeaderBoard</Card.Header>
        <Card.Body>
        {
            props.users.map(user => (
                <LeaderBoardCard key = {user} id = {user}/>
            ))
        }
        </Card.Body>
        </Card>
    )
}

function mapStateToProps ({ users }) {
    return {
      users: Object.keys(users)
      .sort((a,b) => (Object.keys(users[b].answers).length + users[b].questions.length) - 
      (Object.keys(users[a].answers).length + users[a].questions.length))
    }
}

export default connect(mapStateToProps)(LeaderboardView)