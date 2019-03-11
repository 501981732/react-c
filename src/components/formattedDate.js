import React from 'react'

export default class FormattedDate extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }

    render() {
        return (
            <div>{this.props.date.toLocaleTimeString()}</div>
            )
    }
}
