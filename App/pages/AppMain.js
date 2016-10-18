

/**
 app 首页
**/

import React,{Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  ToastAndroid,
  DrawerLayoutAndroid,
  DrawerConsts,
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
    var drawerView = (
      <View style={{flex:1,backgroundColor:'purple'}}>
        <Text style={{fontSize:20,color:'white',textAlign:'center'}}>
          this is a drawer view text!!
        </Text>
      </View>
    );

      return(
        <DrawerLayoutAndroid
          drawerWidth={300}
         drawerPosition={DrawerLayoutAndroid.positions.Right}
         renderNavigationView={() => drawerView}
         >
          <View style={{flex:1,backgroundColor:'purple'}}>
              <Text style={{alignSelf:'center',justifyContent:'center',fontSize:20,textAlign:'center'}}>
                  welcome to react native!
              </Text>
          </View>
          </DrawerLayoutAndroid>
      );
  }
}
export default AppMain;
