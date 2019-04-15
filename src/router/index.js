// import React, { Component, Suspense, lazy } from 'react';
// import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

// import Index from '@/pages/index'
// // import About from '@/pages/about/about'

// // https://github.com/ReactTraining/react-router/issues/6420

// const About = lazy(() => import('@/pages/about/about'))

// export default class RouteConfig extends Component {
//     render() {
//         return (
//             <HashRouter>
//                 <Suspense fallback ={<div>loading...</div>}>
//                     <Switch>
//                         <Route path='/' exact component = {Index} />
//                         <Route path='/about' component={props => <About {...props} />} />
//                         <Redirect to='/' />
//                     </Switch>
//                 </Suspense>
//             </HashRouter>
//         )
//     }
// }
import React, { Component, Suspense, lazy } from 'react';
import { HashRouter, Switch, Route, Redirect,withRouter,BrowserRouter } from 'react-router-dom'
import './index.css';
import {CSSTransition, TransitionGroup} from 'react-transition-group';


// https://github.com/ReactTraining/react-router/issues/6420

import Index from '@/pages/index'
import About from '@/pages/about/index'
import List from '@/pages/list/index'
import Detail from '@/pages/details/index'
// const Index = lazy(() => import( /* webpackPrefetch: true */ '@/pages/index/index.jsx'))
// const About = lazy(() => import( /* webpackPreload: true */ '@/pages/about/about.jsx'))



const RouterConfig = [{
    path: '/',
    component: Index,
}, {
    path: '/about',
    component: About,
    sceneConfig: {
      enter: 'from-bottom',
      exit: 'to-bottom'
    }
  },
  {
    path: '/list',
    component: List,
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right'
    }
  },{
    path: '/detail',
    component: Detail,
    sceneConfig: {
      enter: 'from-right',
      exit: 'to-right'
    }
  }]

const DEFAULT_SCENE_CONFIG = {
    enter: 'from-right',
    exit: 'to-exit'
};

const getSceneConfig = location => {
    const matchedRoute = RouterConfig.find(config => new RegExp(`^${config.path}$`).test(location.pathname));
    return (matchedRoute && matchedRoute.sceneConfig) || DEFAULT_SCENE_CONFIG;
};
let oldLocation = null;
const Routes = withRouter(({location, history}) => {
    // 转场动画应该都是采用当前页面的sceneConfig，所以：
    // push操作时，用新location匹配的路由sceneConfig
    // pop操作时，用旧location匹配的路由sceneConfig
    let classNames = '';
    if(history.action === 'PUSH') {
      classNames = 'forward-' + getSceneConfig(location).enter;
    } else if(history.action === 'POP' && oldLocation) {
      classNames = 'back-' + getSceneConfig(oldLocation).exit;
    }
  
    // 更新旧location
    oldLocation = location;
  
    return (
      <TransitionGroup
        className={'router-wrapper'}
        childFactory={child => React.cloneElement(child, {classNames})}
      >
        <CSSTransition timeout={500} key={location.pathname}>
          <Switch location={location}>
            {RouterConfig.map((config, index) => (
              <Route exact key={index} {...config}/>
            ))}
            <Redirect to='/' />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  });
export default class RouteConf extends React.PureComponent {
    render() {
        return (
            <BrowserRouter>
                {/* <Suspense fallback ={<div>loading...</div>}>
                    <Switch>
                        <Route path='/' exact component = {Index} />
                        <Route path='/about' component={props => <About {...props} />} />
                        <Redirect to='/' />
                    </Switch>
                </Suspense> */}
                <Routes />
            </BrowserRouter>
        )
    }
}