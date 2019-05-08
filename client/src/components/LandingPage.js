import React from 'react';
import { Button } from 'react-bootstrap';

const LandingPage = props => {
    return (
        <div>
            <h3>Welcome to Book and Author Library</h3>
            <Button variant='primary' onClick={() => props.history.push('/books')}>Book List</Button>
        </div>
    );
}

export default LandingPage;
