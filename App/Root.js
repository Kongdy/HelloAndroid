

/**
 主模块跟跳转
 @author kongdy
**/

'use strict'; // 启用严格模式
import React,{Component} from 'react';
import {Provider} from 'react-redux';
import {
} from 'react-native';

import configureStore from './store/MyStore'
import MyApp from './MyApp'

const store = configureStore();

class Root extends Component {
  render(){
    return(
    <Provider store={store}>
      <MyApp/>
    </Provider>
  );
  };
}
export default Root;
