import React from 'react'

export default class JiugonggeItem extends React.Component {
    // constructor(props) {
    //     super(props)

    // }
    render() {
        const {title, img,active,handleRun} = this.props;
        return (
            <div className={`jiugongge-item ${active ? 'jiugongge-item-active': ''}`} style={{backgroundImage:`url(${img})`,backgroundSize: 'contain' }} onClick={handleRun}>
            {title}
            </div>
            )
    }
}