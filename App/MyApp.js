

/**
 app主模块
**/

import React,{Component} from 'react';

import {
  StyleSheet,
  View,
  Navigator,
} from 'react-native';

import Home from './pages/Home';
import {NaviGoBack} from './utils/CommonUtils';

var _navigator;

class MyApp extends React.Component {

  constructor(props){
      super(props);
      this.renderScene = this.renderScene.bind(this);
      this.goBack = this.goBack.bind(this);
    }

  configureScene(route,routeStack){
    return Navigator.SceneConfigs.PushFromRight;
  }

  goBack() {
    return NaviGoBack(_navigator);
  }

  renderScene(route,navigator) {
    let Component = route.component;
    _navigator = navigator;
    return(
      <Component
      navigator={navigator} route={route} />
    );
  }
  render() {
      return(
          /** 额外一种点击事件写法
          onPress={() => ToastAndroid.show('文本被点击了', ToastAndroid.SHORT)}
          **/
          <View style={{flex:1}}>
            <Navigator
              ref='navigator'
              style={styles.navigator}
              configureScene={this.configureScene}
              renderScene={this.renderScene}
              initialRoute={{
                component:Home,
                name:'Home',
              }}
              />
          </View>
      );
  }
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex:1,
    alignItems:'center',
    flexDirection:'row',
  },
  navigator:{
    backgroundColor: '#F5FCFF',
    flex:1,
    flexDirection:'row',
  }
});

export default MyApp;
