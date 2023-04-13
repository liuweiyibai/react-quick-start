import React ,{Component} from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { AuthorizedRoute } from '@/components/AuthorizedRoute/AuthorizedRoute';

import RouterLists from '@/routers/routerList';
// export default class ContentView extends Component{
//   render(){
//     <Switch>
//       <Route></Route>
//     </Switch>
//   }
// }


export default ()=>{
  // const doms = RouterLists.map(t=>{
  //   return <AuthorizedRoute></AuthorizedRoute>
  // })
  return (
    <Switch>
      {/* 公共界面 */}
      <Route></Route>
       {RouterLists.map((item, key) => {
         {/* 如果有重置，比如某个页面重定向到 / */}
        if (item.redirect)
          return <Redirect from={item.path} to={item.to} key={key} />;
        return <Route path={item.path} component={item.component} key={key} />;
      })}
    </Switch>
  )
}
