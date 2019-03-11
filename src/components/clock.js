import React from 'react'
import FormattedDate from './formattedDate.js'
class Clock extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            counter: 1000
        }
    }
    componentDidMount() {
        this.timerID = setInterval(_=>this.tick(),1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID) 
    }

    render() {
        return (
            <div>
                <h1>hello clock</h1>
                <FormattedDate date={this.state.date}></FormattedDate>
                <p>{this.state.counter}</p>
            </div>
            )
    }

    tick() {
        this.setState({
            date: new Date()
        })
        // this.props 和this.state可能是异步更新的，不应该依靠他们得知计算下一个
        // 
        // this.setState({
        //   counter: this.state.counter + this.props.increment,
        // });
        this.setState((prevState, props) => ({
            counter: prevState.counter + props.increment
        }));
    } 
}


export default Clock