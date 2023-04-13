import React,{Component} from 'react';
import SpinWrapper from '../SpinWrapper/SpinWrapper'
import Routes from '@/routers'
// export default class App extends Component{
//   render(){
//     return (
//       <div>f890809</div>
//     )
//   }
// }


const App = ()=>(
  <SpinWrapper views={Routes}></SpinWrapper>
)

export default App