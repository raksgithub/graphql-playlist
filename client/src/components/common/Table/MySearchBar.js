import React, { Component } from 'react';

class MySearchBar extends Component {
    constructor(props){
        super(props);
        this.term = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { onSearch } = this.props;
        onSearch(this.term);
    }

    render() {
        return (
            <div className='flex-row form-group'>
                <input
                    className="form-control mr-2"
                    ref={ n => this.term = n }
                    type="text"
                    placeholder='Search'
                />
                <button 
                    className="btn btn-secondary" 
                    onClick={ this.handleClick }
                >
                    Search
                </button>
            </div>
        );
    }
}

export default MySearchBar;

