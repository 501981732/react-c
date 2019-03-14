import React, { Component, Suspense, lazy } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

import Index from '@/pages/index'
// import About from '@/pages/about/about'

// https://github.com/ReactTraining/react-router/issues/6420

const About = lazy(() => import('@/pages/about/about'))

export default class RouteConfig extends Component {
    render() {
        return (
            <HashRouter>
                <Suspense fallback ={<div>loading...</div>}>
                    <Switch>
                        <Route path='/' exact component = {Index} />
                        <Route path='/about' component={props => <About {...props} />} />
                        <Redirect to='/' />
                    </Switch>
                </Suspense>
            </HashRouter>
        )
    }
}