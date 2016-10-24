

/**
 app主模块
**/

'use strict'; // 启用严格模式
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
  TouchableOpacity,
  Image,
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
      navigator={navigator} route={route} name='Home' />
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
                  LeftButton:(route,navigator,index,navState) => {
                    return (  navigator.getCurrentRoutes().length > 1?<View style={styles.navContaier}>
                      <TouchableOpacity  onPress={() => this.goBack()}>
                        <Text style={styles.navigatorText}>Back</Text>
                      </TouchableOpacity>
                      </View>:
                      <View style={styles.navContaier}>
                        <Image style={styles.logoStyle} source={require('../img/header_logo.png')}/>
                    </View>);
                  },
                  RightButton:(route,navigator,index,navState) =>{
                    return (<View style={styles.navContaier}>
                      <TouchableOpacity>
                      <Text style={styles.navigatorText}>Done</Text>
                      </TouchableOpacity>
                    </View>);
                  },
                  Title:(route,navigato,index,navState) => {
                    return (<View style={styles.navContaier}>
                        <Text style={styles.titleText}>{route.name}</Text>
                        </View>
                    );
                  },
                }}
                style={styles.navContaier}
                />
              }
              />
          </View>
      );
  }
};

const styles = StyleSheet.create({
  navigator:{
    flex:1,
  },
  navContaier:{
    backgroundColor:'purple',
    paddingTop:12,
    paddingBottom:10,
  },
  navigatorText:{
    textAlign:'center',
    fontSize:18 ,
    alignItems:'center',
    justifyContent:'center'
  },
  titleText:{
    fontSize: 18,
   color: '#fff',
   textAlign: 'center',
   alignItems: 'center',
   justifyContent: 'center',
   fontWeight: 'bold',
   flex: 1
  },
  logoStyle:{
    height:35,
    width:40,
  },
});

export default MyApp;
