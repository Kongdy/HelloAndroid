

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
  Pattern,
  Circle,
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

class MyWaveView extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      /**
       * 半径
       * @type {Number}
       */
      radius:40.0,
    }
  }

  componentDidMount() {
    let self = this;
    this.intval = setInterval(
      ()=>{
      let radius = this.state.radius;
      if(radius > 50.0) {
        scaleLoopFlag = false;
      } else if(radius < 40.0) {
        scaleLoopFlag = true;
      }
      scaleLoopFlag?radius += 0.2:radius -= 0.2;
      self.setState({
        radius:radius,
      });
    },1000/60);
  }

componentWillUnmount() {
  this.intval && clearInterval(this.intval);
}

  render(){
    const path = new Path().
    lineTo(150+this.state.radius-40,50+this.state.radius-40)
    .arcTo(150+this.state.radius-40,100+this.state.radius-40,this.state.radius)
    .close();

    return(
      <View style={styles.containerLayout}>
        {/* 先来个狗逼圆！ */}

        <Surface width={300} height={200}>
          <Shape d={path} stroke="purple" strokeWidth={2}/>
          <Circle
            cx="50"
            cy="50"
            r="50"
            fill="pink"
          />
        </Surface>

      {/*  <View style={[styles.circleView,{
          backgroundColor:'purple',
          width:150,
          height:150,
        }]}>
        </View>
        */}

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
