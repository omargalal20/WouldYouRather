import React from "react";
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Card className = "m-auto mt-5 text-center" style={{ width: '50vw' }}>
      <Card.Header>
        Not Found
      </Card.Header>
      <Card.Body>
        <NavLink to="/">
        <Button variant="info">Take Me Home</Button>
        </NavLink>
      </Card.Body>
    </Card>
  );
}

export default NotFound
