/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ToastAndroid
} from 'react-native';

class HelloAndroid extends Component {
  /**
  如果是集成Component写法，里面方法不用谢function关键字，
  另外一种 React.createClass({}); 需要写function
  **/
  clickMenuListener(eventname) {
      ToastAndroid.show('点击了按钮', ToastAndroid.SHORT);
  }
  render() {
    return (
      /** 额外一种点击事件写法
      onPress={() => ToastAndroid.show('文本被点击了', ToastAndroid.SHORT)}
      **/
      <View style={styles.container}>
          <TouchableHighlight  style={{flex:1,backgroundColor:'purple'}} onPress={this.clickMenuListener.bind(this)} underlayColor={'blue'}
          activeOpacity={0.5}>
            <Text style={styles.customText}>
              点击按钮
            </Text>
          </TouchableHighlight>
      </View>
    );
  };

};
// function clickMenuListener(eventname) {
//     ToastAndroid.show('点击了按钮', ToastAndroid.SHORT);
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  /**
  alignSelf的对齐方式主要有四种：flex-start、 flex-end、 center、  auto、 stretch。
  **/
  customText:{
    textAlign:"center",
    color:'#FFFFFF',
    fontSize:50,
    fontWeight:'900',
  },
  btn:{
    position:'relative',
    flex:1,
    borderRadius:20,
    alignItems:'center',
    borderColor:'blue',
    borderWidth:5,
    justifyContent:'center',
    backgroundColor:"purple",
    borderRadius:10,
    alignSelf:'center',
  },
});

AppRegistry.registerComponent('HelloAndroid', () => HelloAndroid);
