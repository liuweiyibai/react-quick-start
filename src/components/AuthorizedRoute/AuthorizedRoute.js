import React ,{Component} from 'react';

import RouterLists from '@/routers/routerList'
export default class AuthorizedRoute extends Component{
    render (){
      const views = RouterLists.map(t=>{
        return t.component
      })
      
    }
} 