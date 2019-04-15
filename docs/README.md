## react-transition-group路由转场动画
## react-router-dom

## react-hot-loader 实现局部热更新

## alias 别名 @ 

## slot插槽实现  react本身就可以传递组件

## import代码分割 

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```


```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

```js
// 路由懒加载
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

// https://github.com/ReactTraining/react-router/issues/6420

const Home = lazy(() => import('./routes/Home'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={props => <About {...props} />}/>
      </Switch>
    </Suspense>
  </Router>
);
```

### Suspense loading，  vue实现的话需要利用vue-router的 hooks