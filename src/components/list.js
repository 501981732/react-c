import React from 'react';
import ListItem from './listItem.js'

export default class List extends React.Component {

    // constructor(props) {
    //     super(props);

    // }
    componentDidMount() {
        console.log(this.props.numbers)
    }
    render() {
        return (
            <ul>
                {this.props.numbers.map(num =>
                    <ListItem value={num} key={num}></ListItem>
                )}
            </ul>
        );
    }
}
