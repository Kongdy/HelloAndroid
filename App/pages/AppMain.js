

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
  InteractionManager,
} from 'react-native';

import {NaviGoBack} from '../utils/CommonUtils';
import MyItem from './MyItem';
import ViewPager from 'react-native-viewpager';

const len = 160;

class AppMain extends Component {
  constructor(props){
      super(props);
      this.goBack = this.goBack.bind(this);

      var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
      var vds = new ViewPager.DataSource({pageHasChanged:(p1,p2) => p1 !== p2});

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
        ]),
        pageDataSource:vds,
      };
  }

/**
 * rn 生命周期，初始化状态和属性之后执行的第一个方法，即{控件即将被装载}
 */
  componentWillMount(){
    fetch('http://m.jd.com/index/recommend.action?_format_=json&page=1')
          .then((res) => res.json())
          .then((str) => {
            let arr = JSON.parse(str.recommend).wareInfoList;
            var pages = [];
            for(let i = 0;i < arr.length; i += 2) {
              var item = {id:i,left:null,right:null};
              item.left = (arr[i]);
              if(i < arr.length - 1) {
                  item.right = (arr[i+1])
              }
              pages.push(item);
            }
            var vds = this.state.pageDataSource.cloneWithPages(pages);
            this.setState({pageDataSource:vds});
          });
  }


/**
 返回
**/
  goBack() {
      const {navigator} = this.props;
      return NaviGoBack(navigator);
  }

  listItemOnPress(rowData){
    const{navigator} = this.props;
    InteractionManager.runAfterInteractions(
      () => {
        navigator.push(
        {
          component:MyItem,
          name:'MyItem',
        }
      );
    }
    );
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

  pageItemRenderView(rowData,selectId,rowId) {
    console.log(rowData);
    return(
      <View style={[styles.rowContainer,{flex:1}]}>
        <Image
         source={{uri:rowData.left.imageurl}}
         style={{flex:1,resizeMode:'stretch'}}/>
      </View>
    );
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
         style={{marginTop:55}}
         >
          <View style={{flex:1,backgroundColor:'white'}}>
              <ViewPager
                style={{height:130}}
                dataSource={this.state.pageDataSource}
                renderPage={this.pageItemRenderView.bind(this)}
                isLoop={true}
                autoPlay={true}
              />
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
