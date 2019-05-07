import React, { Component } from 'react';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { name, index, onBookClick } = this.props;
        return (
            <li onClick={onBookClick}>
                ({ index }). {name}
            </li>
        );
    }
}

export default Book;
