

/**
  主页
  @author kongdy
**/

'use strict'; // 启用严格模式
import React,{Component} from 'react';
import{
  StyleSheet,
  TextInput,
  Text,
  TouchableHighlight,
  View,
  Image,
  ToastAndroid,
  InteractionManager,
  Modal,
} from 'react-native';

import AppMain from './AppMain';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      animationType:'none',
      modalVisible:true,
      transparent:false,
    };
  }

  /**
  如果是集成Component写法，里面方法不用谢function关键字，
  另外一种 React.createClass({}); 需要写function
  **/
  clickMenuListener(eventname) {
      ToastAndroid.show('点击了按钮', ToastAndroid.SHORT);
      this.setState({modalVisible:false});
      const{navigator} = this.props;
      InteractionManager.runAfterInteractions(
        ()=>{
          navigator.resetTo(
            {
              component:AppMain,
              name:'要爆炸了！',
            }
          );
        }
      );
  }

  render(){
    return (
      /**
       * 模态视图
       */

      <View style={styles.container}>
      <View style={styles.centerChild}>

      <Image
        source={{uri:'https://facebook.github.io/react/img/logo_og.png'}}
        style={styles.image}
      />
      <TextInput style={styles.myTextInputStyle1}
       placeholder="请输入文字"
       numberOfLines={1}
       underlineColorAndroid="blue"
       multiline={false}
       placeholderTextColor="#a9a9a9"
       />
       <TextInput
       style={styles.myTextInputStyle1}
       placeholder="密码"
       numberOfLines={1}
       underlineColorAndroid="blue"
       secureTextEntry={true}
       multiline={false}
       placeholderTextColor="#a9a9a9"
       />
      <TouchableHighlight  style={styles.btn} onPress={this.clickMenuListener.bind(this)} underlayColor={'blue'}
      activeOpacity={0.5}>
        <Text style={styles.customText}>
          点击按钮
        </Text>
      </TouchableHighlight>
      </View>
            </View>

    );
  }
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5FCFF',
      flex:1,
      alignItems:'center',
      flexDirection:'row',
      marginTop:55,
    },
  centerChild:{
    flexWrap:'wrap',
    alignSelf:'center',
    justifyContent:'center',
    flexDirection:'column',
    flex:1,
  },
  image:{
    height:150,
    justifyContent:'center',
  },
  myTextInputStyle1:{
    fontSize:15,
    marginLeft:10,
    marginRight:10,
    justifyContent:'center',
    textAlign:"center",
  },

    /**
    alignSelf的对齐方式主要有四种：flex-start、 flex-end、 center、  auto、 stretch。
    **/
    customText:{
      textAlign:"center",
      color:'#FFFFFF',
      fontSize:20,
      fontWeight:'500',
      marginTop:5,
      marginBottom:5,
    },
    /**
    alignSelf:'center' 根据内部控件大小进行父布局的大小适配
    **/
    btn:{
      alignItems:'center',
      borderColor:'blue',
      borderWidth:1,
      justifyContent:'center',
      backgroundColor:"purple",
      borderRadius:5,
      marginLeft:10,
      marginRight:10,
      marginTop:10,
      marginBottom:10,
    },
});

export default Home;
