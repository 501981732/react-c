import React from 'react'
import Item from './Item.js'
import './index.css'
export default class Jiugongge extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeList: [0, 1, 2, 5, 8, 7, 6, 3], //中奖
            activeId: 0, //当前展示的激活ID
            isRuning: false,
            round: 2, //跑几圈
            t: 100, //初始速度 移动到下一个的时间

        }
        this.MID_ID = 4
    }
    async handleRun(index) {
        // 请求数据 以及接口处理交给父组件完成
        const {awardID,error} = await this.props.requestID() //请求接口返回ID
        //     ID = null //中奖ID
        // if (result.code === 1) {
        //     ID = result.data.id
        // } else {
        //     return
        // }
        if (error) {
            this.setState({
                isRunning: false
            })
            return
        }
        if (this.state.isRuning) return

        if (index === this.MID_ID) {
            this.init()
            let _this = this,
                t = _this.state.t,
                i = _this.state.activeId,
                length = _this.state.activeList.length,
                step = _this.state.round * length,
                timer = setTimeout(start.call(this), t);

            function start() {
                _this.setState({
                    activeId: _this.state.activeList[i % length]
                })
                i++;
                if (i < step - length) {
                    timer = setTimeout(start, t)
                } else if (i >= step - length && i < step + awardID) {
                    //倒数第二圈到最后
                    t += (i - (step - length)) * 10
                    timer = setTimeout(start, t)
                } else if (i === step + awardID) {
                    setTimeout(() =>
                        _this.handleSuccess(awardID), 500)
                    clearTimeout(timer);
                }
            }
        }
    }
    init() {
        this.setState({
            activeId: 0,
            isRuning: true
        })
    }
    handleSuccess(awardID) {
        this.setState({
            isRuning: false
        })
        this.props.handleSuccess(awardID)
    }
    render() {
        const {list} = this.props.config
        return (
            <div className='jiugongge-container'>
                {
                    list.map((item, index) => {
                        return <Item title={item.title} img={item.img} key={index} active={this.state.activeId===index} handleRun={this.handleRun.bind(this,index)}/>
                    })
                }
            </div>
        )
    }
}