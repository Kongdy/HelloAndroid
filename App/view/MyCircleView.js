

/**
 * 自定义圆形进度条
 */
'use strict';

import React,{Component} from 'react';
import {
View,
StyleSheet,
} from 'react-native';

class MyCircleview extends React.Component {

  /**
   * 控件属性
   * @type {Object}
   */
    propTypes:{
      radius:React.Proptypes.number,
      bgColor:React.Proptypes.string,
      percent:React.Proptypes.number,
    }

  constructor(props){
    super(props);
  }

  render(){
    return(<View style={[styles.containerlayout,{
      backgroundColor:this.props.bgColor,
    }]}>
    <View style={[styles.myCircle,{
      width:this.props.radius*2,
      height:this.props.radius*2,
      borderRadius:10000000000000000000000000,
      backgroundColor:'purple',
    }]}>

    </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  containerlayout:{
    flex:1,
  },
  myCircle:{
    overflow:'hidden',
    position:'relative',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'purple',
  },
});

module.exports=MyCircleview;
