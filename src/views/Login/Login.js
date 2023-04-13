import React,{Component} from 'react';


export default class Login extends Component{
  componentWillMount(){
    console.log('进入该页面检查是否存在已登录信息，如果存在，就直接定位到 / ,否则继续渲染')
  }
  render(){
    return (
      <h1>登录页面</h1>
    )
  }
}