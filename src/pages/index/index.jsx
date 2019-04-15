import React, { Component } from 'react';
import logo from '@/logo.svg';
import './index.css'


// import Clock from '@/components/clock'
// import Toggle from '@/components/toggle'
// import List from '@/components/list'
// import NameForm from '@/components/nameForm'
// import BaseSelect from '@/components/BaseSelect'
// import Reservation from '@/components/Reservation'

import Jiugongge from '@/components/jiugongge/'
import Turntable from '@/components/turntable/'
import ScratchCard from '@/components/scratchCard/'
import SlotMachine from '@/components/slotMachine/'
import { Link } from 'react-router-dom'

const styles = {
    container: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
      padding: '0 20px',
      backgroundColor: '#F4C272'
    },
    titleText: {
      paddingTop: 20,
      textAlign: 'center'
    },
    btnGroup: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20
    }
  }
class App extends Component {
    constructor() {
        super()
        this.state = {
            numbers: [1, 2, 3, 4, 5, 6, 7],
            showScratchCard: true,
            ScratchCard: null,
        }
        this.cardRef = React.createRef();
    }
    componentDidMount() {
        console.log(this.props.history)

    }
    static defaultProps = {
        jiugonggeConfig: {
            list: [{
                img: require('@/assets/img/1.jpg'),
                title: '1',
            }, {
                img: require('@/assets/img/2.jpg'),
                title: '2',
            }, {
                img: require('@/assets/img/3.jpg'),
                title: '3'
            }, {
                img: require('@/assets/img/4.jpg'),
                title: '4'
            }, {
                img: require('@/assets/img/5.jpg'),
                title: '开始'
            }, {
                img: require('@/assets/img/6.jpg'),
                title: '6'
            }, {
                img: require('@/assets/img/7.jpg'),
                title: '7'
            }, {
                img: require('@/assets/img/8.jpg'),
                title: '8'
            }, {
                img: require('@/assets/img/9.jpg'),
                title: '9'
            }],
        },
        cardConfig: {
            width: 200,
            height: 100,
            color: '#d1d1d1',
            radius: 20
        },
        // 老虎机配置参数
        slotMachineConfig: {
            col: 4, //列数
            awardNumber: 10, //奖品数量
            maxTurn: 10, //一共几转
            // resultArr: [4, 5, 6,6], //结果 需异步返回
            duration: 8, // 持续时间
            delay: .2, //每个的延迟时间
            unitHeight: 87.5,
        },
        // 转盘配置参数
        turnConfig: {
            total: 8, //一共奖品数量
            // awardid: 3, //需异步返回中奖编号
            maxTurn: 8, //转的圈数
            duration: 5 //持续时间
        }
    }
    handleSuccess(ID) {
        alert(`恭喜获奖${ID}`)
    }
    // 九宫格
    requestJiuID() {
        return new Promise((reslove, reject) => {
            setTimeout(function () {
                // reslove({
                //     code: 1,
                //     data: {
                //         id: 4
                //     }
                // })
                reslove({
                    awardID: 5,
                    error: false
                })
            }, 300)
        })
    }
    // 转盘
    requestTurnID() {
        return new Promise((reslove, reject) => {
            setTimeout(function () {
                reslove({
                    awardID: 3,
                    error: false
                })
            }, 300)
        })
    }
    // 刮一刮请求接口
    requestScratchCard() {
        setTimeout(() => {
            this.setState({
                showScratchCard: false,
                ScratchCard: '1000000万！'
            })
        }, 100)
    }

    // 老虎机
    requestSlotID() {
        return new Promise((reslove, reject) => {
            setTimeout(function () {
                reslove({
                    resultArr: [2, 4, 7, 9],
                    error: false
                })
            }, 300)
        })
    }
    handleCardSuccess() {
        alert('刮奖成功')
    }

    // onRef = (ref) => {
    //     this.child = ref
    // }
    // 重新开始
    resetCard() {
        setTimeout(() => {
            this.setState({
                ScratchCard: '9999999万！'
            })
            // this.child.init()
            this.cardRef.current.init()
        }, 500)
    }
    goToPage(pathname) {
        this.props.history.push({pathname});
    }
    goToAboutPage = () => {
        this.goToPage('/about');
      }
    
    goToListPage = () => {
        this.goToPage('/list');
    }
    render() {
        return (
            <div style={styles.container}>
                <div className="App">
                    <div className='app-router'>
                        {/* <Link to='/'>index</Link> */}
                        {/* <Link to='/about'>关于</Link> */}
                        <div onClick={this.goToAboutPage}>about</div>
                        <div onClick={this.goToListPage}>list</div>
                    </div>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" width='200px' />
                    </header>


                    {/*<Clock increment={10}/>*/}

                    {/*<Toggle></Toggle>*/}

                    {/*<h3>表单相关</h3>*/}
                    {/*<List numbers = {this.state.numbers}></List>*/}
                    {/*<NameForm></NameForm>*/}
                    {/*<BaseSelect></BaseSelect>*/}
                    {/*<Reservation></Reservation>*/}

                    <h2 className='title'>九宫格</h2>
                    <Jiugongge
                        config={this.props.jiugonggeConfig}
                        handleSuccess={this.handleSuccess}
                        requestID={this.requestJiuID}
                    >
                    </Jiugongge>

                    <h2 className='title'>转盘抽奖</h2>

                    {/*config数据是异步获取的 不能直接传props*/}
                    {/*<Turntable config={this.state.turnConfig}></Turntable>*/}
                    <Turntable
                        config={this.turnConfig}
                        requestID={this.requestTurnID}
                        handleSuccess={this.handleSuccess}
                    >
                    </Turntable>

                    <h2 className='title'>刮刮乐</h2>

                    {/*刮一刮*/}
                    {/*只把刮一刮的操作封装到组件里面，重新渲染canvas需要调子组件init时间，并不用传参数 指定 ref={this.cardRef} */}
                    {/*需要传递config配置 以及刮开之后success操作，*/}
                    <ScratchCard
                        config={this.props.cardConfig}
                        handleSuccess={this.handleCardSuccess}
                        ref={this.cardRef}
                    >
                        <div className='card-container'>{this.state.ScratchCard}</div>
                        {this.state.showScratchCard && <div className='card-mask' onClick={this.requestScratchCard.bind(this)}>
                            <div className='card-mask-btn'>点我</div>
                        </div>}
                    </ScratchCard>

                    {/*父组件调用子组件事件*/}
                    <div onClick={this.resetCard.bind(this)}>
                        重新开始
                    </div>

                    <h2 className='title'>老虎机</h2>

                    {/*老虎机*/}
                    <SlotMachine
                        config={this.props.slotMachineConfig}
                        handleSuccess={this.handleSuccess}
                        requestID={this.requestSlotID}
                    >
                        <img src={require('./../../assets/img/num.png')} alt='' />
                    </SlotMachine>


                </div>
            </div>
        );
    }
}

export default App;