

/**
 app 首页
**/

import React,{Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  ToastAndroid,
} from 'react-native';

import {NaviGoBack} from '../utils/CommonUtils'

class AppMain extends Component {
  constructor(props){
      super(props);
      this.goBack = this.goBack.bind(this);
  }

/**
 返回
**/
  goBack() {
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  render(){
      return(
        <View style={{flex:1,backgroundColor:'purple'}}>
            <Text style={{alignSelf:'center',justifyContent:'center',fontSize:20,textAlign:'center'}}>
                welcome to react native!
            </Text>
        </View>
      );
  }
}
export default AppMain;
