

/**
 * 一个可以制造波浪的自定义控件
 *
 * 尝试ART库
 *
 * @author kongdy
 */
'use strict'
import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  ART,
} from 'react-native';

/**
 * ART组件
 */
const {
  Shape,
  Group,
  Transform,
  Surface,
  Path,
  Text,
  Pattern,
  LinearGradient,
  RadialGradient,
  ClippingRectangle,
} = ART;

/**
 * true:
 *      plus
 * false:
 *     minus
 * @type {Boolean}
 */
const scaleLoopFlag = true;
const radiusBuffer = 0;

class MyWaveView extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      /**
       * 半径
       * @type {Number}
       */
      radius:40.0,
      externalCircleAlpha:1,
    }
  }

  componentDidMount() {
    let self = this;
    this.intval = setInterval(
      ()=>{
      let radius = this.state.radius;
      let alpha = this.state.externalCircleAlpha;
      if(radius > 50.0) {
        scaleLoopFlag = false;
        radius = 40.0;
      } else {
        scaleLoopFlag = true;
        radius+=0.4;
      }

      alpha = 1.0-(radius-40.0)/10.0;
      if(alpha < 0.01)
        alpha = 0.01;
      if(alpha > 1)
        alpha = 1;
      self.setState({
        radius:radius,
        externalCircleAlpha:alpha,
      });
    },1);
  }

componentWillUnmount() {
  this.intval && clearInterval(this.intval);
}

  render(){
    const path = new Path()
    .moveTo(150+(this.state.radius-40)/2,50-this.state.radius+40)
    .arcTo(150+(this.state.radius-40)/2,100+this.state.radius-40,this.state.radius)
    .close();
    const pathInner = new Path()
    .lineTo(144,50)
    .arcTo(144,100,36)
    .close();
    const pathText = new Path()
    .moveTo(135,150)
    .lineTo(135,250);
    const color = "rgba(128,0,128,"+this.state.externalCircleAlpha+")";
    return(
      <View style={styles.containerLayout}>
          {/* 先来个狗逼圆！ */}
        <Surface width={300} height={200}>
          {/* 外圈动态圆环 */}
          <Shape d={path} stroke={color} strokeWidth={3}/>
          {/* 内圈实心圆 */}
          <Shape d={pathInner} stroke="purple" fill="purple" strokeWidth={0}/>

          <Text strokeWidth={2} strokeDash={[2,1,2,1]} stroke="#000" font="bold 30px Heiti SC" path={pathText}> {this.state.externalCircleAlpha} </Text>
        </Surface>
      </View>
    );
  }
}


/**
 * 样式
 */
var styles = StyleSheet.create({
    containerLayout:{
      flex:1,
      position:'relative',
      justifyContent:'center',
      alignItems:'center',
    },
    /**
     * 圆view
     */
    circleView:{
      borderRadius:1000,
    },
    /**
     *临时、未指定大小的时候的默认size
     */
    defaultSize:{
      width:150,
      height:150,
    }
});
export default MyWaveView;
