import React from 'react'
import './index.css'
export default class ScratchCard extends React.Component {
    constructor(props) {
        super(props)
        let config = {
            width: 200,
            height: 100,
            color: '#d1d1d1',
            radius: 20,
        }
        this.config = Object.assign(config,this.props.config)
    }
    componentWillMount() {

    }
    componentDidMount() {

        // this.props.onRef(this)
        const canvas = document.getElementById('mask')
        const context = canvas.getContext('2d')
        const operationByMyself = true
        // this.init(context)
        this.init(operationByMyself)
        canvas.addEventListener('touchmove', this.handleTouchMove.bind(this, { canvas, context}), { passive: false })
    }
    // 父组件调用则重新绘制canvas
    init(flag) {
        const canvas = document.getElementById('mask')
        const context = canvas.getContext('2d')
        context.fillStyle = this.config.color //填充
        context.fillRect(0, 0, this.config.width, this.config.height)
        if (flag) {
            // 组件自己行为
            context.globalCompositeOperation = 'destination-out' //使得在已经填充颜色的基础上再次进行绘制时，所绘制的区域变得透明，
        } else {
            context.globalCompositeOperation = 'destination-over'
            context.fillStyle = this.config.color //填充
            context.fillRect(0, 0, this.config.width, this.config.height)
            // setTimeout(function() {
                context.globalCompositeOperation = 'destination-out'
            // },0)
        }
    }

    handleTouchMove() {
        const [{ canvas, context }, e] = arguments
        const { top, left } = canvas.getBoundingClientRect()
        const { pageXOffset, pageYOffset } = window
        // chrome 监听touch类事件报错：无法被动侦听事件preventDefault use {passive: false }
        e.preventDefault()
        const touch = e.touches[0] //会去到第一个点
        context.beginPath() //开始绘制
        context.arc(touch.pageX - left - pageXOffset, touch.pageY - top - pageYOffset, this.config.radius, 0, Math.PI * 2);
        context.closePath()
        context.fillStyle = '#520'
        context.fill(); //填充颜色
        this.calcArea(context); //计算刮奖面积
    }
    calcArea(context) {
        let imgData = context.getImageData(0, 0, this.config.width, this.config.height) //获取画布所有像素 该对象为画布上指定的矩形复制像素数据
        let pixelsArr = imgData.data; //得到像素的字节数据
        let loop = pixelsArr.length; //获取该数据的长度
        let transparent = 0; //设置一个变量来记录已经变为透明的像素点的数量
        for (let i = 0; i < loop; i += 4) { //循环遍历每一个像素
            let alpha = pixelsArr[i + 3]; //获取每个像素的透明度数值
            if (alpha < 10) { //当透明度小于10时，认为它已经被擦除
                transparent++; //使transparent数值加1
            }
        }
        let percentage = transparent / (loop / 4); //计算透明像素在所有像素点中所占比例
        if (percentage >= .8) {
            context.fillStyle = '#520' //填充
            context.fillRect(0, 0, this.config.width, this.config.height) //全部刮开
            this.props.handleSuccess()
            return
        }
    }
    render() {
        return (
            <div className="scratch-container" >
                {this.props.children}
                <canvas id='mask' width={this.config.width} height={this.config.height}></canvas>
            </div>
        )
    }
}