
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
} from 'react-native';

import MyCircleView from '../view/MyCircleView';
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
      this.startProgressAnima();
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
      this.intval && clearInterval(this.intval);
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
      ToastAndroid.show('click',ToastAndroid.SHORT);
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
          <View tabLabel="otherCustomeView">
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
});

export default MyItem;
