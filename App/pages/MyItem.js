
/**
 * @author kongdy
 * item的详情页
 */

'use strict';
import React,{Component} from 'react';
import {
View,
StyleSheet,
ToastAndroid,
InteractionManager,
} from 'react-native';

import MyCircleView from '../view/MyCircleView';
import MyWaveView from '../view/MyWaveView';
/**
 * 引入滚动
 * tabView
 */
import ScrollableTabView,{DefaultTabBar} from 'react-native-scrollable-tab-view';

const progressValue = 75;

class MyItem extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        percent:0,
      }
    }

/**
 * 生命周期，控件初始化完毕之后
 */
    componentDidMount(){

      /**
       * 在页面切换完成之后再加载动画
       */
      const{navigator} = this.props;
      this._listeners = [
          navigator.navigationContext.addListener('didfocus',()=>this.startProgressAnima()),
      ];

      // navigator.onDidFocus(
      //     () => {
      //       self.startProgressAnima();
      //     }
      // );
      // InteractionManager.runAfterInteractions(
      //   ()=>{
      //       self.startProgressAnima();
      //   }
      // );
    }

/**
 * 生命周期，控件更新完成之后
 */
    componentDidUpdate() {
      if(this.state.percent >= progressValue){
        clearInterval(this.intval);
      }
    }

/**
 * 生命周期，控件即将从界面移除
 */
    componentWillUnmount(){
      /**
       * 移除所有计时器
       */
      this.intval && clearInterval(this.intval);
      /**
       * 移除所有监听
       */
      this._listeners && this._listeners.forEach(listener=>listener.remove());
    }

    startProgressAnima() {
      let self = this;
      this.intval = setInterval(
        ()=>{
          let s =  this.state.percent%100;
          s += 1;
          self.setState({
            percent:s,
          })
        },
        1000/60
      );
    }

    onMyCirclePress(){
      this.state = {
        percent:0,
      }
      clearInterval(this.intval);
      this.startProgressAnima();
    }

    render(){
      return(<ScrollableTabView
        style={styles.containerlayout}
        renderTabBar={() => <DefaultTabBar/>}
        tabBarUnderlineColor='purple'
        tabBarActiveTextColor='purple'
        tabBarBackgroundColor='white'
        tabBarInactiveTextColor='black'
        tabBarTextStyle={{fontSize:17}}>

        <View style={[styles.circleFatherStyle,{
        }]}
         tabLabel="MyProgressView">
          <MyCircleView
            radius={100}
            bgColor={'white'}
            percent={this.state.percent}
            borderWidth={20}
            onPress={()=>this.onMyCirclePress()}
          />
          </View>
          <View style={[styles.circleFatherStyle,{
          }]}
          tabLabel="otherCustomeView">
            <MyWaveView
            />
          </View>
      </ScrollableTabView>);
    }
}

const styles = StyleSheet.create({
  containerlayout:{
    flex:1,
    backgroundColor:'white',
    marginTop:55,
  },
  circleFatherStyle:{
    marginTop:20,
    alignItems:'center',
  }
})

export default MyItem;
