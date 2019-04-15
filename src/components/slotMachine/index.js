import './index.css'
import React from 'react'
import utils from '@/utils/'
export default class SlotMachine extends React.Component {
    constructor(props) {
        super(props)
        // 默认配置
        let config = {
            col: 3,
            awardNumber: 10,
            maxTurn: 10,
            // resultArr: [4,5,6],
            duration: 8,
            delay: .5,
            // unitHeight: 87.5
        }
        this.config = Object.assign(config, this.props.config)
        this.state = {
            isRunning: false
        }
        console.log(this.props.children)
    }
    componentWillMount() {

    }
    static defaultProps = {
        // col: 5,
        // awardNumber: 10,
        // maxTurn: 10,
        // resultArr: [4,5,6],
        // duration: 8,
    }
    componentDidMount() {
        let Dom = document.querySelectorAll('.slotmachine-item .item-image-box')
        let lastDom = Dom[Dom.length - 1]
        lastDom.addEventListener(utils.transitionEvent, () => {
            setTimeout(() => {
                this.setState({
                    isRunning: false
                })
                this.props.handleSuccess()
            }, 300)
        });
        console.log(this.props.children)
        let itemHeight = Dom[0].firstChild.getBoundingClientRect().height //每个图片高度
        let unitHeight = this.config.unitHeight || itemHeight / this.config.awardNumber //每个图片每个奖品的高度
        // 根据图片自适应高度，调整单位高度
        !this.config.unitHeight && setTimeout(() => {document.body.style.setProperty('--itemHeight', unitHeight + 'px')},10)
    }
    async start(e) {
        if (this.state.isRunning) return
        this.init()
        this.setState({
            isRunning: true
        })
        let { resultArr,error } = await this.props.requestID()
        if (error) {
            this.setState({
                isRunning: false
            })
            return
        }
        let itemArr = document.querySelectorAll('.slotmachine-item .item-image-box')
        let itemHeight = itemArr[0].firstChild.getBoundingClientRect().height //每个图片高度
        let unitHeight = this.config.unitHeight || itemHeight / this.config.awardNumber //每个图片每个奖品的高度

        resultArr.forEach((item, index) => {
            itemArr[index].style.setProperty('--slotTranslateY', -(unitHeight * (item - 1) + itemHeight * (this.config.maxTurn - 1)) + 'px')
            itemArr[index].style.setProperty('--slotDuration', this.config.duration + 's')
            itemArr[index].style.setProperty('--slotDelay', index * this.config.delay + 's')
        })

    }
    init() {
        let itemArr = document.querySelectorAll('.slotmachine-item .item-image-box')
        itemArr.forEach((item,index) => {
            item.style.setProperty('--slotTranslateY', 0 + 'px')
            item.style.setProperty('--slotDuration', 0 + 's')
            item.style.setProperty('--slotDelay', 0 + 's')
        })
    }
    render() {
        let item = []

        for (let i = 0; i < this.config.col; i++) {
            item.push(<div className='slotmachine-item' key={i}><div className='item-image-box'>{new Array(this.config.maxTurn).fill(this.props.children)}</div></div>)
        }
        return (
            <div className='slotmachine-container'>
                <div className='slotmachine-box'>
                    {item}
                </div>
                <div className='slotmachine-btn' onClick={this.start.bind(this)}>开始</div>
            </div>
        )
    }
}