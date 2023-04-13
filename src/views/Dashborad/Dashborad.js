import React ,{Component}from 'react';

import ContentView from '@/components/ContentView/ContentView'

export default class Dashborad extends Component{
  state={
    token:'istoken',
    userInfo:{

    }
  }
  componentDidMount(){
    // 在这里 
    this.initApp();
  }
  componentWillUpdate(){
    // 主要的权限控制在该组件中完成
  }

  initApp = async ()=>{
    // 在这里获取用户信息
    // 获取完用户信息后，根据不同的用户 更改不同的 render 内部的内容

  }

  render(){
    const token = this.state.token;
    // 也可以判断redux中是否存在用户信息，如果用户是user_1 就返回user1 的视图 ，以此类推
    // 如果 redux 中不存在信息，就去获取userInfo
    const renderViews = !!token ? '某个界面' : "另一个界面";
    const renderViews1 = {
      user1: "user1视图",
      user2: "user2视图"
    }
    
    return (
      // 这里可以渲染 头部 侧边栏 ，主要部分是 页面content 即 ContentView,
      // ContentView 可能包括需要权限访问的页面 或者是通用的页面
      // 可以在本组件的生命周期中通过不同的userInfo来渲染不同的 ContentView
      // AuthorizedRoute 是遍历routerlist 返回 多个Route 组件，所以最外面使用 Switch 组件包含
      <div>Dashborad</div>
    )
  }
}