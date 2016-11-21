

/**
 * 一个可以制造波浪的自定义控件
 * @author kongdy
 */
'use strict'
import React,{Component} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

class MyWaveView extends React.Component{
  render(){
    return(
      <View style={styles.containerLayout}>
        {/* 先来个狗逼圆！ */}

        <View style={[styles.circleView,{
          backgroundColor:'purple',
          width:150,
          height:150,
        }]}>
        </View>

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
