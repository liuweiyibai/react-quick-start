import React ,{Component}from 'react';


export default class Dashborad extends Component{
  state={
    userInfo:{

    }
  }
  componentDidMount(){
    // 在这里 
    this.initApp
  }
  componentWillUpdate(){
    // 主要的权限控制在该组件中完成
  }

  initApp = async ()=>{
    // 在这里获取用户信息
    // 获取完用户信息后，根据不同的用户 更改不同的 render 内部的内容

  }

  render(){
    return (
      <div>Dashborad</div>
    )
  }
}