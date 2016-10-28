
/**
 * @author kongdy
 * item的详情页
 */

'use strict';
import React,{Component} from 'react';
import {
View,
StyleSheet,
} from 'react-native';

import MyCircleView from '../view/MyCircleView';

class MyItem extends React.Component {

    constructor(props){
      super(props);
    }

    render(){
      return(<View style={styles.containerlayout}>
          <MyCircleView
          radius={100}
          bgColor={'white'}
          />
      </View>);
    }
}

const styles = StyleSheet.create({
  containerlayout:{
    flex:1,
    backgroundColor:'white',
    marginTop:55,
  },
});

export default MyItem;
