import React, { Components } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

import index from '@/pages/index'
import about from '@/pages/about'

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends Components {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/' exact component = {index} />
                    <Route path='/about' exact component = {about} />
                    <Redirect to='/' />
                </Switch>
            </HashRouter>
        )
    }
}