import React, { Component } from 'react';
import { get as _get } from 'lodash';

class MySearchBar extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        const { onSearch } = this.props;
        onSearch(value);
    }

    render() {
        return (
            <div className='flex-row form-group'>
                <input
                    className="form-control mr-2"
                    type="text"
                    placeholder='Search'
                    onChange={e => this.handleChange(e.target.value)}
                />
            </div>
        );
    }
}

export default MySearchBar;

