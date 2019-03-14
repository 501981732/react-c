import React from 'react';
import wheelImg from '@/assets/img/game-wheel.png'
import arrowImg from '@/assets/img/game-arrow.png'
import utils from '@/utils/'
import './index.css'
export default class Turntable extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            isRunning: false
        }
        let config = {
            total: 8, //一共奖品数量
            // awardID: 3, //需异步返回
            maxTurn: 8, //转的圈数
            duration: 5 //持续时间
        }
        this.config = Object.assign(config,this.props.config)
    }
    componentDidMount() {

        // 动画执行完
        const current = this.myRef.current
        current.addEventListener(utils.transitionEvent, () => {
            setTimeout(()=>{
                this.setState({
                    isRunning: false
                })
                this.props.handleSuccess(this.awardID)
            },500)
        });
    }
    async handleTurn() {
        if (this.state.isRunning) return
        this.init()
        this.setState({
            isRunning: true
        })
        const {awardID,error} = await this.props.requestID()
        if (error) {
            this.setState({
                isRunning: false
            })
            return
        }
        this.awardID = awardID
        const {total, maxTurn, duration} = this.config
        const unitDeg = 360 / total;
        const deg = maxTurn * 360 + (awardID - 0.5) * unitDeg
        const current = this.myRef.current
        current.style.transform = `rotateZ(${deg}deg)`
        current.style.transition = `transform ${duration}s cubic-bezier(0.42,0,0.58,1)`

    }
    init () {
        this.myRef.current.style.transform = `rotateZ(0deg)`
        this.myRef.current.style.transition = `none`;
    }
    render() {
        return (
            <div className='turntable-container'>
                <div className='turntable-box' ref={this.myRef}>
                    <img src={wheelImg} alt='wheel' />
                </div>
                <div className='turntable-btn'>
                    <img src={arrowImg} alt='arrow' onClick={this.handleTurn.bind(this)}></img>
                </div>
            </div>
            )
    }
}