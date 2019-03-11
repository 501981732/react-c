import React from 'react';

export default class listItem extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <li>{this.props.value}</li>
        );
    }
}