

/**
 * 自定义圆形进度条
 */
'use strict';

import React,{Component} from 'react';
import {
View,
StyleSheet,
Text,
PanResponder,
ToastAndroid,
} from 'react-native';

class MyCircleView extends React.Component {

  /**
   * 控件属性
   * @type {Object}
   */
    propTypes:{
      radius:React.Proptypes.number,
      bgColor:React.Proptypes.string,
      percent:React.Proptypes.number,
      borderWidth:React.Proptypes.number,
    }

  constructor(props){
    super(props);
    this.initProps(props);

    this.onStartShouldSetPanResponder = this.onStartShouldSetPanResponder.bind(this);
    this.onPanResponderEnd = this.onPanResponderEnd.bind(this);
  }

/**
 * 进度条更新
 */
  componentWillReceiveProps(nextProps){
    this.initProps(nextProps);
  }

  componentWillMount(evt,gestureState){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder:this.onStartShouldSetPanResponder,
      onPanResponderEnd:this.onPanResponderEnd,
    });
  }

  initProps(props) {
        let leftTransformDegree = '0deg';
        let rightTransformDegree = '0deg';
        let percent = this.props.percent;

        if(percent >= 50) {
          rightTransformDegree = '180deg';
          leftTransformDegree = (percent-49)*3.6+'deg';
        } else {
          rightTransformDegree = percent*3.6+'deg';
        }

        this.state={
          percent:props.percent,
          leftTransformDegree:leftTransformDegree,
          rightTransformDegree:rightTransformDegree,
          borderWidth:props.borderWidth<2 || !props.borderWidth?2:props.borderWidth,
        }
  }

/**
 * 当手指触摸在屏幕上，是否愿意成为触摸事件的触发者
 */
  onStartShouldSetPanResponder(evt,gestureState) {
    return true;
  }

  /**
   * 用户放开的触摸点
   */
  onPanResponderEnd() {
    this.props.onPress();
  }

  render(){
    return(
      <View
      {...this._panResponder.panHandlers}
      style={[styles.containerlayout,{
      backgroundColor:this.props.bgColor,
      borderRadius:this.props.radius,
      width:this.props.radius*2,
      height:this.props.radius*2,
    }]}
    >
        <View style={[styles.leftWrap,{
          width:this.props.radius,
          height:this.props.radius*2,
          left:0,
        }]}>
          <View style={[styles.myCircle,{
            left:this.props.radius,
            width:this.props.radius,
            height:this.props.radius*2,
            backgroundColor:'purple',
            borderTopLeftRadius:0,
            borderBottomLeftRadius:0,
            transform:[{translateX:-this.props.radius/2},{rotate:this.state.leftTransformDegree},{translateX:this.props.radius/2}],
          }]}>
        </View>
      </View>

      <View style={[styles.leftWrap,{
        left:this.props.radius,
        width:this.props.radius,
        height:this.props.radius*2,
      }]}>
        <View style={[styles.myCircle,{
          left:-this.props.radius,
          width:this.props.radius,
          height:this.props.radius*2,
          borderTopRightRadius:0,
          borderBottomRightRadius:0,
          backgroundColor:'purple',
          transform:[{translateX:this.props.radius/2},{rotate:this.state.rightTransformDegree},{translateX:-this.props.radius/2}],
        }]}>
        </View>
      </View>

      {/* 内部遮盖 */}
      <View style={[styles.innerCircle,{
        width:(this.props.radius-this.state.borderWidth)*2,
        height:(this.props.radius-this.state.borderWidth)*2,
        borderRadius:this.props.radius-this.state.borderWidth,
        left:this.state.borderWidth,
        top:this.state.borderWidth,
        backgroundColor:'#fff',
      }]}
      onPress={this.props.onPress}
        >
        <Text style={[styles.innerText,{
        }]}
      >
          {this.props.percent}%
        </Text>
      </View>

    </View>
  );
  }
}

const styles = StyleSheet.create({
  containerlayout:{
    flex:1,
    overflow:'hidden',
    position:'relative',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#e3e3e3'
  },
  myCircle:{
    position:'absolute',
    borderRadius:10000,
    left:0,
    top:0,
  },
  leftWrap:{
    overflow:'hidden',
    position:'absolute',
    top:0,
  },
  rightWrap:{
    position:'absolute',
  },
  innerCircle:{
    overflow:'hidden',
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
  },
  innerText:{
    fontSize:11,
    color:'#888'
  }
});
export default MyCircleView;
