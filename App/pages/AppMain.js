

/**
 app 首页
**/

'use strict'; // 启用严格模式
import React,{Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  ToastAndroid,
  DrawerLayoutAndroid,
  DrawerConsts,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Image,
} from 'react-native';

import {NaviGoBack} from '../utils/CommonUtils'

class AppMain extends Component {
  constructor(props){
      super(props);
      this.goBack = this.goBack.bind(this);

      var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});

      this.state = {
        dataSource:ds.cloneWithRows([
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
          '黄','河','之','水','天','上','来',',','奔','流','到','海','不','复','回','。',
        ])
      };
  }

/**
 返回
**/
  goBack() {
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  listItemOnPress(rowData){
    ToastAndroid.show('You click position:'+rowData,ToastAndroid.SHORT);
  }

/**
 * 行数据、选择id、行id
 */
  listItemRenderView(rowData,selectId,rowId){
    return(<TouchableHighlight
      underlayColor='#dddddd'
      onPress={()=>this.listItemOnPress(rowData)}
      >
      <View style={styles.rowContainer}>
      <Image
      style={{height:200,flex:1}}
      source={{uri:'http://static.oschina.net/uploads/img/201505/18191229_aTEI.png'}}
      />
        <Text style={{textAlign:'center',flex:1}}>
          this is the select Name:{rowData}.
        </Text>
      </View>
      </TouchableHighlight>);
  }

  render(){
    var drawerView = (
      <View style={{flex:1,backgroundColor:'purple'}}>
        <Text style={{fontSize:20,color:'white',textAlign:'center'}}>
          this is a drawer view text!!
        </Text>
      </View>
    );

      return(
        <DrawerLayoutAndroid
          drawerWidth={300}
         drawerPosition={DrawerLayoutAndroid.positions.Left}
         renderNavigationView={() => drawerView}
         style={{marginTop:50}}
         >
          <View style={{flex:1,backgroundColor:'white'}}>
              <ListView
              dataSource={this.state.dataSource}
              renderRow={this.listItemRenderView.bind(this)}/>
          </View>
          </DrawerLayoutAndroid>
      );
  }
}

var styles = StyleSheet.create({
  rowContainer:{
    flexDirection:'row',
    padding:10,
  },
});


export default AppMain;
