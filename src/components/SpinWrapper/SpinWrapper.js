import React from 'react';
import {Spin} from 'antd';

// 这里全局控制spin的状态，使用redux来全局控制其状态
export default class SpinWrapper extends React.PureComponent{
  
  render(){
    const Views = this.props.views;
    const start = true;
    return (
      <Spin size="large" spinning={start}>
        <Views></Views>
      </Spin>
    )
  }
}