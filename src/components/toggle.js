import React from 'react';

export default class Toggle extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                isToggleOn: true
            }
            // this.handleClick = this.handleClick.bind(this)
        }
        // handleClick() {
        //     this.setState((prevState, props) => ({
        //         isToggleOn: !prevState.isToggleOn
        //     }))
        // }
        // 绑定this
        handleClick = (arg,e)=>{
            // 时间对象额要放到后面
            console.log(arg)
            this.setState((prevState, props) => ({
                isToggleOn: !prevState.isToggleOn
            }))
        }

        render() {
            return (
                <button onClick={this.handleClick.bind(this,'hello')}>
                    {this.state.isToggleOn ? 'ON' : 'OFF'}
                </button>
            );

        }
    }