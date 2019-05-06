import React, { Component } from 'react';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { name, index } = this.props;
        return (
            <li>
                ({ index }). {name}
            </li>
        );
    }
}

export default Book;
