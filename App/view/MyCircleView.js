

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

// 最新坐标
var lastLeft = 0;
var lastTop = 0;
// 坐标存根
var previousLeft = 0;
var previousTop = 0;

class MyCircleView extends React.Component {
  /**git
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
    this.onPanResponderMove = this.onPanResponderMove.bind(this);
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
      onPanResponderMove:this.onPanResponderMove,
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
    if(evt.locationX <0 || evt.locationY < 0) {
      return false;
    }
    return true;
  }

/**
 * 触摸点移动的时候，是否愿意成为响应者
 *
 *gestureState:{
 *  param: stateID ：滑动手势的 ID，在一次完整的交互中此 ID 保持不变；
 *         moveX 和 moveY ：自上次回调，手势移动距离；
 *         x0 和 y0 ：滑动手势识别开始的时候的在屏幕中的坐标；
 *         dx 和 dy ：从手势开始时，到当前回调是移动距离；
 *         vx 和 vy ：当前手势移动的速度；
 *         numberActiveTouches ：当期触摸手指数量。
 *}
 *evt:{
 *  param: identifier ：触摸的 ID，一般对应手指，在多点触控的时候，用来区分是哪个手指的触摸事件；
 *         locationX 和 locationY ：触摸点相对组件的位置；
 *         pageX 和 pageY ：触摸点相对于屏幕的位置；
 *         timestamp ：当前触摸的事件的时间戳，可以用来进行滑动计算；
 *         target ：接收当前触摸事件的组件 ID；
 *         changedTouches ：evt 数组，从上次回调上报的触摸事件，到这次上报之间的所有事件数组。因为用户触摸过程中，会产生大量事件，有时候可能没有及时上报，系统用这种方式批量上报；
 *         touches ：evt 数组，多点触摸的时候，包含当前所有触摸点的事件。
 *}
 *
 */
  onMoveShouldSetPanResponder(evt,gestureState){
    return true;
  }

/**
 * 正在滑动
 */
  onPanResponderMove(evt,gestureState) {
  }

  /**
   * 用户放开的触摸点
   */
  onPanResponderEnd() {
    previousLeft = lastLeft;
    previousTop = lastTop;
    this.props.onPress();
  }

  render(){
    return(
      <View
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
      <View
        {...this._panResponder.panHandlers}
        style={[styles.innerCircle,{
        width:(this.props.radius-this.state.borderWidth)*2,
        height:(this.props.radius-this.state.borderWidth)*2,
        borderRadius:this.props.radius-this.state.borderWidth,
        left:this.state.borderWidth,
        top:this.state.borderWidth,
        backgroundColor:'#fff',
      }]}
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
