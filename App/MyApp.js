

/**
 app主模块
**/

import React,{Component} from 'react';

import {
  StyleSheet,
  View,
  Navigator,
  StatusBar,
  BackAndroid,
  Platform,
  WebView,
  Text,
} from 'react-native';

import Home from './pages/Home';
import HeadView from './widgets/HeadView'
import {NaviGoBack} from './utils/CommonUtils';

/**
 状态栏高度
**/
export const STATUS_BAR_HEIGHT = (Platform.Os === 'ios'?20:25)

var _navigator;

class MyApp extends React.Component {

  constructor(props){
      super(props);
      this.renderScene = this.renderScene.bind(this);
      this.goBack = this.goBack.bind(this);
      BackAndroid.addEventListener('hardwareBackPress',this.goBack);
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
          <StatusBar
              barStyle='light-content'
              backgroundColor='purple'
              style={{height: 1}}
         />
            <Navigator
              ref='navigator'
              style={styles.navigator}
              configureScene={this.configureScene}
              renderScene={this.renderScene}
              initialRoute={{
                component:Home,
                name:'Home',
              }}
              navigationBar={
                <Navigator.NavigationBar
                routeMapper={{
                  LeftButton:(route,navigator) => {
                    return (<Text style={styles.navigatorText}>Cancel</Text>);
                  },
                  RightButton:(route,navigator) =>{
                    return (<Text style={styles.navigatorText}>Done</Text>);
                  },
                  Title:(route,navigator) => {
                    return (<Text style={styles.navigatorText}>name</Text>);
                  },
                }}
                style={{flexDirection:'row',flex:1,backgroundColor:'purple',borderWidth:1,justifyContent:'center',alignSelf:'center',alignItems:'center'}}
                />
              }
              />
          </View>
      );
  }
};

const styles = StyleSheet.create({
  navigator:{
    backgroundColor: '#F5FCFF',
    flex:1,
    flexDirection:'row',
  },
  navigatorText:{
    textAlign:'center',
    justifyContent:'center',
    fontSize:17,
  },
});

export default MyApp;
