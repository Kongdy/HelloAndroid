

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
  LinearGradient,
  RadialGradient,
  ClippingRectangle,
} = ART;



class MyWaveView extends React.Component{
  render(){
    const path = new Path().
    moveTo(50,1)
    .arcTo(50,99,10)
    .close();

    return(
      <View style={styles.containerLayout}>
        {/* 先来个狗逼圆！ */}

        <Surface width={300} height={200}>
          <Shape d={path} stroke="purple" strokeWidth={2}/>
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
