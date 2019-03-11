import React, { Component } from 'react';
import logo from '@/logo.svg';
import Welcome from '@/components/welcome'
import Clock from '@/components/clock'
import Toggle from '@/components/toggle'
import List from '@/components/list'
import NameForm from '@/components/nameForm'
import BaseSelect from '@/components/BaseSelect'
import Reservation from '@/components/Reservation'

import Calculator from '@/components/Calculator'
import FilterableProductTable from '@/components/FilterableProductTable';


import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const element = <p className='hello'>你好</p>


class App extends Component {
  constructor() {
    super()
    this.state = {
        numbers: [1,2,3,4,5,6,7]
    }
  }

  render() {
    return (
      <div>
        <Router>
            <div>
                <ul>
                    <li><Link to='/'>首页</Link></li>
                    <li><Link to='/FilterableProductTable'>关于</Link></li>
                </ul>
                <hr/>
                <Route exact path="/" component={Calculator} />
                <Route path="/FilterableProductTable" component={FilterableProductTable} />
            </div>
        </Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        {element}

        <Welcome name='wm'></Welcome>
        <Welcome name='myy'></Welcome>

        <Clock increment={10}/>
        <Clock increment={20}/>
        <Toggle></Toggle>
        <List numbers = {this.state.numbers}></List>
        <NameForm></NameForm>
        <BaseSelect></BaseSelect>
        <Reservation></Reservation>
      </div>
      </div>
    );
  }
}

export default App;